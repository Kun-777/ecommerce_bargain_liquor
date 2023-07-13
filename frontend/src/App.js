import React, { useState, useEffect } from 'react';
import useRefreshToken from './hooks/useRefreshToken';
import useAuth from './hooks/useAuth';
import { Navbar, RequireAuth, VerifyEmail, PersistLogin } from './components';
import { Home, Login, Register, Profile, Cart, Checkout } from './pages';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    background: {
      default: 'white',
    },
  },
  overrides: {
    MuiListItem: {
      root: {
        '&$selected': {
          backgroundColor: 'black',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div style={{ display: 'flex' }}>
          <CssBaseline />
          <Navbar totalItems={0} />
          <Routes>
            <Route element={<PersistLogin />}>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/register' element={<Register />} />
              <Route exact path='/cart' element={<Cart />} />
              <Route exact path='/checkout' element={<Checkout />} />

              <Route element={<RequireAuth />}>
                <Route exact path='/profile' element={<Profile />} />
                <Route exact path='/verify_email' element={<VerifyEmail />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
