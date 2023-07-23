import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';
import useTip from '../../hooks/useTip';
import useCart from '../../hooks/useCart';

const DELIVERY_FEE = parseFloat(process.env.REACT_APP_DELIVERY_FEE);
const TAX_RATE = parseFloat(process.env.REACT_APP_TAX_RATE);

const Review = ({ order, total }) => {
  const { tip } = useTip();
  const { cart } = useCart();

  return (
    <>
      <Typography variant='h6' gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {order.items.map((item) => (
          <ListItem style={{ padding: '10px 0' }} key={item.name}>
            <ListItemText
              primary={item.name}
              secondary={`Quantity: ${item.quantity}`}
            />
            <Typography variant='body2'>
              ${(item.price * item.quantity).toFixed(2)}
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
              ? (cart.subtotal * TAX_RATE).toFixed(2)
              : ((cart.subtotal + DELIVERY_FEE) * TAX_RATE).toFixed(2)}
          </Typography>
        </ListItem>
        {tip > 0 && (
          <ListItem style={{ padding: '3px 0' }}>
            <ListItemText primary='Tip' />
            <Typography variant='body2'>
              ${parseFloat(tip).toFixed(2)}
            </Typography>
          </ListItem>
        )}
        <ListItem style={{ padding: '10px 0' }}>
          <ListItemText primary='Total' />
          <Typography variant='subtitle1' style={{ fontWeight: 700 }}>
            $
            {total
              ? total.toFixed(2)
              : parseFloat(
                  order.order_type === 'pick up'
                    ? cart.subtotal * (1 + TAX_RATE)
                    : (cart.subtotal + DELIVERY_FEE) * (1 + TAX_RATE) + tip
                ).toFixed(2)}
          </Typography>
        </ListItem>
      </List>
    </>
  );
};

export default Review;
