import {
  ClickAwayListener,
  Divider,
  Tooltip,
  Typography,
  IconButton,
  Button,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CloseIcon from '@mui/icons-material/Close';
import FmdBadIcon from '@mui/icons-material/FmdBad';
import RateMyProfessorButton from './RateMyProfessorButton';

interface professorPopupTooltipProps {
  professorName: string;
  open?: boolean;
  handleTooltipOpen?:
    | ((event: Event | React.SyntheticEvent<Element, Event>) => void)
    | undefined;
  handleTooltipClose?:
    | ((event: Event | React.SyntheticEvent<Element, Event>) => void)
    | undefined;
}

export default function ProfessorPopup(props: {
  professorName: string;
}): JSX.Element {
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = (): void => {
    setOpen(false);
  };

  const handleTooltipOpen = (): void => {
    setOpen(true);
  };

  return (
    // close popup if click outside inner tooltip
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <div>
        <ProfessorPopupToolTip
          professorName={props.professorName}
          open={open}
          handleTooltipOpen={handleTooltipOpen}
          handleTooltipClose={handleTooltipClose}
        />
      </div>
    </ClickAwayListener>
  );
}

const iconButtonStyle = {
  minHeight: '34px',
  minWidth: '34px',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '50%',
  border: 'none',
  boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)',
};

const professorIconStyle = {
  minHeight: '16px',
  minWidth: '16px',
  height: '24px',
  display: 'flex',
};

// component that shows popup
function ProfessorPopupToolTip(props: professorPopupTooltipProps): JSX.Element {
  return (
    <Tooltip
      PopperProps={{
        disablePortal: true,
        style: {
          backgroundColor: 'white',
          color: 'black',
          padding: '0.5em',
          minWidth: '200px',
          minHeight: '200px',
          boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)',
          borderRadius: '10px',
        },
      }}
      onClose={props.handleTooltipClose}
      open={props.open}
      disableFocusListener
      disableHoverListener
      disableTouchListener
      placement="top"
      title={
        <ProfessorPopupInfo
          professorName={props.professorName}
          handleTooltipClose={props.handleTooltipClose}
        />
      }
    >
      <Button
        variant="outlined"
        startIcon={<AssignmentIndIcon style={professorIconStyle} />}
        size="medium"
        style={{ display: 'flex', alignItems: 'center' }}
        onClick={props.handleTooltipOpen}
      >
        {props.professorName}
      </Button>
    </Tooltip>
  );
}
// component that shows the info inside the popup
function ProfessorPopupInfo(props: professorPopupTooltipProps): JSX.Element {
  const url = 'https://api.cppbroncodirect.me/professor';
  const body = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: ProfessorNameFiltering(props.professorName) }),
  };

  const [professorData, setProfessorData] = useState({
    difficulty: null, // avgDifficulty
    rating: null, // avgRating
    reviews: null, // numRatings
    retention: null, // wouldTakeAgainPercent
  });

  const [loading, setLoading] = useState(false);
  const [hasResult, setHasResult] = useState(true);

  // Gets professor data from backend 'server.ts/professor' function and sets data to their respective useState
  const getProfessorData = async (): Promise<void> => {
    try {
      setHasResult(true);
      const response = await fetch(url, body);
      const { avgDifficulty, avgRating, numRatings, wouldTakeAgainPercent } =
        await response.json();

      setProfessorData({
        difficulty: numRatings > 0 ? avgDifficulty : 'N/A', // if there are 0 reviews, there can't be any data
        rating: numRatings > 0 ? avgRating : 'N/A',
        reviews: numRatings > 0 ? numRatings : 'N/A',
        retention:
          numRatings > 0 || wouldTakeAgainPercent < 0
            ? wouldTakeAgainPercent
            : 'N/A', // RMP can return wouldTakeAgainPercent as -1
      });

      setLoading(true); // data finished loading
    } catch (error) {
      console.log(error);
      setHasResult(false);
      setLoading(true);
    }
  };

  // Runs getProfessorData upon page reload
  useEffect(() => {
    void getProfessorData();
  }, []);

  const boldStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: 'black',
  };

  const unboldStyle = {
    fontSize: '1.25rem',
    fontWeight: 'normal',
    color: '#1c1c1c',
  };

  const centerItems = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <>
      {/* Display loading while data is being fetched */}
      {!loading && (
        <img
          src="https://i.imgur.com/AO3PZss.gif" // this gif is 1:1
          width="175"
          height="175"
          alt="Loading..."
        />
      )}

      {/* Display professor data if no errors were caught during fetch */}
      {loading && hasResult && (
        <>
          <div style={{ ...centerItems, marginTop: '10px' }}>
            <Typography
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#008970',
              }}
            >
              {ProfessorNameFiltering(props.professorName).toUpperCase()}
            </Typography>
            <RateMyProfessorButton professorName={props.professorName} />
          </div>
          <Divider style={{ margin: '10px 0' }} />
          <Typography>
            <span style={boldStyle}>Rating: </span>
            <span style={unboldStyle}>{professorData.rating}</span>
          </Typography>
          <Typography>
            <span style={boldStyle}>Difficulty: </span>
            <span style={unboldStyle}>{professorData.difficulty}</span>
          </Typography>
          <Typography>
            <span style={boldStyle}>Reviews: </span>
            <span style={unboldStyle}>{professorData.reviews}</span>
          </Typography>
          <span style={boldStyle}>{professorData.retention}% </span>
          <span style={unboldStyle}>would take again</span>
          <Divider style={{ margin: '10px 0' }} />
          <div style={centerItems}>
            <IconButton
              onClick={props.handleTooltipClose}
              style={iconButtonStyle}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </>
      )}

      {/* Display if error was caught during fetch process */}
      {/* TODO: Shrink tooltip size if error occurs */}
      {!hasResult && (
        <div
          style={{
            ...centerItems,
            height: '100%',
            flexDirection: 'column',
            marginTop: '70px', // Manual adjustment to center items vertically - temporary?
          }}
        >
          <FmdBadIcon style={{ width: '28px', height: '28px' }} />
          <Typography style={{ marginTop: '6px' }}>
            Failed to fetch data
          </Typography>
        </div>
      )}
    </>
  );
}
// filters out duplicate professor names and To be Announced
function ProfessorNameFiltering(profName: string): string {
  // removes all commas then splits set elements by every new line
  const set = new Set(profName.split(',').join('').split('\n'));
  set.delete('To be Announced');
  // set to array to string with chosen separator
  return Array.from(set).join(' & ');
}
