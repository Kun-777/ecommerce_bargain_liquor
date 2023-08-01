import React from 'react';
import {
  Navbar,
  RequireAuth,
  VerifyEmail,
  PersistLogin,
  Footer,
} from './components';
import {
  Home,
  Login,
  Register,
  Profile,
  Cart,
  Checkout,
  Dashboard,
  OrderDetail,
  Confirmation,
} from './pages';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
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
      default: '#ffffff',
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

const NavLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <CssBaseline />
          <Routes>
            <Route element={<PersistLogin />}>
              <Route element={<NavLayout />}>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/register' element={<Register />} />
                <Route exact path='/cart' element={<Cart />} />
                <Route exact path='/checkout' element={<Checkout />} />
                <Route exact path='/confirmation' element={<Confirmation />} />

                <Route element={<RequireAuth adminOnly={false} />}>
                  <Route exact path='/profile' element={<Profile />} />
                  <Route exact path='/verify_email' element={<VerifyEmail />} />
                </Route>
                <Route element={<RequireAuth adminOnly={true} />}>
                  <Route exact path='/dashboard' element={<Dashboard />} />
                  <Route exact path='/order/:id' element={<OrderDetail />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
