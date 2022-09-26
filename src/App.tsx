import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import { ReactElement } from 'react';
import { PopUp } from './components/settingsPanel/settingsPanel.components';


export function App(): ReactElement
{
const [isSPModalOpen, setSPModalState] = React.useState(false);
const toggleSPModal = () => setSPModalState(!isSPModalOpen);

  return (
    <div>
      <IconButton className='settingsButton'
          onClick={toggleSPModal}
        ><SettingsIcon/>
        </IconButton>
        <PopUp
          title={"Painful Popup"}
          isOpen={isSPModalOpen}
          onClose={toggleSPModal}
        > Pain </PopUp>
      </div>
  );
}