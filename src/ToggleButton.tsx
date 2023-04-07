import React, { useState, useEffect } from 'react';
import { Box, FormControlLabel, Switch } from '@mui/material';

export const ToggleButton = (): JSX.Element => {
  const [checked, setChecked] = useState(false); // Default off

  useEffect(() => {
    chrome.storage.local.get('toggleExtension', (result: any) => {
      if (result.toggleExtension) {
        setChecked(result.toggleExtension === 'on');
      } else {
        // By default, the extension is enabled
        chrome.storage.local.set({ toggleExtension: 'on' }, () => {
          setChecked(true);
        });
      }
    });
  }, []);

  // Save state to chrome.storage.local when the toggle button is clicked
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    chrome.storage.local
      .set({ toggleExtension: isChecked ? 'on' : 'off' })
      .catch((err: Error) => {
        console.error(err);
      });
  };

  return (
    <Box>
      <FormControlLabel
        label="Disable/Enable Extension"
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
