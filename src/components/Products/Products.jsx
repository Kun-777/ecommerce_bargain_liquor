import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import Product from '../Product/Product';
import { priceRanges } from '../Pricefilter/Pricefilter';
import useStyles from './styles';
import { useSearchParams } from 'react-router-dom';
import axios from '../../api/axios';
import isRelatedToSearch from '../../utils/isRelatedToSearch';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useSearchParams();
  const [filtered, setFilter] = useState(products);
  const classes = useStyles();

  useEffect(() => {
    if (
      search.get('category') === null &&
      search.get('price') === null &&
      search.get('text') === null
    ) {
      setFilter(() => products);
    } else {
      setFilter(() =>
        products.filter(
          (product) =>
            (!search.get('category') ||
              search.get('category').includes(product.category)) &&
            priceRanges[search.get('price')].apply(null, [product.price]) &&
            (!search.get('text') ||
              isRelatedToSearch(product, search.get('text')))
        )
      );
    }
  }, [search, products]);

  useEffect(() => {
    // Initial fetch from database
    const fetchProducts = async () => {
      await axios
        .get('/products/all')
        .then((response) => {
          setProducts(response.data);
        })
        .catch((e) => console.log(e));
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Grid container justifyContent='flex-start'>
        {filtered.length !== 0 &&
          filtered.map((product) => (
            <Grid
              item
              key={product.id}
              xs={6}
              sm={6}
              md={4}
              lg={3}
              className={classes.product}
            >
              <Product product={product} />
            </Grid>
          ))}
        {search.get('text') && filtered.length === 0 && (
          <Typography variant='h5' className={classes.content}>
            Sorry, no results found based on your search.
          </Typography>
        )}
      </Grid>
    </>
  );
};

export default Products;
