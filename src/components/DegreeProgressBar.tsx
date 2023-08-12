import React, {
  CSSProperties,
  useState,
  useEffect,
  ReactElement,
  ReactNode,
} from 'react';
import {
  Grid,
  Typography,
  Tooltip,
  IconButton,
  Switch,
  FormControlLabel,
} from '@mui/material';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import InfoIcon from '@mui/icons-material/Info';

//import './styles/CourseProgressBar.css'

interface ProgressBarProps {
  finished: number;
  progressing: number;
}

interface DetailedProgressProps {
  majorCourse: number;
  reqElective: number;
  optElective: number;
}

function ProgressBar({ finished, progressing }: ProgressBarProps) {
  return (
    <Grid
      container
      height="20px"
      bgcolor="gray"
      borderRadius="40px"
      id="progressbar"
      xs={11}
    >
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
    <Grid container justifyContent="center" mt="7px">
      <Grid item container xs={3} alignItems="center" gap="3px">
        <CircleRoundedIcon sx={{ color: '#3CB043', fontSize: '11px' }} />
        <Typography>Finished</Typography>
      </Grid>

      <Grid item container xs={4} alignItems="center" gap="3px">
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

function ToDoBar({
  majorCourse,
  reqElective,
  optElective,
}: DetailedProgressProps) {
  return (
    <Grid container height="20px" bgcolor="#FFDBAC" xs={11} borderRadius="40px">
      <Grid
        container
        bgcolor="#FFD700"
        width={`${majorCourse + reqElective + optElective}%`}
        borderRadius="40px"
      >
        <Grid
          container
          width={`${
            ((reqElective + majorCourse) /
              (optElective + reqElective + majorCourse)) *
            100
          }%`}
          bgcolor="orange"
          borderRadius="40px"
        >
          <Grid
            width={`${(majorCourse / (reqElective + majorCourse)) * 100}%`}
            bgcolor="red"
            borderRadius="40px"
          ></Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

function DotLabelToDo() {
  return (
    <Grid container justifyContent="center" mt="7px">
      <Grid item container xs={5} alignItems="center" gap="3px">
        <CircleRoundedIcon sx={{ color: 'red', fontSize: '11px' }} />
        <Typography>Major Course</Typography>
      </Grid>

      <Grid item container xs={5} alignItems="center" gap="3px">
        <CircleRoundedIcon sx={{ color: 'orange', fontSize: '11px' }} />
        <Typography>Required Elective</Typography>
      </Grid>

      <Grid item container xs={5} alignItems="center" gap="3px">
        <CircleRoundedIcon sx={{ color: '#FFD700', fontSize: '11px' }} />
        <Typography>Optional Elective</Typography>
      </Grid>

      <Grid item container xs={5} alignItems="center" gap="3px">
        <CircleRoundedIcon sx={{ color: '#FFDBAC', fontSize: '11px' }} />
        <Typography>GE</Typography>
      </Grid>
    </Grid>
  );
}

export default function DegreeProgressBar() {
  const [isSwitchOn, setSwitchState] = useState(false);

  const finishedPerc = 30;
  const progressPerc = 30;

  const mCourse = 20;
  const reqElec = 25;
  const optElec = 30;

  const handleChange = () => {
    setSwitchState(!isSwitchOn);
    console.log(isSwitchOn);
  };

  function InfoPopup() {
    const handleButtonClick = () => {
      window.open(`https://www.cpp.edu/`);
    };

    return (
      <Tooltip
        placement="top"
        {...(isSwitchOn
          ? {
              title: (
                <Typography fontWeight="bold">
                  Major Course: {mCourse}% {<br />}
                  Required Elective: {reqElec}% {<br />}
                  Optional Elective: {optElec}% {<br />}
                  General Education: {100 - (mCourse + reqElec + optElec)}%
                </Typography>
              ),
            }
          : {
              title: (
                <Typography fontWeight="bold">
                  Finished: {finishedPerc}% {<br />}
                  Progressing: {progressPerc}% {<br />}
                  To-Do: {100 - (finishedPerc + progressPerc)}%
                </Typography>
              ),
            })}
      >
        <IconButton onClick={handleButtonClick}>
          <InfoIcon color="primary" fontSize="small" id="info" />
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <Grid container justifyContent="center">
      <Grid
        container
        xs={9}
        alignItems="center"
        justifyContent="center"
        ml="20px"
      >
        <InfoPopup />
        {!isSwitchOn && <Typography fontWeight="600">Progress Bar</Typography>}
        {isSwitchOn && <Typography fontWeight="600">To-Do </Typography>}
      </Grid>

      <Tooltip
        placement="top"
        {...(isSwitchOn
          ? { title: 'Progress Bar' }
          : { title: 'To-do Breakdown' })}
      >
        <Switch onChange={handleChange} />
      </Tooltip>

      {!isSwitchOn && (
        <ProgressBar finished={finishedPerc} progressing={progressPerc} />
      )}
      {isSwitchOn && (
        <ToDoBar
          majorCourse={mCourse}
          reqElective={reqElec}
          optElective={optElec}
        />
      )}

      {!isSwitchOn && <DotLabel />}
      {isSwitchOn && <DotLabelToDo />}
    </Grid>
  );
}
