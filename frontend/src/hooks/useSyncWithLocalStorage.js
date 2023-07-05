import { useState, useEffect } from 'react';

const useSyncWithLocalStorage = (key, initialState) => {
  const [state, setState] = useState(() => {
    // Retrieve the stored value from local storage, if available
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(() => {
    // Update local storage whenever the state changes
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

export default useSyncWithLocalStorage;
