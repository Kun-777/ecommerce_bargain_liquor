import { useContext } from 'react';
import TipContext from '../context/TipProvider';

const useTip = () => {
  return useContext(TipContext);
};

export default useTip;
