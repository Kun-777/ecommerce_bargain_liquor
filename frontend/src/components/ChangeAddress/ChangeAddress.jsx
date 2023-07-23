import React, { useState, useEffect } from 'react';
import { Button, CssBaseline, TextField, Grid, Box } from '@material-ui/core';
import useStyles from './styles';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const ChangeAddress = () => {
  const classes = useStyles();
  const axiosPrivate = useAxiosPrivate();
  const [message, setMessage] = useState(null);
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Process registration logic here
    await axiosPrivate
      .put('/user/change_address', {
        address_line_1: addressLine1,
        address_line_2: addressLine2,
        city: city,
        state: state,
        zip_code: zipCode,
      })
      .then((response) => {
        setMessage(response.data.msg);
      })
      .catch((error) => {
        setMessage(error.response.data.detail);
      });
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      await axiosPrivate
        .get('/user/profile')
        .then((response) => {
          setAddressLine1(response.data.address_line_1);
          setAddressLine2(response.data.address_line_2);
          setCity(response.data.city);
          setState(response.data.state);
          setZipCode(response.data.zip_code);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchUserInfo();
  }, []);

  return (
    <>
      <CssBaseline />
      <div className={classes.paper}>
        <Box component='h1' variant='h5' sx={{ fontWeight: 'bold' }}>
          Change Address
        </Box>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                label='Address Line 1'
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                fullWidth
                label='Address Line 2'
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                label='City'
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                label='State'
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                label='Zip Code'
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Save
          </Button>
        </form>
        {message && <div className={classes.message}>{message}</div>}
      </div>
    </>
  );
};

export default ChangeAddress;
