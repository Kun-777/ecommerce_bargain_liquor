import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from './context/AuthProvider';
import { CartProvider } from './context/CartProvider';

import App from './App';

ReactDOM.render(
  <AuthProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </AuthProvider>,
  document.getElementById('root')
);
