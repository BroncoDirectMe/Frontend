import React, { useState, useEffect } from 'react';
import { Alert } from '@mui/material';

const UpdateAlert = (): JSX.Element => {
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    // calls function when update is available
    chrome.runtime.onUpdateAvailable.addListener(handleUpdateAvailable);

    // does not appear again after closing update notif
    chrome.storage.local.get('alertClosed', ({ alertClosed }) => {
      if (alertClosed) {
        setAlertVisible(false);
      }
    });
  }, []);

  const handleUpdateAvailable = (): void => {
    setAlertVisible(true);
    console.log(`Updated | alertClosed set to false`);
    chrome.storage.local.set({ alertClosed: false }, () => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      }
    });
  };

  const handleCloseAlert = (): void => {
    console.log(`Alert closed! | alertClosed set to true`);
    setAlertVisible(false);
    chrome.storage.local.set({ alertClosed: true }, () => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      }
    });
  };

  // The Alert itself
  return alertVisible ? (
    <Alert onClose={handleCloseAlert} severity="info">
      A new version is available! Please update.
    </Alert>
  ) : (
    <></>
  );
};

export default UpdateAlert;
