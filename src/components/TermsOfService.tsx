import React, { useEffect, useState } from 'react';
import { Alert, Typography, Box, Button, Modal, Checkbox } from '@mui/material';
import '../styles/TermsOfService.css';

/**
 * Terms Of Service Popup Component
 * @returns A button which upon clicked shows a popup that displays Terms of Service agreement
 */
function TermsOfService(): JSX.Element {
  const [isAgreed, setIsAgreed] = useState(false);
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  const tos =
    'https://github.com/BroncoDirectMe/Frontend/blob/main/TermsOfService.md';

  useEffect(() => {
    handleAgreementAlert();
  }, []);

  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  // handles checkbox state
  const handleCheck = (): void => {
    if (checked) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  };

  //
  const handleAgreementAlert = (): void => {
    chrome.storage.local.get('tosSigned', ({ tosSigned }) => {
      if (tosSigned) {
        setIsAgreed(true);
      }
    });
  };

  // chrome.storage.local.set({ tosSigned: false }, () => {
  //   if (chrome.runtime.lastError) {
  //    console.error(chrome.runtime.lastError);
  //   }
  // });

  const handleAgreement = (): void => {
    setOpen(false);
    chrome.storage.local.set({ tosSigned: true }, () => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      }
    });
    handleAgreementAlert();
  };

  return (
    <div>
      {!isAgreed && (
        <Alert
          severity="info"
          action={<Button onClick={handleOpen}>GO</Button>}
        >
          Please read the Terms of Service.
        </Alert>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="tos-title"
        aria-describedby="tos-description"
      >
        <Box
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Button
            onClick={() => {
              setOpen(false);
              setChecked(false);
            }}
          >
            BACK
          </Button>
          <div className="tos-checkbox">
            <Checkbox onChange={handleCheck} />
            <Typography>
              By checking this box you have read and accepted{' '}
              <a href={tos} target="_blank" rel="noopener noreferrer">
                Terms of Service
              </a>{' '}
              of BroncoDirectMe
            </Typography>
          </div>
          <div className="tos-button">
            <Button onClick={handleAgreement} disabled={!checked}>
              CONFIRM
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default TermsOfService;
