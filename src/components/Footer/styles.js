import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    backgroundColor: '#000',
    padding: theme.spacing(3),
    marginTop: 50,
    bottom: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  div: {
    marginTop: theme.spacing(1),
  },
  footerLink: {
    margin: theme.spacing(0, 1),
    color: theme.palette.common.white,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  copyright: {
    margin: theme.spacing(0, 1),
    color: theme.palette.common.white,
  },
  contactInfo: {
    color: 'white',
  },
  address: {
    color: 'white',
    marginTop: theme.spacing(1),
  },
}));
