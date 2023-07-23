import React, { useEffect } from 'react';
import { Paper, Typography, Button, CssBaseline } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import useCart from '../../hooks/useCart';

const Checkout = () => {
  const { setCart } = useCart();
  const classes = useStyles();

  useEffect(() => {
    setCart((prev) => ({
      ...prev,
      items: [],
      total_items: 0,
      subtotal: 0,
      modified: true,
    }));
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.payment}>
        <Paper className={classes.paper}>
          <>
            <div>
              <Typography variant='h5'>Thank you for your purchase.</Typography>
            </div>
            <br />
            <Button component={Link} to='/' variant='outlined' type='button'>
              Back to Home
            </Button>
          </>
        </Paper>
      </main>
    </div>
  );
};

export default Checkout;
