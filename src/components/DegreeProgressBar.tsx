import React, { CSSProperties, useState, useEffect, ReactElement } from 'react';
import { Grid, Typography, Tooltip, IconButton } from '@mui/material';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import InfoIcon from '@mui/icons-material/Info';

//import './styles/CourseProgressBar.css'

interface ProgressBarProps {
  finished: number;
  progressing: number;
}

interface DegreeProgressBarProps {
  loggedInState: boolean;
}

function ProgressBar({ finished, progressing }: ProgressBarProps) {
  return (
    <Grid container height="20px" bgcolor="gray" borderRadius="40px" xs={11}>
      <Grid
        container
        width={`${progressing + finished}%`}
        bgcolor="#FFD700"
        borderRadius="40px"
      >
        <Grid
          width={`${(finished / (progressing + finished)) * 100}%`}
          bgcolor="#3CB043"
          borderRadius="40px"
        ></Grid>
      </Grid>
    </Grid>
  );
}

function DotLabel() {
  return (
    <Grid container gap="12px" justifyContent="center" mt="7px">
      <Grid item container xs={2.5} alignItems="center" gap="3px">
        <CircleRoundedIcon sx={{ color: '#3CB043', fontSize: '11px' }} />
        <Typography>Finished</Typography>
      </Grid>

      <Grid item container xs={3.3} alignItems="center" gap="3px">
        <CircleRoundedIcon sx={{ color: '#FFD700', fontSize: '11px' }} />
        <Typography>Progressing</Typography>
      </Grid>

      <Grid item container xs={3} alignItems="center" gap="3px">
        <CircleRoundedIcon sx={{ color: 'gray', fontSize: '11px' }} />
        <Typography>To-Do</Typography>
      </Grid>
    </Grid>
  );
}

function InfoPopup({ finished, progressing }: ProgressBarProps) {
  const handleButtonClick = () => {
    window.open(`https://www.cpp.edu/`);
  };
  return (
    <Tooltip
      placement="top"
      title={
        <Typography color="white" fontWeight="bold">
          Finished: {finished}% {<br />}
          Progressing: {progressing}% {<br />}
          To-Do: {100 - (finished + progressing)}%
        </Typography>
      }
    >
      <IconButton onClick={handleButtonClick}>
        <InfoIcon color="primary" fontSize="small" id="info" />
      </IconButton>
    </Tooltip>
  );
}

export default function DegreeProgressBar() {
  let finishedPerc = 33;
  let progressPerc = 33;

  useEffect(() => {
    console.log('woow');
  }, []);

  return (
    <Grid container justifyContent="center">
      <Grid container alignItems="center" justifyContent="center" mr="40px">
        <InfoPopup finished={finishedPerc} progressing={progressPerc} />

        <Typography fontWeight="600">Progress Bar</Typography>
      </Grid>

      <ProgressBar finished={finishedPerc} progressing={progressPerc} />

      <DotLabel />
    </Grid>
  );
}
