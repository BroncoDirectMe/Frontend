import React, { useState, useEffect } from 'react';
import { Alert } from '@mui/material';

const UpdateAlert = (): JSX.Element => {
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    // calls function when update is available
    chrome.runtime.onUpdateAvailable.addListener(handleUpdateAvailable);

    // does not appear again after closing update notif
    chrome.storage.local.get('alertClosed', ({ alertClosed }) => {
      if (alertClosed) {
        setAlertOpen(false);
      }
    });
  }, []);

  const handleUpdateAvailable = (): void => {
    setAlertOpen(true);
  };

  const handleCloseAlert = (): void => {
    setAlertOpen(false);
    chrome.storage.local.set({ alertClosed: true });
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
