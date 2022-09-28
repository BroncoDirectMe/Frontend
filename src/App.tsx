import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import { ReactElement } from 'react';


export function App(): ReactElement
{
  return (
    <div>
      <IconButton className='settingsButton'
          onClick={() => {
            alert('clicked');
          }}
        ><SettingsIcon/>
        </IconButton>
      </div>
  );
}