import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import UserOrderDetail from './UserOrderDetail';

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 1200,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  content: {
    marginTop: theme.spacing(3),
  },
}));

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const classes = useStyles();

  useEffect(() => {
    const fetchUserOrders = async () => {
      await axiosPrivate
        .get('/user/orders')
        .then((response) => {
          setOrders(response.data.sort((a, b) => b.id - a.id));
        })
        .catch((e) => setMessage(e.response.data.detail));
    };
    fetchUserOrders();
  }, []);

  return (
    <>
      <CssBaseline />
      <Grid
        container
        spacing={3}
        justifyContent='flex-start'
        className={classes.layout}
      >
        {orders.length !== 0 &&
          orders.map((order) => (
            <Grid item xs={12}>
              <UserOrderDetail order={order} />
            </Grid>
          ))}
      </Grid>
      {orders.length === 0 && (
        <Typography variant='h5' className={classes.content}>
          You have no orders.
        </Typography>
      )}
      {message && <div className={classes.message}>{message}</div>}
    </>
  );
};

export default UserOrders;
