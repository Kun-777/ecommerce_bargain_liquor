import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ palette }) => ({
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  name: {
    fontFamily:
      '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif',
    fontWeight: 'bold',
    fontSize: 16,
    margin: '0 0 8px 0',
  },
  descr: {
    fontSize: 14,
    color: palette.text.secondary,
  },
  updateQty: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: 4,
    borderRadius: 40,
    border: '1px solid',
    borderColor: palette.grey[300],
  },
  iconBtn: {
    padding: 8,
    '& svg': {
      fontSize: 16,
    },
  },
  value: {
    padding: '0px 8px',
  },
}));
