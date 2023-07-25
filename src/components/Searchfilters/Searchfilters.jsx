import React, { useEffect } from 'react';
import { Paper } from '@material-ui/core';
import useStyles from './styles';
import Categoryfilter from '../Categoryfilter/Categoryfilter';
import Pricefilter from '../Pricefilter/Pricefilter'

const Searchfilters = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.sidebar}>
      <Categoryfilter/>
      <Pricefilter/>
    </Paper>
  );
};

export default Searchfilters;
