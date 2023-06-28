import React, { useState } from 'react';
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Container,
} from '@material-ui/core';
import useStyles from './styles';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const EditProfile = () => {
  const classes = useStyles();
  const axiosPrivate = useAxiosPrivate();
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Process registration logic here
    await axiosPrivate
      .post('/edit_profile', {
        first_name: firstname,
        last_name: lastname,
        email: email,
        phone: phone,
      })
      .then((response) => {
        // add success alert
      })
      .catch((error) => {
        alert(error.response.data.detail);
      });
  };

  return (
    <>
      <CssBaseline />
      <div className={classes.paper}>
        <Box component='h1' variant='h5' sx={{ fontWeight: 'bold' }}>
          Edit Profile
        </Box>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                label='First Name'
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                label='Last Name'
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                label='Email Address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                label='Phone Number'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
      </div>
    </>
  );
};

export default EditProfile;
