import React, { useState } from 'react';
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from '@material-ui/core';
import useStyles from './styles';
import { axiosPrivate } from '../../api/axios';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Login = () => {
  const { setAuth } = useAuth();
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (remember) {
      // get an access token that will expire soon and a refresh token
      await axiosPrivate
        .post('/user/login', {
          email: email,
          password: password,
        })
        .then((response) => {
          setAuth((prev) => ({
            ...prev,
            access_token: response.data.access_token,
            first_name: response.data.first_name,
            is_admin: response.data.is_admin,
          }));
          navigate(from, { replace: true });
        })
        .catch((error) => {
          setMessage(error.response.data.detail);
        });
    } else {
      // get the access token only
      await axiosPrivate
        .post('/user/login_no_refresh', {
          email: email,
          password: password,
        })
        .then((response) => {
          setAuth((prev) => ({
            ...prev,
            access_token: response.data.access_token,
            first_name: response.data.first_name,
            is_admin: response.data.is_admin,
          }));
          navigate(from, { replace: true });
        })
        .catch((error) => {
          setMessage(error.response.data.detail);
        });
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
          Sign in
        </Box>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                value='remember'
                color='primary'
                onChange={(e) => {
                  setRemember(e.target.checked);
                }}
              />
            }
            label='Remember me'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='/resetpassword' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href='/register' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
        {message && <div className={classes.message}>{message}</div>}
      </div>
      <Box mt={8}>
        <Typography variant='body2' color='textSecondary' align='center'>
          {'© '}
          {new Date().getFullYear()}
          {' Bargain Liquor'}
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
