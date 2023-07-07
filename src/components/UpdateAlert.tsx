import React, { useState, useEffect } from 'react';
import { Alert } from '@mui/material';

const UpdateAlert = (): JSX.Element => {
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    // Updated version number of the extension
    const updatedVersion: string = '1.1.0'; // currently testing

    // Current version number of the installed extension
    const currentVersion: string = '1.0.0'; // currently testing

    console.log(
      `Updated Version: ${updatedVersion} || Current Version: ${currentVersion}`
    );

    // Compare the version numbers
    if (currentVersion !== updatedVersion) {
      setAlertOpen(true);
    }
  }, []);

  // The Alert itself
  return alertOpen ? (
    <Alert
      onClose={() => {
        setAlertOpen(false);
      }}
      severity="info"
    >
      A new version is available! Please update.
    </Alert>
  ) : (
    <></>
  );
};

export default UpdateAlert;

// testing
