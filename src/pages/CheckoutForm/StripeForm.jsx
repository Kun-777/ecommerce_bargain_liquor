import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { Button } from '@material-ui/core';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paymentMessage: {
    color: 'rgb(105, 115, 134)',
    fontSize: '16px',
    lineHeight: '20px',
    paddingTop: '12px',
    textAlign: 'center',
  },
}));

const StripeForm = ({ orderId, backStep }) => {
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();

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

    const confirmPayment = async () => {
      const { error } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
      });
      if (!error) {
        // set order status to confirmed in the database
        await axiosPrivate
          .put(`/order/confirm/${orderId}`)
          .then((response) => {
            navigate('/confirmation', { replace: true });
          })
          .catch((error) => setMessage(error.response.data.detail));
      } else {
        if (error.type === 'card_error' || error.type === 'validation_error') {
          setMessage(error.message);
        } else {
          await axiosPrivate.put(`/order/error/${orderId}`);
          setMessage('An unexpected error occurred.');
        }
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    await axiosPrivate
      .put(`/order/place/${orderId}`)
      .then((response) => {
        confirmPayment();
      })
      .catch((error) => {
        setMessage(error.response.data.detail);
        setIsLoading(false);
      });
  };

  const paymentElementOptions = {
    layout: 'tabs',
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement options={paymentElementOptions} />
      <br /> <br />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant='outlined' onClick={backStep}>
          Back
        </Button>
        <Button
          type='submit'
          variant='contained'
          disabled={isLoading || !stripe || !elements}
          color='primary'
        >
          <span>{isLoading ? <CircularProgress /> : 'Pay now'}</span>
        </Button>
      </div>
      {/* Show any error or success messages */}
      {message && <div className={classes.paymentMessage}>{message}</div>}
    </form>
  );
};

export default StripeForm;
