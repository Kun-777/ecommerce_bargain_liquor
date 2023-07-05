import { makeStyles, alpha } from '@material-ui/core/styles';

const drawerWidth = 0;

export default makeStyles((theme) => ({
  appBar: {
    boxShadow: 'none',
    paddingTop: 2,
    minHeight: 70,
    // borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    // background: 'linear-gradient(180deg, #8B0000 80%, #FFFFFF 90%)',
    background: '#000000',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
    alignItems: 'center',
    display: 'flex',
    textDecoration: 'none',
    color: 'white',
    fontWeight: 'bold',
  },
  login: {
    marginRight: theme.spacing(3),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  searchBar: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    minWidth: '40%',
    maxHeight: 40,
  },
  searchInput: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  searchIcon: {
    padding: 10,
  },
  grow: {
    flexGrow: 1,
  },

  //   search: {
  //     position: 'relative',
  //     borderRadius: theme.shape.borderRadius,
  //     backgroundColor: alpha(theme.palette.common.white, 0.15),
  //     '&:hover': {
  //       backgroundColor: alpha(theme.palette.common.white, 0.25),
  //     },
  //     marginRight: theme.spacing(2),
  //     marginLeft: 0,
  //     width: '100%',
  //     [theme.breakpoints.up('sm')]: {
  //       width: 'auto',
  //     },
  //   },
  //   searchIcon: {
  //     padding: theme.spacing(0, 2),
  //     height: '100%',
  //     position: 'absolute',
  //     pointerEvents: 'none',
  //     display: 'flex',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //   },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
