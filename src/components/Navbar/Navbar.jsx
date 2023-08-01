import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  InputBase,
  Paper,
  Menu,
  MenuItem,
} from '@material-ui/core';
import Button from '@mui/material/Button';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useSearchParamsState from '../../hooks/useSearchParamsState';
import useCart from '../../hooks/useCart';
import useStyles from './styles';

const Navbar = () => {
  const { auth } = useAuth();
  const classes = useStyles();
  const location = useLocation();
  const [, setSearch] = useSearchParamsState('text', null);
  const [searchTemp, setSearchTemp] = useState('');
  const { cart, setCart } = useCart();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickOptions = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    index === 0
      ? setCart((prev) => ({ ...prev, order_type: 'pick up' }))
      : setCart((prev) => ({ ...prev, order_type: 'delivery' }));
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTemp === '') {
      setSearch(null);
    } else {
      setSearch(searchTemp.slice());
    }
  };

  return (
    <>
      <AppBar position='fixed' className={classes.appBar} color='inherit'>
        <Toolbar>
          <Typography
            component={Link}
            to='/'
            variant='h4'
            className={classes.title}
          >
            Bargain Liquor
          </Typography>
          {location.pathname === '/' && (
            <Paper
              component='form'
              className={classes.searchBar}
              onSubmit={handleSearch}
            >
              <InputBase
                className={classes.searchInput}
                placeholder='Search Your Drink'
                inputProps={{ 'aria-label': 'search your drink' }}
                onChange={(e) => {
                  setSearchTemp(e.target.value);
                }}
              />
              <IconButton
                type='submit'
                className={classes.searchIcon}
                aria-label='search'
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          )}
          <div className={classes.grow} />
          {location.pathname === '/' && (
            <>
              <div className={classes.login}>
                <Button
                  variant='outlined'
                  sx={{
                    display: 'block',
                    textAlign: 'left',
                    color: 'white',
                    backgroundColor: 'black',
                    borderColor: 'white',
                    fontWeight: 'bold',
                    width: 160,
                  }}
                  onClick={handleClickOptions}
                >
                  <Typography variant='h6' style={{ fontSize: 14 }}>
                    {cart.order_type === 'pick up'
                      ? 'Order pick up'
                      : 'Order delivery'}
                  </Typography>
                  {cart.order_type === 'pick up' && (
                    <Typography noWrap variant='body2' style={{ fontSize: 10 }}>
                      @ 13500 W Airport Blvd
                    </Typography>
                  )}
                </Button>
                <Menu
                  getContentAnchorEl={null}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    // selected={selectedIndex === 0}
                    onClick={(e) => handleMenuItemClick(e, 0)}
                  >
                    Pick up
                  </MenuItem>
                  <MenuItem
                    // selected={selectedIndex === 1}
                    onClick={(e) => handleMenuItemClick(e, 1)}
                  >
                    Delivery
                  </MenuItem>
                </Menu>
              </div>
              {!auth.access_token && (
                <div className={classes.login}>
                  <Button
                    variant='outlined'
                    href='/login'
                    state={{ from: location }}
                    sx={{
                      color: 'white',
                      backgroundColor: 'black',
                      borderColor: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    Sign in
                  </Button>
                </div>
              )}
              {auth.access_token && (
                <div className={classes.login}>
                  <Button
                    component={Link}
                    to='/profile'
                    variant='outlined'
                    state={{ from: location }}
                    sx={{
                      color: 'white',
                      backgroundColor: 'black',
                      borderColor: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    Hi, {auth.first_name}
                  </Button>
                </div>
              )}
              <div className={classes.button}>
                <IconButton
                  component={Link}
                  to='/cart'
                  state={{ from: location }}
                  aria-label='Show cart items'
                  color='inherit'
                >
                  <Badge badgeContent={cart.total_items} color='secondary'>
                    <ShoppingCart style={{ color: '#FFFFFF' }} />
                  </Badge>
                </IconButton>
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
