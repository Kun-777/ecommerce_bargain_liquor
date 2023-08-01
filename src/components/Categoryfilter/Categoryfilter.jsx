import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Checkbox from '@mui/material/Checkbox';
import useStyles from './styles';
import useSearchParamsState from '../../hooks/useSearchParamsState';
import handleSearchFilters from '../../utils/handleSearchFilters';

const Categoryfilter = () => {
  const classes = useStyles();
  const [search, setSearch] = useSearchParamsState('category', null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Initial fetch from database
    const fetchCategories = async () => {
      const data = await axios
        .get('/products/categories')
        .then(function (response) {
          return response.data;
        });
      setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    <List
      subheader={
        <ListSubheader
          sx={{
            fontSize: 20,
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          Category
        </ListSubheader>
      }
    >
      {categories.map((data) => {
        const category = data.category;
        return (
          <ListItem disablePadding className={classes.listitem}>
            <ListItemIcon className={classes.checkbox}>
              <Checkbox
                edge='start'
                checked={(search ?? '').includes(`${category}`)}
                onChange={(e) => handleSearchFilters(e, search, setSearch)}
                name={category}
              />
            </ListItemIcon>
            <ListItemText
              primary={`${category}`}
              primaryTypographyProps={{
                style: {
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                },
              }}
            />
          </ListItem>
        );
      })}
    </List>
  );
};

export default Categoryfilter;
