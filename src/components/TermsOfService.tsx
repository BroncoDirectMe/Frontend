import React, { useState } from 'react';
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
 * @returns Div containing the professor popup element
 */
function TermsOfService(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const handleCheck = (): void => {
    if (checked) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        TERMS OF SERVICE
      </Button>
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
          <Typography className="tos-title" variant="h6" component="h2">
            Terms Of Service
          </Typography>
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
            <Button onClick={() => setOpen(false)} disabled={!checked}>
              CONFIRM
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default TermsOfService;
