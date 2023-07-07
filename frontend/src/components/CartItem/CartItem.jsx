import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Box from '@material-ui/core/Box';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import updateCartQty from '../../utils/updateCartQty';
import useCart from '../../hooks/useCart';

import useStyles from './styles';

const CartItem = ({ item }) => {
  const { cart, setCart } = useCart();
  const classes = useStyles();

  return (
    <TableRow key={item.name}>
      <TableCell component='th' scope='row'>
        <Box display={'flex'} alignItems={'center'}>
          <Box width={80} height={80}>
            <img
              className={classes.image}
              alt={classes.name}
              src={classes.image}
            />
          </Box>
          <Box ml={2}>
            <p className={classes.name}>{item.name}</p>
            {/* <span className={classes.descr}>{item.descr}</span> */}
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <div className={classes.updateQty}>
          <IconButton
            className={classes.iconBtn}
            onClick={() => updateCartQty(item, -1, cart, setCart)}
          >
            <Remove />
          </IconButton>
          <span className={classes.value}>{item.quantity}</span>
          <IconButton
            className={classes.iconBtn}
            onClick={() => updateCartQty(item, 1, cart, setCart)}
          >
            <Add />
          </IconButton>
        </div>
      </TableCell>
      <TableCell>${item.price * item.quantity}</TableCell>
      <TableCell>
        <IconButton onClick={() => updateCartQty(item, 0, cart, setCart)}>
          <Close />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default CartItem;
