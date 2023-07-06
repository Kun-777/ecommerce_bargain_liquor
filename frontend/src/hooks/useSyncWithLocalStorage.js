import { useState, useEffect } from 'react';
import useAuth from './useAuth';
import useAxiosPrivate from './useAxiosPrivate';

const useSyncWithLocalStorage = (key, initialState) => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [state, setState] = useState(() => {
    // Retrieve the stored value from local storage, if available
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(() => {
    // Update local storage whenever the state changes
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  useEffect(() => {
    const fetchCart = async () => {
      if (auth.access_token) {
        // Use the value stored in the database
        const value = await axiosPrivate.get('/cart');
        if (value.data) {
          let total_items = 0;
          for (const item of value.data) {
            total_items += item.quantity;
          }
          setState({
            items: value.data,
            total_items: total_items,
          });
        }
      }
    };
    fetchCart();
  }, [auth, axiosPrivate]);

  return [state, setState];
};

export default useSyncWithLocalStorage;
