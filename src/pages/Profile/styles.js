import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    minWidth: '100%',
  },
  sidebar: {
    marginTop: 120,
    marginLeft: 100,
    boxShadow: 'none',
  },
  tab: {
    borderRadius: 50,
  },
  tabSelected: {
    borderRadius: 50,
    backgroundColor: 'black',
  },
  tabText: {
    paddingLeft: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  tabTextSelected: {
    paddingLeft: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    marginTop: 100,
  },
}));
