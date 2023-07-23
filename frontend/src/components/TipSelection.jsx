import React from 'react';
import { Grid, Button } from '@material-ui/core';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import useTip from '../hooks/useTip';
import useCart from '../hooks/useCart';

const TipSelection = () => {
  const { tip, setTip } = useTip();
  const { cart } = useCart();

  const tipOptions = [
    { value: 0.15 * cart.subtotal, label: '15%' },
    { value: 0.2 * cart.subtotal, label: '20%' },
    { value: 0.25 * cart.subtotal, label: '25%' },
  ];

  return (
    <Grid container spacing={2}>
      {tipOptions.map((option) => (
        <Grid item xs={4} key={option.value}>
          <Button
            variant='outlined'
            color={tip === option.value ? 'primary' : 'default'}
            onClick={() => {
              setTip(option.value);
            }}
            fullWidth
          >
            {option.label}
          </Button>
        </Grid>
      ))}
      <Grid item xs={6}>
        <CurrencyTextField
          label='Custom Tip'
          variant='filled'
          value={tip}
          currencySymbol='$'
          //minimumValue="0"
          outputFormat='number'
          decimalCharacter='.'
          digitGroupSeparator=','
          onChange={(event, value) => {
            setTip(value);
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <p>Selected Tip Amount: {tip ? `$${tip.toFixed(2)}` : 0}</p>
      </Grid>
    </Grid>
  );
};

export default TipSelection;
