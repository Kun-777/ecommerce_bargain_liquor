import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  product: {
    padding: theme.spacing(0.5),
  },
  content: {
    marginTop: theme.spacing(3),
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
}));
