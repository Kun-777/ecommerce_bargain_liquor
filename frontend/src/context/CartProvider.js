import { createContext } from 'react';
import useCartSync from '../hooks/useCartSync';

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useCartSync('cart', {
    items: [],
    total_items: 0,
    total_price: 0,
    modified: true,
  });
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
