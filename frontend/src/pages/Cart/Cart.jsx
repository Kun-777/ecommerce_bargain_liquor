import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import { CartItem } from '../../components';
import useCart from '../../hooks/useCart';

const Cart = () => {
  const classes = useStyles();
  const { cart, setCart } = useCart();

  const EmptyCart = () => (
    <Typography variant='subtitle1'>
      You have no items in your shopping cart,
      <Link to='/' className={classes.link}>
        start adding some!
      </Link>
    </Typography>
  );

  const FilledCart = () => (
    <>
      <TableContainer className={classes.table}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.items.map((item) => (
              <CartItem item={item} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box pb={3}>
        <Grid
          container
          justify={'space-between'}
          className={classes.mainGrid}
          spacing={2}
        >
          <Grid item xs={12} sm={5} md={4}>
            <Grid container spacing={1}>
              <Grid item xs={5}>
                <Box align={'right'}>
                  <b className={classes.big}>Subtotal:</b>
                </Box>
              </Grid>
              <Grid item xs={7}>
                <Box px={2} align={'right'} className={classes.big}>
                  <span>$149.96</span>
                </Box>
              </Grid>
              <Grid item xs={5}>
                <Box align={'right'}>
                  <b className={classes.big}>Shipping:</b>
                </Box>
              </Grid>
              <Grid item xs={7}>
                <Box px={2} align={'right'} className={classes.big}>
                  <span>$0</span>
                </Box>
              </Grid>
            </Grid>
            <br />
            <Divider />
            <br />
            <Grid container spacing={1}>
              <Grid item xs={5}>
                <Box align={'right'}>
                  <b className={classes.big}>Total:</b>
                </Box>
              </Grid>
              <Grid item xs={7}>
                <Box px={2} align={'right'} className={classes.large}>
                  <span>$149.96</span>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={5} md={4} container alignItems={'flex-end'}>
            <Button className={classes.btn} startIcon={<KeyboardArrowLeft />}>
              Continue Shopping
            </Button>
          </Grid>
        </Grid>
      </Box>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          className={classes.emptyButton}
          size='large'
          type='button'
          variant='contained'
          color='secondary'
          onClick={() =>
            setCart((prev) => ({ ...prev, items: [], total_items: 0 }))
          }
        >
          Empty Cart
        </Button>
        <Button
          component={Link}
          to='/checkout'
          className={classes.checkoutButton}
          size='large'
          type='button'
          variant='contained'
          color='primary'
        >
          Checkout
        </Button>
      </div>
    </>
  );

  if (!cart.items) return 'Loading... ';

  return (
    <div className={classes.root}>
      <Typography className={classes.heading} variant={'h1'} gutterBottom>
        Shopping Cart
      </Typography>
      {!cart.items.length ? <EmptyCart /> : <FilledCart />}
    </div>
  );
};

export default Cart;
