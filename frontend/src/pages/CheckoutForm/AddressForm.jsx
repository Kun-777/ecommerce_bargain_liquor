import React, { useState, useEffect } from 'react';
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';

import FormInput from './FormInput';

const AddressForm = ({ next, order_type }) => {
  const methods = useForm();

  return (
    <>
      <Typography variant='h6' gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) => {
            next(data);
          })}
        >
          <Grid container spacing={3}>
            <FormInput
              required
              name='first_name'
              label='First name'
              width={6}
            />
            <FormInput required name='last_name' label='Last name' width={6} />
            <FormInput required name='email' label='Email' width={6} />
            <FormInput required name='phone' label='Phone number' width={6} />
            {order_type === 'delivery' && (
              <>
                <FormInput
                  required
                  name='address_line_1'
                  label='Address line 1'
                  width={12}
                />
                <FormInput
                  name='address_line_2'
                  label='Address line 2'
                  width={12}
                />
                <FormInput required name='city' label='City' width={6} />
                <FormInput required name='state' label='State' width={6} />
                <FormInput
                  required
                  name='zip_code'
                  label='ZIP Code'
                  width={6}
                />
              </>
            )}
          </Grid>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button component={Link} to='/cart' variant='outlined'>
              Back to Cart
            </Button>
            <Button type='submit' variant='contained' color='primary'>
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
