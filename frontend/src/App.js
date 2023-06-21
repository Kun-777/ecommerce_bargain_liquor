import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar } from './components';
import { Home, Login, Register } from './pages';
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
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div style={{ display: 'flex' }}>
          <CssBaseline />
          <Navbar totalItems={0} />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
