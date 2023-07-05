import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  //   toolbar: theme.mixins.toolbar,
  //   title: {
  //     marginTop: '5%',
  //     marginBottom: '5%',
  //   },
  root: {
    paddingTop: 80,
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    marginLeft: '10%',
    width: '80%',
    height: '100vh',
    overflow: 'hidden',
  },
  emptyButton: {
    marginTop: '2rem',
    minWidth: '150px',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '5px',
    },
    [theme.breakpoints.up('xs')]: {
      marginRight: '20px',
    },
  },
  checkoutButton: {
    marginTop: '2rem',
    minWidth: '150px',
  },
  //   link: {
  //     textDecoration: 'none',
  //   },
  //   cardDetails: {
  //     display: 'flex',
  //     marginTop: '10%',
  //     width: '100%',
  //     justifyContent: 'space-between',
  //   },
  //   subtotal: {
  //     marginTop: '2rem',
  //   },
  heading: {
    fontWeight: 900,
    fontSize: '1.75rem',
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'left',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '2.25rem',
    },
  },
  table: {
    minWidth: 650,
    maxHeight: '55%',
    // overflow: 'auto',
  },
  btn: {
    width: '100%',
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 40,
    border: '1px solid',
    borderColor: theme.palette.grey[400],
    '& > *': {
      fontWeight: 'bold',
      textTransform: 'none',
    },
    marginRight: 72,
    [theme.breakpoints.up('sm')]: {
      marginRight: 'unset',
    },
  },
  big: {
    fontSize: 16,
  },
  large: {
    fontSize: 24,
  },
  mainGrid: {
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row-reverse',
    },
    marginTop: '2rem',
  },
}));
