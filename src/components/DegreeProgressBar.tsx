import React, { useState } from 'react';
import { Grid, Typography, Tooltip, IconButton, Switch } from '@mui/material';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import InfoIcon from '@mui/icons-material/Info';

interface ProgressBarProps {
  finished: number;
  progressing: number;
}

interface ToDoBarProps {
  majorCourse: number;
  reqElective: number;
  optElective: number;
  genEd: number;
}

/**
 * Progress bar component constructor
 * @param {ProgressBarProps} props - The props object containing parameters' percentages
 * @returns {JSX.Element} - Progress bar component
 */
function ProgressBar({ finished, progressing }: ProgressBarProps): JSX.Element {
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

/**
 * Dot labeling component constructor
 * @returns {JSX.Element} - Dot labeling component for progress bar
 */
function DotLabel(): JSX.Element {
  return (
    <Grid container justifyContent="center" mt="7px">
      <Grid item container xs={3} alignItems="center" gap="3px">
        <CircleRoundedIcon sx={{ color: '#3CB043', fontSize: '11px' }} />
        <Typography>Finished</Typography>
      </Grid>

      <Grid item container xs={3.8} alignItems="center" gap="3px">
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

/**
 * To-do bar component constructor
 * @param {ToDoProgressProps} props - The props object containing parameters' percentages
 * @returns {JSX.Element} - To-do bar component
 */
function ToDoBar({
  majorCourse,
  reqElective,
  optElective,
  genEd,
}: ToDoBarProps): JSX.Element {
  return (
    <Grid container height="20px" bgcolor="gray" xs={11} borderRadius="40px">
      <Grid
        container
        bgcolor="#FFDBAC"
        width={`${majorCourse + reqElective + optElective + genEd}%`}
        borderRadius="40px"
      >
        <Grid
          container
          bgcolor="#FFD700"
          width={`${
            ((majorCourse + reqElective + optElective) /
              (optElective + reqElective + majorCourse + genEd)) *
            100
          }%`}
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
    </Grid>
  );
}

/**
 * To-do dot labeling component constructor
 * @returns {JSX.Element} - Dot labeling component for the to-do bar
 */
function DotLabelToDo(): JSX.Element {
  return (
    <Grid container justifyContent="center" mt="7px">
      <Grid item container xs={5} alignItems="center" gap="3px">
        <CircleRoundedIcon sx={{ color: 'red', fontSize: '11px' }} />
        <Typography>Major Courses</Typography>
      </Grid>

      <Grid item container xs={5} alignItems="center" gap="3px">
        <CircleRoundedIcon sx={{ color: 'orange', fontSize: '11px' }} />
        <Typography>Required Electives</Typography>
      </Grid>

      <Grid item container xs={5} alignItems="center" gap="3px">
        <CircleRoundedIcon sx={{ color: '#FFD700', fontSize: '11px' }} />
        <Typography>Optional Electives</Typography>
      </Grid>

      <Grid item container xs={5} alignItems="center" gap="3px">
        <CircleRoundedIcon sx={{ color: '#FFDBAC', fontSize: '11px' }} />
        <Typography>GEs</Typography>
      </Grid>
    </Grid>
  );
}

/**
 * Degree progress bar component constructor
 * @returns {JSX.Element} - The degree progress bar component
 */
export default function DegreeProgressBar(): JSX.Element {
  const [isSwitchOn, setSwitchState] = useState(false);

  const finishedPerc = 0;
  const progressPerc = 0;

  const mCourse = 0;
  const reqElec = 0;
  const optElec = 0;
  const genEd = 0;

  const handleChange = (): void => {
    setSwitchState(!isSwitchOn);
    console.log(isSwitchOn);
  };

  /**
   * Information pop-up component constructor
   * @returns {JSX.Element} - Information pop-up component
   */
  function InfoPopup(): JSX.Element {
    const handleButtonClick = (): void => {
      window.open(
        'https://idp.cpp.edu/idp/profile/cas/login?service=https://cmsweb.cms.cpp.edu/psp/CPOMPRDM/EMPLOYEE/SA/c/POM_MENU_SA_SS.POM_SS_DPR_LINK.GBL?1=1'
      );
    };

    return (
      <Tooltip
        placement="top"
        {...(isSwitchOn
          ? {
              title: (
                <Typography fontWeight="bold">
                  Major Courses: {mCourse}% {<br />}
                  Required Electives: {reqElec}% {<br />}
                  Optional Electives: {optElec}% {<br />}
                  General Education: {genEd}%
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
          ? { title: <Typography fontWeight="bold">Progress Bar</Typography> }
          : {
              title: <Typography fontWeight="bold">To-Do Breakdown</Typography>,
            })}
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
          genEd={genEd}
        />
      )}

      {!isSwitchOn && <DotLabel />}
      {isSwitchOn && <DotLabelToDo />}
    </Grid>
  );
}
