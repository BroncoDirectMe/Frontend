import React, { ReactElement } from 'react';
import { ToggleButton } from './ToggleButton';
import SearchBar from './SearchBar';
import { MsalProvider } from '@azure/msal-react';
import { msalInstance, MicrosoftOAuth } from './MicrosoftOath';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import { Panel } from './components/panel_component';
import CSS from 'csstype';

const SettingsBtnStyle: CSS.Properties = {
  position: 'fixed',
  right: '2px',
  top: '2px'
};

export function App(): ReactElement {

  const [isPanelOpen, setPanelState] = React.useState(false);
  const togglePanel = (): void => setPanelState(!isPanelOpen);
  
  const [isSettingsButtonOpen, setSettingsButtonState] = React.useState(true);

  return (
    <MsalProvider instance={msalInstance}>
      <div className="App">
        <ToggleButton />
        <SearchBar />
        <MicrosoftOAuth />
        <div>
        {
          isSettingsButtonOpen ? 
          <IconButton
          onClick={() => 
          { 
            togglePanel();
            setSettingsButtonState(false); 
          }}
          style={SettingsBtnStyle}
          ><SettingsIcon/>
          </IconButton> : null
        }

        <Panel
          title={'Settings'}
          isOpen={isPanelOpen}
          onClose={() => 
          { 
            togglePanel(); 
            setSettingsButtonState(true); 
          }} 
          children={"Filler"}></Panel>
        </div>
      </div>
    </MsalProvider>
  );
}