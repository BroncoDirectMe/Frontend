import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';

export default function App() 
{
  return (
    <div style={{display: "flex"}}>
      <IconButton style={{marginRight: "auto"}} aria-label="settings"
          onClick={() => 
          {
            alert('clicked');
          }}  
        ><SettingsIcon/>
        </IconButton>
      </div>
  );
}

export function settingsPanel() 
{
  return ("This is the settings panel! :D");
}