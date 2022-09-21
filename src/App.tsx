import { Button, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import React, { ReactElement } from 'react';

export function App(): ReactElement {
  return(
      <IconButton aria-label="settings"
        onClick={() => {
          alert('clicked');
        }}  
      >Settings
        <SettingsIcon/>
      </IconButton>
  );
}