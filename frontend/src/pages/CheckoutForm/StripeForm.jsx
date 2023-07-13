import React, { useEffect, useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useCart from '../../hooks/useCart';

const StripeForm = ({ orderId, setOrder, nextStep }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { setCart } = useCart();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    await axiosPrivate
      .put('/order/place', {
        order_id: orderId,
      })
      .then(async () => {
        const { error } = await stripe.confirmPayment({
          elements,
        });
        if (!error) {
          // set order status to confirmed in the database
          await axiosPrivate
            .put('/order/confirm', {
              order_id: orderId,
            })
            .then(() => {
              setOrder((prev) => ({ ...prev, customer_reference: orderId }));
              setCart((prev) => ({
                ...prev,
                items: [],
                total_items: 0,
                subtotal: 0,
                modified: true,
              }));
            })
            .catch((error) => setMessage(error.details));
        } else if (
          error.type === 'card_error' ||
          error.type === 'validation_error'
        ) {
          setMessage(error.message);
        } else {
          setMessage('An unexpected error occurred.');
        }
        setIsLoading(false);
        nextStep();
      })
      .catch((error) => setMessage(error.details));

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: 'tabs',
  };

  return (
    <form id='payment-form' onSubmit={handleSubmit}>
      <PaymentElement id='payment-element' options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id='submit'>
        <span id='button-text'>
          {isLoading ? <div className='spinner' id='spinner'></div> : 'Pay now'}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id='payment-message'>{message}</div>}
    </form>
  );
};

export default StripeForm;
