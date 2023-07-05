import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  InputBase,
  Paper,
} from '@material-ui/core';
import Button from '@mui/material/Button';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useSearchParamsState from '../../hooks/useSearchParamsState';
import useCart from '../../hooks/useCart';
import useStyles from './styles';

const Navbar = ({ totalItems }) => {
  const { auth } = useAuth();
  const classes = useStyles();
  const location = useLocation();
  const [search, setSearch] = useSearchParamsState('text', null);
  const [searchTemp, setSearchTemp] = useState('');
  const { cart } = useCart();

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
