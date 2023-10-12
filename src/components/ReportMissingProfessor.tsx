import React, { useState } from 'react';

import {
  Grid,
  Typography,
  Button,
  TextField,
  Modal,
  FormControl,
} from '@mui/material';

export default function ReportMissingProfesor() {
  const [reportState, setReportState] = useState(false);

  const handleButtonClick = () => {
    setReportState(true);
  };

  const handleOnSubmit = () => {
    setReportState(false);
  };

  const handleOnCancel = () => {
    setReportState(false);
  };

  const TextFieldBox = (props: {
    label: string;
    placeholder: string;
    text: string;
    charLimit: number;
  }) => {
    return (
      <FormControl required fullWidth>
        <TextField
          variant="outlined"
          label={props.label}
          placeholder={props.placeholder}
        >
          {props.text}
        </TextField>
      </FormControl>
    );
  };

  const TextFieldForm = () => {
    return (
      <Grid item container xs={12} margin="10px 15px 0px 15px">
        <Grid item container justifyContent="center" xs={12}>
          <Typography fontWeight="bold" fontSize="17px">
            Missing Professor Report
          </Typography>
        </Grid>

        <Grid item container gap="10px" justifyContent="right">
          <TextFieldBox
            label="Name"
            placeholder="Enter professor's name"
            text=""
            charLimit={40}
          />
          <TextFieldBox
            label="Course/Major"
            placeholder="Enter course's name and number"
            text=""
            charLimit={40}
          />
        </Grid>

        <Grid item container xs={12} justifyContent="right" mb="5px">
          <Button onClick={handleOnCancel}>Cancel</Button>
          <Button onClick={handleOnSubmit}>Submit</Button>
        </Grid>
      </Grid>
    );
  };

  const MissingProfessorForm = () => {
    return (
      <Modal
        open={reportState}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid
          container
          width="375px"
          height="225px"
          bgcolor="white"
          borderRadius="10px"
        >
          <TextFieldForm />
        </Grid>
      </Modal>
    );
  };

  return (
    <Grid container alignItems="center" justifyContent="center">
      <Button onClick={handleButtonClick}>
        <Typography fontSize="13px"> Report Missing Professor </Typography>
      </Button>
      <MissingProfessorForm />
    </Grid>
  );
}
