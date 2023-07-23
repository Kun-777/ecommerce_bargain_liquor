import React, { useState, useEffect } from 'react';
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CssBaseline,
  Grid,
} from '@material-ui/core';
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import useCart from '../../../hooks/useCart';
import useAuth from '../../../hooks/useAuth';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import Review from '../Review';
import { TipProvider } from '../../../context/TipProvider';

const steps = ['Customer information', 'Payment details'];

const Checkout = () => {
  const { auth } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const { cart } = useCart();
  const [order, setOrder] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const classes = useStyles();

  useEffect(() => {
    const fetchUserInfo = async () => {
      await axiosPrivate
        .get('/user/profile')
        .then((response) => {
          setUserInfo(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    if (auth.access_token) {
      fetchUserInfo();
    }
    if (cart.total_items && cart.order_type) {
      setOrder((prev) => ({
        ...prev,
        items: cart.items,
        order_type: cart.order_type,
      }));
    }
  }, [cart, auth, axiosPrivate]);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (data) => {
    setOrder((prev) => ({ ...prev, ...data }));
    nextStep();
  };

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm
        next={next}
        order_type={order.order_type}
        userInfo={userInfo}
      />
    ) : (
      <PaymentForm order={order} backStep={backStep} />
    );

  return (
    <TipProvider>
      <CssBaseline />
      <div className={classes.toolbar} />
      {activeStep === 0 ? (
        <Grid container spacing={5} className={classes.layout}>
          <Grid item xs={6}>
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
              <Form />
            </Paper>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={5}>
            <Paper className={classes.paper}>
              {order.items && <Review order={order} />}
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <main className={classes.payment}>
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
            <Form />
          </Paper>
        </main>
      )}
    </TipProvider>
  );
};

export default Checkout;
