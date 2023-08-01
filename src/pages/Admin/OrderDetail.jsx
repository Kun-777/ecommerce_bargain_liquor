import React, { useEffect, useState } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  Container,
  CssBaseline,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const DELIVERY_FEE = parseFloat(process.env.REACT_APP_DELIVERY_FEE);
const TAX_RATE = parseFloat(process.env.REACT_APP_TAX_RATE);

const useStyles = makeStyles((theme) => ({
  message: {
    color: '#ff3333',
    fontSize: '16px',
    lineHeight: '20px',
    paddingTop: '12px',
    textAlign: 'center',
  },
  paper: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginTop: 70,
    },
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(16),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const OrderDetail = () => {
  const { id } = useParams();
  const classes = useStyles();
  const [order, setOrder] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const [message, setMessage] = useState(null);
  const [openCancel, setOpenCancel] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  const acceptOrder = async () => {
    await axiosPrivate
      .put(`/order/accept/${id}`)
      .then((response) => {
        setOrder(response.data);
      })
      .catch((e) => setMessage(e.response.data.detail));
  };

  const completeOrder = async () => {
    await axiosPrivate
      .put(`/order/complete/${id}`)
      .then((response) => {
        setOrder(response.data);
      })
      .catch((e) => setMessage(e.response.data.detail));
  };

  const cancelOrder = async () => {
    await axiosPrivate
      .put(`/order/cancel/${id}`, {
        reason: cancelReason,
      })
      .then((response) => {
        setOrder(response.data);
      })
      .catch((e) => setMessage(e.response.data.detail));
  };

  useEffect(() => {
    const fetchOrder = async () => {
      await axiosPrivate
        .get(`/order/detail/${id}`)
        .then((response) => {
          setOrder(response.data);
        })
        .catch((e) => setMessage(e.response.data.detail));
    };
    fetchOrder();
  }, []);

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Typography variant='h6' gutterBottom>
          Customer Info
        </Typography>
        <List disablePadding>
          <ListItem style={{ padding: '3px 0' }}>
            <ListItemText primary='Name' />
            <Typography variant='body2'>
              {order.first_name} {order.last_name}
            </Typography>
          </ListItem>
          <ListItem style={{ padding: '3px 0' }}>
            <ListItemText primary='Order Type' />
            <Typography variant='body2'>{order.order_type}</Typography>
          </ListItem>
          <ListItem style={{ padding: '3px 0' }}>
            <ListItemText primary='Email' />
            <Typography variant='body2'>{order.email}</Typography>
          </ListItem>
          <ListItem style={{ padding: '3px 0' }}>
            <ListItemText primary='Phone' />
            <Typography variant='body2'>{order.phone}</Typography>
          </ListItem>
          <ListItem style={{ padding: '3px 0' }}>
            <ListItemText primary='Reference ID' />
            <Typography variant='body2'>{order.reference_id}</Typography>
          </ListItem>
          {order.order_type === 'delivery' && (
            <ListItem style={{ padding: '3px 0' }}>
              <ListItemText primary='Address' />
              <Typography variant='body2'>
                {order.address_line_1}
                {order.address_line_2}, {order.city}, {order.state}{' '}
                {order.zip_code}
              </Typography>
            </ListItem>
          )}
          {order.schedule && (
            <ListItem style={{ padding: '3px 0' }}>
              <ListItemText primary='Scheduled Time' />
              <Typography variant='body2'>{order.schedule}</Typography>
            </ListItem>
          )}
        </List>
        <Divider className={classes.divider} />
        <Typography variant='h6' gutterBottom>
          Items
        </Typography>
        <List disablePadding>
          {order.items &&
            order.items.map((item) => (
              <ListItem style={{ padding: '10px 0' }} key={item.name}>
                <ListItemText
                  primary={item.product.name}
                  secondary={`Quantity: ${item.quantity}`}
                />
                <Typography variant='body2'>
                  ${(item.product.price * item.quantity).toFixed(2)}
                </Typography>
              </ListItem>
            ))}
          {order.order_type === 'delivery' && (
            <ListItem style={{ padding: '3px 0' }}>
              <ListItemText primary='Delivery Fee' />
              <Typography variant='body2'>
                ${DELIVERY_FEE.toFixed(2)}
              </Typography>
            </ListItem>
          )}
          <ListItem style={{ padding: '3px 0' }}>
            <ListItemText primary='Tax' />
            <Typography variant='body2'>
              $
              {order.order_type === 'pick up'
                ? (order.subtotal * TAX_RATE).toFixed(2)
                : ((order.subtotal + DELIVERY_FEE) * TAX_RATE).toFixed(2)}
            </Typography>
          </ListItem>
          {order.tip > 0 && (
            <ListItem style={{ padding: '3px 0' }}>
              <ListItemText primary='Tip' />
              <Typography variant='body2'>${order.tip}</Typography>
            </ListItem>
          )}
          <ListItem style={{ padding: '10px 0' }}>
            <ListItemText primary='Total' />
            <Typography variant='subtitle1' style={{ fontWeight: 700 }}>
              ${order.total}
            </Typography>
          </ListItem>
        </List>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {order.status === 'confirmed' && (
            <Button
              variant='contained'
              color='secondary'
              onClick={() => setOpenCancel(true)}
            >
              Cancel
            </Button>
          )}
          <Dialog
            open={openCancel}
            onClose={() => setOpenCancel(false)}
            aria-labelledby='form-dialog-title'
          >
            <DialogTitle id='form-dialog-title'>Cancel Order</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin='dense'
                label='Reason'
                fullWidth
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenCancel(false)} color='primary'>
                Back
              </Button>
              <Button onClick={() => cancelOrder()} color='primary'>
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          {order.status === 'confirmed' && (
            <Button
              variant='contained'
              color='primary'
              onClick={() => acceptOrder()}
            >
              Accept
            </Button>
          )}
          {order.status === 'accepted' && (
            <Button
              variant='contained'
              color='primary'
              onClick={() => completeOrder()}
            >
              Complete
            </Button>
          )}
          {(order.status === 'placed' || order.status === 'created') && (
            <Button variant='contained' disabled>
              Accept
            </Button>
          )}
        </div>
        {message && <div className={classes.message}>{message}</div>}
      </Paper>
    </Container>
  );
};

export default OrderDetail;
