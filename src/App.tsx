import React, { ReactElement } from 'react';
// import { ToggleButton } from './ToggleButton';
import SearchBar from './SearchBar';
import { MsalProvider } from '@azure/msal-react';
import { msalInstance, MicrosoftOAuth } from './MicrosoftOath';
import SettingsIcon from '@mui/icons-material/Settings';
import { Grid } from '@mui/material';

export function App(): ReactElement {
  return (
    <MsalProvider instance={msalInstance}>
      <div className="App">
        {/* <ToggleButton /> */}
        <Grid container>
          <Grid item xs={11}>
            <h1>BroncoDirectMe</h1>
          </Grid>
          <Grid item xs={1} style={{ display: 'flex' }}>
            <SettingsIcon sx={{ margin: 'auto', fontSize: '2rem' }} />
          </Grid>
        </Grid>
        <SearchBar />
        <MicrosoftOAuth />
      </div>
    </MsalProvider>
  );
}
