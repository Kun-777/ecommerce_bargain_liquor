import React, { useState, useEffect } from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import StripeForm from './StripeForm';

import Review from './Review';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ order, setOrder, backStep, nextStep }) => {
  const [clientSecret, setClientSecret] = useState('');
  const [orderId, setOrderId] = useState(0);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    axiosPrivate
      .post('/order/create-payment-intent', {
        ...order,
        paramsSerializer: {
          indexes: null,
        },
      })
      .then((response) => {
        setClientSecret(response.data.clientSecret);
        setOrderId(response.data.orderId);
        setOrder((prev) => ({ ...prev, total: response.data.total }));
      })
      .catch((error) => console.log(error));
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
      <Review order={order} />
      <Divider />
      <Typography variant='h6' gutterBottom style={{ margin: '20px 0' }}>
        Payment method
      </Typography>
      <Elements options={options} stripe={stripePromise}>
        <StripeForm orderId={orderId} setOrder={setOrder} nextStep={nextStep} />
      </Elements>
    </>
  );
};

export default PaymentForm;
