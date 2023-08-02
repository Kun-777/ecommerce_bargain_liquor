import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  content: {
    backgroundColor: 'white',
    minWidth: '100%',
    position: 'relative',
  },
  img: {
    height: '100vh',
    // display: 'block',
    // overflow: 'hidden',
    width: '100%',
    objectFit: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: '50vh',
    left: '50%',
    zIndex: 1,
    transform: 'translateX(-50%) translateY(-50%)',
    textAlign: 'center',
  },
  title: {
    fontSize: 90,
    color: 'white',
    fontFamily: 'arial-black',
    textShadow:
      '0px 0px 10px rgba(0, 0, 0, 0.5), 0px 0px 10px rgba(0, 0, 0, 0.5)',
  },
  subtitle: {
    fontSize: 30,
    color: 'white',
    textShadow:
      '0px 0px 10px rgba(0, 0, 0, 0.5), 0px 0px 10px rgba(0, 0, 0, 0.5)',
  },
  shopnow: {
    marginTop: 70,
    minWidth: 500,
  },
  imageButton: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  shopnowText: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
      theme.spacing(1) + 6
    }px`,
    fontWeight: 700,
    fontSize: 30,
    textShadow:
      '0px 0px 4px rgba(0, 0, 0, 0.5), 0px 0px 4px rgba(0, 0, 0, 0.5)',
    border: '4px solid currentColor',
    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.5), 0px 0px 4px rgba(0, 0, 0, 0.5)',
  },
  products: {
    position: 'absolute',
    top: '92vh',
  },
}));
