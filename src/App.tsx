import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';

export default function App() 
{
  return (
    <IconButton aria-label="settings"
        onClick={() => 
        {
          alert('clicked');
        }}  
      ><SettingsIcon/>
      </IconButton>
  );
}