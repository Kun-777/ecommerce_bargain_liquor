import React, { useState } from 'react';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { DateTimePicker, TipSelection } from '../../components';
import useTip from '../../hooks/useTip';

const useStyles = makeStyles((theme) => ({
  form: {
    marginBottom: 20,
  },
}));

const AddressForm = ({ next, order_type, userInfo }) => {
  const classes = useStyles();
  const [firstname, setFirstName] = useState(userInfo.first_name);
  const [lastname, setLastName] = useState(userInfo.last_name);
  const [email, setEmail] = useState(userInfo.email);
  const [phone, setPhone] = useState(userInfo.phone);
  const [addressLine1, setAddressLine1] = useState(userInfo.address_line_1);
  const [addressLine2, setAddressLine2] = useState(userInfo.address_line_2);
  const [city, setCity] = useState(userInfo.city);
  const [state, setState] = useState(userInfo.state);
  const [zipCode, setZipCode] = useState(userInfo.zip_code);
  const [scheduledDatetime, setScheduledDatetime] = useState(null);
  const { tip } = useTip();

  return (
    <>
      <Typography variant='h6' gutterBottom>
        {order_type === 'delivery' && 'Select Delivery Time'}
        {order_type === 'pick up' && 'Select Pick Up Time'}
      </Typography>
      <div className={classes.form}>
        <DateTimePicker setScheduledDatetime={setScheduledDatetime} />
      </div>
      <Typography variant='h6' gutterBottom>
        Contact Info
      </Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          next({
            first_name: firstname,
            last_name: lastname,
            email: email,
            phone: phone,
            address_line_1: addressLine1,
            address_line_2: addressLine2,
            city: city,
            state: state,
            zip_code: zipCode,
            schedule: scheduledDatetime,
            tip: tip,
          });
        }}
      >
        <Grid container spacing={3} className={classes.form}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label='First name'
              fullWidth
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label='Last name'
              fullWidth
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label='Email'
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label='Phone number'
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Grid>
        </Grid>
        {order_type === 'delivery' && (
          <>
            <Typography variant='h6' gutterBottom>
              Delivery Address
            </Typography>
            <Grid container spacing={3} className={classes.form}>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  label='Address line 1'
                  fullWidth
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  label='Address line 2'
                  fullWidth
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  required
                  label='City'
                  fullWidth
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  required
                  label='State'
                  fullWidth
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  required
                  label='ZIP Code'
                  fullWidth
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </Grid>
            </Grid>
            <Typography variant='h6' gutterBottom>
              Tip your driver
            </Typography>
            <div className={classes.form}>
              <TipSelection />
            </div>
          </>
        )}
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
    </>
  );
};

export default AddressForm;
