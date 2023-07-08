/*global chrome*/
import React, { useState, useEffect } from 'react';
import { Alert, Button } from '@mui/material';

const UpdateAlert = (): JSX.Element => {
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    const str = chrome.runtime.getURL;
    // calls function when update is available
    chrome.runtime.onUpdateAvailable.addListener(handleUpdateAvailable);
  }, []);

  const handleUpdateAvailable = (): void => {
    setAlertOpen(true);
  };

  const handleCloseAlert = (): void => {
    // updates the extension when it reloads, see onUpdateAvailable docs
    chrome.runtime.reload;
    setAlertOpen(false);
  };

  // The Alert itself
  return alertOpen ? (
    <Alert
      action={
        <Button onClick={handleCloseAlert} color="inherit" size="small">
          UPDATE
        </Button>
      }
      severity="info"
    >
      A new version is available!
    </Alert>
  ) : (
    <></>
  );
};

export default UpdateAlert;
