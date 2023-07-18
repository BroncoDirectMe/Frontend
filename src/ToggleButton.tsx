import * as React from 'react';
import { Box, FormControlLabel, Switch } from '@mui/material';
import { useState } from 'react';

export const ToggleButton = (): JSX.Element => {
  const [checked, setChecked] = useState(false); // Default state is when the button is not enabled
  console.log({ checked }); // Logs whether the button is checked or not
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    // handleChange records the event of when the input is changed (button enabled)
    setChecked(event.target.checked);
  };
  return (
    <Box>
      <FormControlLabel
        label="Enabled"
        control={
          <Switch
            checked={checked}
            onChange={handleChange}
            size="medium"
            color="success" // When button is enabled, it renders as green (success)
          />
        }
      />
    </Box>
  );
};
