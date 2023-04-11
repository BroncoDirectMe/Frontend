import React, { ReactElement } from 'react';
import { ToggleButton } from './ToggleButton';
import SearchBar from './SearchBar';
import { MsalProvider } from '@azure/msal-react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
            <Grid container justifyContent="center" spacing={1}>
              <Grid item xs={10} sm={8} md={6}>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={1}
                >
                  <Grid item>
                    <h1>BroncoDirectMe Search</h1>
                  </Grid>
                  <Grid item>
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
              </Grid>
              <Grid
                item
                xs={10}
                sm={8}
                md={6}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <SearchBar />
              </Grid>
            </Grid>
            {/* <MicrosoftOAuth /> */}
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
