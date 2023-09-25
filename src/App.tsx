import React, { ReactElement } from 'react';
import { ToggleButton } from './components/ToggleButton';
import SearchBar from './components/SearchBar';
import { MsalProvider } from '@azure/msal-react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { msalInstance, MicrosoftOAuth } from './components/MicrosoftOath';
import { Box, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { Panel } from './components/panel_component';
import DegreeProgressBar from './components/DegreeProgressBar';
import './styles/App.css';
import UpdateAlert from './components/UpdateAlert';
import TermsOfService from './components/TermsOfService';

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
            <TermsOfService />
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
            <DegreeProgressBar />
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
