import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Product from '../Product/Product';
import { priceRanges } from '../Pricefilter/Pricefilter';
import useStyles from './styles';
import { useSearchParams } from 'react-router-dom';
import axios from '../../api/axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useSearchParams();
  const [filtered, setFilter] = useState(products);
  const classes = useStyles();

  useEffect(() => {
    if (search.get('category') === null && search.get('price') === null) {
      setFilter(() => products);
    } else {
      setFilter(() =>
        products.filter(
          (product) =>
            (!search.get('category') ||
              search.get('category').includes(product.category)) &&
            priceRanges[search.get('price')].apply(null, [product.price])
        )
      );
    }
  }, [search, products]);

  useEffect(() => {
    // Initial fetch from database
    const fetchProducts = async () => {
      await axios.get('/products').then((response) => {
        setProducts(response.data);
      });
    };
    fetchProducts();
  }, []);

  return (
    <Grid container justifyContent='flex-start'>
      {filtered.map((product) => (
        <Grid
          item
          key={product.id}
          xs={12}
          sm={6}
          md={4}
          lg={3}
          className={classes.product}
        >
          <Product product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Products;
