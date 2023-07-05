import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { EditProfile, ChangePassword } from '../../components';
import useStyles from './styles';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Profile = () => {
  const axiosPrivate = useAxiosPrivate();
  const { setAuth } = useAuth();
  const classes = useStyles();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    if (newValue === 4) {
      // sign out user
      handleLogOut();
    } else {
      setSelectedTab(newValue);
    }
  };

  const handleLogOut = async () => {
    try {
      await axiosPrivate.delete('/user/logout');
      setAuth({ access_token: null, first_name: null });
      navigate('/');
    } catch (error) {
      alert(error.response.data.detail);
    }
  };

  return (
    <div className={classes.root}>
      {/* <CssBaseline /> */}
      <Grid container spacing={2} justifyContent='flex-start'>
        <Grid item xs={3} sm={3} md={3} lg={3}>
          <Paper className={classes.sidebar}>
            <List>
              {[
                'Edit Profile',
                'Change Password',
                'Order History',
                'Addresses',
                'Sign Out',
              ].map((tab, index) => (
                <ListItem
                  className={`${
                    index === selectedTab ? classes.tabSelected : classes.tab
                  }`}
                >
                  <ListItemText
                    primary={tab}
                    style={{ cursor: 'pointer' }}
                    className={`${
                      index === selectedTab
                        ? classes.tabTextSelected
                        : classes.tabText
                    }`}
                    onClick={(event) => handleTabChange(event, index)}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={7} sm={7} md={7} lg={7}>
          <div className={classes.content}>
            {selectedTab === 0 && <EditProfile />}
            {selectedTab === 1 && <ChangePassword />}
            {selectedTab === 2 && (
              <Typography>Content for Change Address Tab</Typography>
            )}
            {selectedTab === 3 && (
              <Typography>Content for Log Out Tab</Typography>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
