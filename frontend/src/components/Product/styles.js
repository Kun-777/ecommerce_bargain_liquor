import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    maxWidth: '100%',
    borderColor: '#f0f0f0',
    // borderRadius: 0,
  },
  media: {
    height: 0,
    paddingTop: '90%',
  },
  cardActions: {
    marginTop: '-2rem',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: '17px',
    fontWeight: '300',
  },
  size: {
    fontSize: '12px',
    fontWeight: '300',
    color: 'grey',
  },
  price: {
    marginTop: '0.8rem',
    fontWeight: '600',
  },
  //   category: {
  //     fontSize: '15px',
  //     textAlign: 'right',
  //     fontWeight: '300',
  //     color: 'grey',
  //   },
}));
