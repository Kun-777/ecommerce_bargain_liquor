import React from 'react';
import { Grid } from '@material-ui/core';
import { Products, Searchfilters } from '../../components';
import useStyles from './styles';

const Home = () => {
  const classes = useStyles();

  return (
    <main className={classes.content} justifyContent='flex-start'>
      <Grid container spacing={2}>
        <Grid item xs={2} sm={2} md={2} lg={2}>
          <Searchfilters />
        </Grid>
        <Grid item xs={10} sm={10} md={10} lg={10}>
          <Products />
        </Grid>
      </Grid>
    </main>
  );
};

export default Home;
