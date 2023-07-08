import React, { useState, useEffect } from 'react';
import { Alert } from '@mui/material';

const UpdateAlert = (): JSX.Element => {
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    // calls function when update is available
    chrome.runtime.onUpdateAvailable.addListener(handleUpdateAvailable);
  }, []);

  const handleUpdateAvailable = (): void => {
    setAlertOpen(true);
  };

  const handleCloseAlert = (): void => {
    setAlertOpen(false);
  };

  // The Alert itself
  return alertOpen ? (
    <Alert onClose={handleCloseAlert} severity="info">
      A new version is available! Please update.
    </Alert>
  ) : (
    <></>
  );
};

export default UpdateAlert;
