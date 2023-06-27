import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from '@material-ui/core';
import { ShoppingCart, AccountCircle } from '@material-ui/icons';
import Button from '@mui/material/Button';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useStyles from './styles';

const Navbar = ({ totalItems }) => {
  const { auth } = useAuth();
  const classes = useStyles();
  const location = useLocation();
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
                <div className={classes.button}>
                  <IconButton
                    component={Link}
                    to='/profile'
                    state={{ from: location }}
                    aria-label='User Profile'
                    color='inherit'
                  >
                    <Badge badgeContent={totalItems} color='secondary'>
                      <AccountCircle style={{ color: '#FFFFFF' }} />
                    </Badge>
                  </IconButton>
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
                  <Badge badgeContent={totalItems} color='secondary'>
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
