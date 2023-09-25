import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Button,
  Modal,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import '../styles/TermsOfService.css';

/**
 * Terms Of Service Popup Component
 * @returns A button which upon clicked shows a popup that displays Terms of Service agreement
 */
function TermsOfService(): JSX.Element {
  const [isAgreed, setIsAgreed] = useState(false);
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    handleAgreementButton();
  }, []);

  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const handleCheck = (): void => {
    if (checked) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  };

  const handleAgreementButton = (): void => {
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
    handleAgreementButton();
  };

  return (
    <div>
      {!isAgreed && (
        <Button variant="outlined" onClick={handleOpen}>
          TERMS OF SERVICE
        </Button>
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
          <div className="tos-header">
            <Button
              onClick={() => {
                setOpen(false);
                setChecked(false);
              }}
            >
              BACK
            </Button>
            <Typography className="tos-title" variant="h6" component="h2">
              Terms Of Service
            </Typography>
          </div>
          <Typography className="tos-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.Duis
            mollis, est non commodo luctus, nisi erat porttitor ligula. Duis
            mollis, est non commodo luctus, nisi erat porttitor ligula.Duis
            mollis, est non commodo luctus, nisi erat porttitor ligula. Duis
            mollis, est non commodo luctus, nisi erat porttitor ligula.Duis
            mollis, est non commodo luctus, nisi erat porttitor ligula. Duis
            mollis, est non commodo luctus, nisi erat porttitor ligula.Duis
            mollis, est non commodo luctus, nisi erat porttitor ligula. Duis
            mollis, est non commodo luctus, nisi erat porttitor ligula.Duis
            mollis, est non commodo luctus, nisi erat porttitor ligula. Duis
            mollis, est non commodo luctus, nisi erat porttitor ligula.Duis
            mollis, est non commodo luctus, nisi erat porttitor ligula. Duis
            mollis, est non commodo luctus, nisi erat porttitor ligula.Duis
            mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <FormControlLabel
            control={<Checkbox onChange={handleCheck} />}
            label="I have read and agree to the Terms of Service"
          />
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
