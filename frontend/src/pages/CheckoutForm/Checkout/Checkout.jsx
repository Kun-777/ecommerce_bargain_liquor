import React, { useState, useEffect } from 'react';
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
  CssBaseline,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import useCart from '../../../hooks/useCart';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

const steps = ['Customer information', 'Payment details'];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { cart } = useCart();
  const [order, setOrder] = useState({});
  const classes = useStyles();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    // const createOrder = async () => {
    //   await axiosPrivate
    //     .post('/order/create', {
    //       items: cart.items,
    //       order_type: cart.order_type,
    //       paramsSerializer: {
    //         indexes: null,
    //       },
    //     })
    //     .then((response) => setOrder({ order_id: response?.data.order_id }))
    //     .catch((e) => console.log(e));
    // };
    if (cart.total_items && cart.order_type) {
      setOrder((prev) => ({
        ...prev,
        items: cart.items,
        order_type: cart.order_type,
      }));
    }
  }, [cart]);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (data) => {
    setOrder((prev) => ({ ...prev, ...data }));
    nextStep();
  };

  let Confirmation = () =>
    order.customer_reference ? (
      <>
        <div>
          <Typography variant='h5'>
            Thank you for your purchase, {order.first_name} {order.last_name}
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant='subtitle2'>
            Order ref: {order.customer_reference}
          </Typography>
        </div>
        <br />
        <Button component={Link} to='/' variant='outlined' type='button'>
          Back to Home
        </Button>
      </>
    ) : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm next={next} order_type={order.order_type} />
    ) : (
      <PaymentForm
        order={order}
        setOrder={setOrder}
        nextStep={nextStep}
        backStep={backStep}
      />
    );

  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant='h4' align='center'>
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : <Form />}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
