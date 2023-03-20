import {
  Button,
  ClickAwayListener,
  Divider,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useState, useEffect } from 'react';

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
// component that shows popup
function ProfessorPopupToolTip(props: professorPopupTooltipProps): JSX.Element {
  return (
    <Tooltip
      PopperProps={{
        disablePortal: true,
        style: {
          backgroundColor: 'white',
          color: 'black',
          border: '1px solid',
          padding: '0.5em',
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
      <Button onClick={props.handleTooltipOpen}>Click</Button>
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
          <Paper style={{ ...centerItems, marginTop: '10px' }}>
            <Typography
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#008970',
              }}
            >
              {ProfessorNameFiltering(props.professorName).toUpperCase()}
            </Typography>
          </Paper>
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
          <Paper style={centerItems}>
            <Button onClick={props.handleTooltipClose}>Close</Button>
          </Paper>
        </>
      )}

      {/* Display if error was caught during fetch process */}
      {!hasResult && <p>The query yielded no results</p>}
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
