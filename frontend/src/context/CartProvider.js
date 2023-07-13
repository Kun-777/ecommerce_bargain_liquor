import { createContext } from 'react';
import useCartSync from '../hooks/useCartSync';

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useCartSync('cart', {
    items: [],
    total_items: 0,
    subtotal: 0,
    modified: true,
    order_type: 'pick up',
  });
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
