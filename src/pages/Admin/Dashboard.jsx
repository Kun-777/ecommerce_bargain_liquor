import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Orders from './Orders';
import ProductsAdmin from './ProductsAdmin';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: '12%',
    marginTop: 70,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Paper className={classes.drawerPaper}>
        <List>
          <ListItem button onClick={() => setTab(0)}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary='Orders' />
          </ListItem>
          <ListItem button onClick={() => setTab(1)}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary='Products' />
          </ListItem>
        </List>
      </Paper>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='lg' className={classes.container}>
          {tab === 0 && (
            <Paper className={classes.paper}>
              <Orders />
            </Paper>
          )}
          {tab === 1 && (
            <Paper className={classes.paper}>
              <ProductsAdmin />
            </Paper>
          )}
        </Container>
      </main>
    </div>
  );
}
