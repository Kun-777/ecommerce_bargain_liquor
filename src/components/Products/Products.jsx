import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import Pagination from '@mui/material/Pagination';
import Product from '../Product/Product';
import { priceRanges } from '../Pricefilter/Pricefilter';
import useStyles from './styles';
import { useSearchParams } from 'react-router-dom';
import axios from '../../api/axios';
import isRelatedToSearch from '../../utils/isRelatedToSearch';

const Products = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [search] = useSearchParams();
  const [filtered, setFilter] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

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
              // check if category is in one of the selected categories
              search.get('category').includes(product.category)) &&
            // check if price is in one of the selected price ranges
            (!search.get('price') ||
              search
                .get('price')
                .split('||')
                .map((singleFilter) => priceRanges[singleFilter])
                .map((func) => func.apply(null, [product.price]))
                .some((res) => res === true)) &&
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
          setProducts(
            response.data?.sort((a, b) => b.popularity - a.popularity)
          );
        })
        .catch((e) => console.log(e));
    };
    fetchProducts();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filtered.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <>
      <Grid container justifyContent='flex-start'>
        {currentProducts.length !== 0 &&
          currentProducts.map((product) => (
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
      {filtered.length > productsPerPage && (
        <Pagination
          count={Math.ceil(filtered.length / productsPerPage)}
          page={currentPage}
          variant='outlined'
          onChange={(e, page) => setCurrentPage(page)}
          className={classes.pagination}
        />
      )}
    </>
  );
};

export default Products;
