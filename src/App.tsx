import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import { ReactElement } from 'react';
import { Panel } from './components/panel.component';
import React from 'react';
import CSS from 'csstype';

const SettingsBtnStyle: CSS.Properties = {
  position: 'absolute',
  right: 0,
  top: 0
};
const WrapContent: CSS.Properties = {
  inlineSize: 'min-content'
};

export function App(): ReactElement
{
  const [isPanelOpen, setPanelState] = React.useState(false);
  const togglePanel = () => setPanelState(!isPanelOpen);

  return (
    <div style={WrapContent}>
      <IconButton
          onClick={togglePanel}
          style={SettingsBtnStyle}
        ><SettingsIcon/>
        </IconButton>

        <Panel
        title={'Settings'}
        isOpen={isPanelOpen}
        onClose={togglePanel} 
        children={"Filler"}></Panel>
      </div>
  );
}