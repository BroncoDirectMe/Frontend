import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import { ReactElement } from 'react';
import { Modal } from './components/Modal/Modal.component';

export function App(): ReactElement
{
const [isModalOpen, setModalState] = React.useState(false);
const toggleModal = () => setModalState(!isModalOpen);

  return (
    <div>
      <IconButton className='settingsButton'
          onClick={toggleModal}
        ><SettingsIcon/>
        </IconButton>
        <Modal
          title={"Settings"}
          isOpen={isModalOpen}
          onClose={toggleModal}
        > Insert settings stuff here 
        </Modal>
      </div>
  );
}