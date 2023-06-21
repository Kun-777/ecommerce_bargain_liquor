import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';

import useStyles from './styles';

const Product = ({ product }) => {
  const classes = useStyles();
  return (
    <Card variant="outlined" className={classes.root}>
      <CardMedia
        className={classes.media}
        image={product.image}
        title={product.name}
      />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography noWrap variant='h6' gutterBottom className={classes.name}>
            {product.name}
          </Typography>
          {/* <Typography variant='h6' className={classes.category}>
            {product.category}
          </Typography> */}
        </div>
        <div className={classes.cardContent}>
          <Typography variant='h6' className={classes.size}>
            {product.size}
          </Typography>
        </div>
        <div className={classes.cardContent}>
          <Typography variant='h5' className={classes.price}>
            {product.price}
          </Typography>
        </div>
        {/* <Typography
          dangerouslySetInnerHTML={{ __html: product.description }}
          variant='body2'
          color='textSecondary'
        /> */}
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton
          aria-label='Add to Cart'
          onClick={() => alert('TODO: fix add product to cart')}
        >
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product;
