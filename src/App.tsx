import React, { ReactElement } from 'react';
import { ToggleButton } from './ToggleButton';
import SearchBar from './SearchBar';
import { MsalProvider } from '@azure/msal-react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { msalInstance, MicrosoftOAuth } from './MicrosoftOath';
import { Box, IconButton } from '@mui/material';
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
            <Box display="flex" justifyContent="space-between" paddingLeft="5vw" paddingRight="5vw">
              <h1>BroncoDirectMe Search</h1>
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
            </Box>
            <SearchBar />
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
