import {
  Button,
  ClickAwayListener,
  Tooltip,
  CircularProgress,
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
          aasd
        />
      }
    >
      <Button onClick={props.handleTooltipOpen}>Click</Button>
    </Tooltip>
  );
}
// component that shows the info inside the popup
function ProfessorPopupInfo(props: professorPopupTooltipProps): JSX.Element {
  const url = 'http://localhost:3000/professor';
  const body = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: props.professorName }),
  };

  const [avgDifficulty, setAvgDifficulty] = useState(null); // avgDifficulty
  const [avgRating, setAvgRating] = useState(null); // avgRating
  const [numRatings, setNumRatings] = useState(null); // numRatings
  const [retentionPercent, setRetentionPercent] = useState(null); // wouldTakeAgainPercent

  const [loading, setLoading] = useState(false);

  // Gets professor data from backend 'server.ts/professor' function and sets data to their respective useState
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const getProfessorData = async () => {
    const response = await fetch(url, body);
    const json = await response.json();

    setAvgDifficulty(json.avgDifficulty);
    setAvgRating(json.avgRating);
    setNumRatings(json.numRatings);
    setRetentionPercent(json.wouldTakeAgainPercent.toFixed(2)); // truncate to 2 decimal points (dont think it rounds atm)

    setLoading(true); // data finished loading
  };

  // Runs getProfessorData upon page reload
  useEffect(() => {
    void getProfessorData();
  }, []);

  return (
    <>
      <h1>{ProfessorNameFiltering(props.professorName)}</h1>
      {loading ? (
        <h3>
          Score: {avgRating} / 5
          <br />
          Difficulty: {avgDifficulty} / 5
          <br />
          Ratings: {numRatings}
          <br />
          {retentionPercent}% would take again
        </h3>
      ) : (
        <CircularProgress
          size={40}
          thickness={5}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
          }}
        />
      )}
      <Button
        onClick={props.handleTooltipClose}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
        }}
      >
        Close
      </Button>
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