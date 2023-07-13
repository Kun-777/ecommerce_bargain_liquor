import React from 'react';
import { TextField, Grid } from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';

const FormInput = ({ name, label, required, width }) => {
  const { control } = useFormContext();
  return (
    <Grid item xs={12} sm={width}>
      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, value },
          fieldState: { error },
          formState,
        }) => (
          <TextField
            helperText={error ? error.message : null}
            error={!!error}
            onChange={onChange}
            value={value}
            fullWidth
            label={label}
            required={required}
          />
        )}
      />
    </Grid>
  );
};

export default FormInput;
