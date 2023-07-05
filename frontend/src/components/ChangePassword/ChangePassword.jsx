import React, { useState, useEffect } from 'react';
import { Button, CssBaseline, TextField, Grid, Box } from '@material-ui/core';
import useStyles from './styles';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const ChangePassword = () => {
  const classes = useStyles();
  const axiosPrivate = useAxiosPrivate();
  const [oldpwd, setOldpwd] = useState('');
  const [newpwd, setNewpwd] = useState('');
  const [confirmpwd, setConfirmpwd] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Process registration logic here
    await axiosPrivate
      .post('/user/change_password', {
        old_password: oldpwd,
        new_password: newpwd,
      })
      .then((response) => {
        alert(response.data.msg);
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
          Change Password
        </Box>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                label='Old Password'
                value={oldpwd}
                onChange={(e) => setOldpwd(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                label='New Password'
                value={newpwd}
                onChange={(e) => setNewpwd(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                label='Confirm New Password'
                value={confirmpwd}
                error={newpwd !== confirmpwd}
                helperText={
                  newpwd !== confirmpwd &&
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
            Save
          </Button>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
