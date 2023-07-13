import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';

const Review = ({ order }) => {
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
              ${parseFloat(item.price * item.quantity).toFixed(2)}
            </Typography>
          </ListItem>
        ))}
        <ListItem style={{ padding: '10px 0' }}>
          <ListItemText primary='Total' />
          <Typography variant='subtitle1' style={{ fontWeight: 700 }}>
            ${parseFloat(order.total).toFixed(2)}
          </Typography>
        </ListItem>
      </List>
    </>
  );
};

export default Review;
