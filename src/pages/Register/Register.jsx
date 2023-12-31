import React, { useState } from 'react';
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from '@material-ui/core';
import useStyles from './styles';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpwd, setConfirmpwd] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Process registration logic here
    await axios
      .post('/user/register', {
        first_name: firstname,
        last_name: lastname,
        email: email,
        phone: phone,
        password: password,
      })
      .then((response) => {
        setMessage(response.data.msg);
        navigate('/login');
      })
      .catch((error) => {
        setMessage(error.response.data.detail);
      });
  };

  const handlePhoneChange = (e) => {
    if (e.target.value === '' || /^[0-9\b]{0,10}$/.test(e.target.value)) {
      setPhone(e.target.value);
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Box component='h1' variant='h5' sx={{ fontWeight: 'bold' }}>
          Sign up
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
                onChange={handlePhoneChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                label='Password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                label='Confirm Password'
                type='password'
                value={confirmpwd}
                error={password !== confirmpwd}
                helperText={
                  password !== confirmpwd &&
                  'New password and confirm password do not match'
                }
                onChange={(e) => setConfirmpwd(e.target.value)}
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
            Sign Up
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link href='/login' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
        {message && <div className={classes.message}>{message}</div>}
      </div>
      <Box mt={5}>
        <Typography variant='body2' color='textSecondary' align='center'>
          {'© '}
          {new Date().getFullYear()}
          {' Bargain Liquor'}
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;
