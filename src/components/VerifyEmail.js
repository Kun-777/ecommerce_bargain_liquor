import React, { useEffect } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { useLocation, Navigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useRefreshToken from '../hooks/useRefreshToken';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const VerifyEmail = () => {
  const { auth } = useAuth();
  const location = useLocation();
  const refresh = useRefreshToken();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      }
    };

    const verifyEmail = async () => {
      await axiosPrivate.post('/user/verify_email').catch((error) => {
        alert(error.response.data.detail);
      });
    };
    if (!auth?.accessToken) {
      verifyRefreshToken();
    }
    verifyEmail();
  }, []);

  return auth.access_token ? (
    <Grid container spacing={2} justify='center'>
      <Grid item xs={12}>
        <Typography variant='h4' align='center' gutterBottom>
          Email Verified Successfully!
        </Typography>
        <Typography variant='body1' align='center'>
          Congratulations! Your email address has been successfully verified.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button
          component={Link}
          to='/about'
          variant='contained'
          color='primary'
          fullWidth
        >
          Continue
        </Button>
      </Grid>
    </Grid>
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

export default VerifyEmail;
