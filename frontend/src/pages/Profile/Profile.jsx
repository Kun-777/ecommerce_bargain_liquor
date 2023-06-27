import React from 'react';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
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
    const controller = new AbortController();
    try {
      await axiosPrivate.delete('/logout', {
        signal: controller.signal,
      });
      controller.abort();
      setAuth({ access_token: null });
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
        <Grid item>
          <div className={classes.content}>
            {selectedTab === 0 && (
              <>
                <Typography>Content for Edit Information Tab</Typography>
              </>
            )}
            {selectedTab === 1 && (
              <Typography>Content for Change Password Tab</Typography>
            )}
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
