import React, { ReactElement } from 'react';
import { ToggleButton } from './ToggleButton';
import SearchBar from './SearchBar';
import { MsalProvider } from '@azure/msal-react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { msalInstance, MicrosoftOAuth } from './MicrosoftOath';
import { Box, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { Panel } from './components/panel_component';
import './styles/App.css';
import UpdateAlert from './components/UpdateAlert';

/**
 * @returns Main app component
 */
export function App(): ReactElement {
  const [isPanelOpen, setPanelState] = React.useState(false);
  const togglePanel = (): void => setPanelState(!isPanelOpen);
  const [isSettingsButtonOpen, setSettingsButtonState] = React.useState(true);

  return (
    <MsalProvider instance={msalInstance}>
      <div className="App">
        {!isPanelOpen && (
          <section>
            <UpdateAlert />
            <div id="errorElm"></div>
            <Box id="mainContent">
              <h1>BroncoDirectMe Search</h1>
              {isSettingsButtonOpen && (
                <IconButton
                  onClick={() => {
                    togglePanel();
                    setSettingsButtonState(false);
                  }}
                  id="settingsButton"
                >
                  <SettingsIcon id="settingsIcon" />
                </IconButton>
              )}
            </Box>
            <SearchBar settingBarState={isSettingsButtonOpen} />
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
