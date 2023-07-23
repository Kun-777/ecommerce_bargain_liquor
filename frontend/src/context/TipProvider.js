import { createContext, useState } from 'react';

const TipContext = createContext({});

export const TipProvider = ({ children }) => {
  const [tip, setTip] = useState(0);
  return (
    <TipContext.Provider value={{ tip, setTip }}>
      {children}
    </TipContext.Provider>
  );
};

export default TipContext;
