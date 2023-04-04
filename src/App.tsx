import React, { ReactElement } from 'react';
import { ToggleButton } from './ToggleButton';
import SearchBar from './SearchBar';
import { MsalProvider } from '@azure/msal-react';
import { msalInstance, MicrosoftOAuth } from './MicrosoftOath';
import { Grid, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { Panel } from './components/panel_component';

export function App(): ReactElement {
  const [isPanelOpen, setPanelState] = React.useState(false);
  const togglePanel = (): void => setPanelState(!isPanelOpen);
  const [isSettingsButtonOpen, setSettingsButtonState] = React.useState(true);

  return (
    <MsalProvider instance={msalInstance}>
      <div className="App" style={{ minHeight: 250 }}>
        {!isPanelOpen && (
          <section>
            <div id="errorElm"></div>
            <Grid container>
              <Grid item xs={11}>
                <h1>BroncoDirectMe</h1>
              </Grid>
              <Grid item xs={1} style={{ display: 'flex' }}>
                {isSettingsButtonOpen && (
                  <IconButton
                    onClick={() => {
                      togglePanel();
                      setSettingsButtonState(false);
                    }}
                    sx={{ padding: '0' }}
                  >
                    <SettingsIcon sx={{ fontSize: '2rem' }} />
                  </IconButton>
                )}
              </Grid>
            </Grid>
            <SearchBar />
            <MicrosoftOAuth />
          </section>
        )}
        {/* Hides main app components when setting panel opens */}

        <Panel
          title={'Settings'}
          isOpen={isPanelOpen}
          onClose={() => {
            togglePanel();
            setSettingsButtonState(true);
          }}
        >
          <ToggleButton />
        </Panel>
      </div>
    </MsalProvider>
  );
}
