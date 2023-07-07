import { useState, useEffect } from 'react';
import useAuth from './useAuth';
import useAxiosPrivate from './useAxiosPrivate';

const useCartSync = (key, initialState) => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [state, setState] = useState(() => {
    // Retrieve the stored value from local storage, if available
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(() => {
    // send cart to database or update local storage whenever the state changes
    const updateCartDB = async () => {
      const response = await axiosPrivate
        .put('/cart', {
          cart: state.items,
          paramsSerializer: {
            indexes: null,
          },
        })
        .catch((err) => console.log(err));
      if (response.data) {
        setState({
          items: response.data,
          total_items: state.total_items,
          total_price: state.total_price,
          modified: false,
        });
      }
    };
    if (auth.access_token) {
      console.log(state);
      if (state.modified) {
        updateCartDB();
      }
    } else {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state]);

  useEffect(() => {
    const fetchCart = async () => {
      if (auth.access_token) {
        // Use the value stored in the database
        const response = await axiosPrivate
          .get('/cart')
          .catch((err) => console.log(err));
        if (response.data) {
          let total_items = 0;
          let total_price = 0;
          for (const item of response.data) {
            total_items += item.quantity;
            total_price += item.quantity * item.price;
          }
          setState({
            items: response.data,
            total_items: total_items,
            total_price: total_price,
            modified: false,
          });
        }
      }
    };
    fetchCart();
  }, [auth, axiosPrivate]);

  return [state, setState];
};

export default useCartSync;
