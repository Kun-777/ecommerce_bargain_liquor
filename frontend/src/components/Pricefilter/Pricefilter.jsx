import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Checkbox from '@mui/material/Checkbox';
import useStyles from './styles';
import useSearchParamsState from '../../hooks/useSearchParamsState';
import handleSearchFilters from '../../utils/handleSearchFilters';

export const priceRanges = {
  under10: (price) => price < 10,
  '10to20': (price) => price >= 10 && price < 20,
  '20to30': (price) => price >= 20 && price < 30,
  '30to40': (price) => price >= 30 && price < 40,
  '40to50': (price) => price >= 40 && price < 50,
  '50above': (price) => price >= 50,
  null: (price) => true,
};

const priceRangesText = [
  'Under $10',
  '$10 to $20',
  '$20 to $30',
  '$30 to $40',
  '$40 to $50',
  '$50 & Above',
];

const Pricefilter = () => {
  const classes = useStyles();
  const [search, setSearch] = useSearchParamsState('price', null);

  return (
    <List
      subheader={
        <ListSubheader sx={{ fontSize: 20, fontWeight: 'bold', mt: 2 }}>
          Price Range
        </ListSubheader>
      }
    >
      {Object.keys(priceRanges)
        .slice(0, 6)
        .map((priceRange, index) => {
          return (
            <ListItem disablePadding className={classes.listitem}>
              <ListItemIcon className={classes.checkbox}>
                <Checkbox
                  edge='start'
                  checked={(search ?? '').includes(`${priceRange}`)}
                  onChange={(e) => handleSearchFilters(e, search, setSearch)}
                  name={priceRange}
                />
              </ListItemIcon>
              <ListItemText primary={`${priceRangesText[index]}`} />
            </ListItem>
          );
        })}
    </List>
  );
};

export default Pricefilter;
