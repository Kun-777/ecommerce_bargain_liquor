import React, { useState, useEffect } from 'react';
import { Typography, Divider } from '@material-ui/core';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import StripeForm from './StripeForm';
import Review from './Review';

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`);

const PaymentForm = ({ order, backStep }) => {
  const [clientSecret, setClientSecret] = useState('');
  const [orderId, setOrderId] = useState(0);
  const [total, setTotal] = useState(0);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const createPaymentIntent = async () => {
      // Create PaymentIntent as soon as the page loads
      await axiosPrivate
        .post('/order/create-payment-intent', {
          ...order,
          paramsSerializer: {
            indexes: null,
          },
        })
        .then((response) => {
          setClientSecret(response.data.clientSecret);
          setOrderId(response.data.orderId);
          setTotal(response.data.total);
        })
        .catch((error) => console.log(error));
    };
    createPaymentIntent();
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <Review order={order} total={total} />
      <Divider />
      <Typography variant='h6' gutterBottom style={{ margin: '20px 0' }}>
        Payment method
      </Typography>
      {clientSecret !== '' && (
        <Elements options={options} stripe={stripePromise}>
          <StripeForm orderId={orderId} backStep={backStep} />
        </Elements>
      )}
    </>
  );
};

export default PaymentForm;
