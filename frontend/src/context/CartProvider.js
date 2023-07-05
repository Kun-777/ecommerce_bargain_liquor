import { createContext, useState } from 'react';
import useSyncWithLocalStorage from '../hooks/useSyncWithLocalStorage';

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useSyncWithLocalStorage('cart', {
    items: [],
    total_items: 0,
  });
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
