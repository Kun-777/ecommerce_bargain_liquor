import React from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  Grid,
  ListItemAvatar,
  Avatar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const DELIVERY_FEE = parseFloat(process.env.REACT_APP_DELIVERY_FEE);
const TAX_RATE = parseFloat(process.env.REACT_APP_TAX_RATE);

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  redText: {
    color: 'red',
  },
  greenText: {
    color: 'green',
  },
}));

const UserOrderDetail = ({ order }) => {
  const classes = useStyles();

  const getColorClass = (text) => {
    if (text === 'canceled') {
      return classes.redText;
    } else if (text === 'confirmed' || text === 'accepted') {
      return classes.greenText;
    } else {
      return '';
    }
  };

  const getDate = (timeStampStr) => {
    const [year, month, date] = timeStampStr.split('-');
    return month + '/' + date.slice(0, 2) + '/' + year;
  };

  return (
    <Paper className={classes.paper}>
      <Grid container alignItems='center'>
        <Grid item xs={6}>
          <Typography gutterBottom variant='h5'>
            Referene ID: {order.reference_id}
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography gutterBottom variant='h5'>
            Placed on: {getDate(order.created_at)}
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            gutterBottom
            variant='h6'
            className={getColorClass(order.status)}
          >
            {order.status}
          </Typography>
        </Grid>
      </Grid>
      <List disablePadding>
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
              <ListItemAvatar>
                <Avatar variant='square' src={`../../images/${item.image}`} />
              </ListItemAvatar>
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
            <Typography variant='body2'>${DELIVERY_FEE.toFixed(2)}</Typography>
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
      {order.status === 'canceled' && (
        <Typography gutterBottom variant='h6' className={classes.redText}>
          Bargain Liquor has canceled your order because: {order.cancel_reason}
        </Typography>
      )}
    </Paper>
  );
};

export default UserOrderDetail;
