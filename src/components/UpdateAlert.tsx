import React, { useState, useEffect } from 'react';
import { Alert } from '@mui/material';

/**
 * UpdateAlert component
 * @returns An Alert component which notifies the user of a new update from the chrome web store
 */
const UpdateAlert = (): JSX.Element => {
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    chrome.runtime.onUpdateAvailable.addListener(handleUpdateAvailable);
    chrome.runtime.onInstalled.addListener(handleResetAlertClosedStatus);

    // does not appear again after closing update notif
    chrome.storage.local.get('alertClosed', ({ alertClosed }) => {
      if (alertClosed) {
        setAlertVisible(false);
      }
    });
  }, []);

  const handleUpdateAvailable = (): void => {
    chrome.storage.local.get('alertClosed', ({ alertClosed }) => {
      if (!alertClosed) {
        setAlertVisible(true);
      }
    });
  };

  // the 'closed forever' status of the alert is reset when extension is updated
  const handleResetAlertClosedStatus = (): void => {
    chrome.storage.local.set({ alertClosed: false }, () => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      }
    });
  };

  // user closes the alert
  const handleCloseAlert = (): void => {
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
