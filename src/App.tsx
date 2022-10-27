import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import { ReactElement } from 'react';
import { Panel } from './components/panel_component';
import React from 'react';
import CSS from 'csstype';

const SettingsBtnStyle: CSS.Properties = {
  position: 'fixed',
  right: '2px',
  top: '2px'
};

export function App(): ReactElement
{
  const [isPanelOpen, setPanelState] = React.useState(false);
  const togglePanel = () => setPanelState(!isPanelOpen);
  
  const [isSettingsButtonOpen, setSettingsButtonState] = React.useState(true);

  return (
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
  );
}