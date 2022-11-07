import { Button, ClickAwayListener, Tooltip } from '@mui/material';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function fetchProfessorData() {
  const url = "http://localhost:3000/professor";
  const body = {
    method: 'POST', 
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify({"name" : "Thanh Nguyen"})
  }

  console.log('Yo whats up this somewhat works I guess');
  const response = await fetch(url, body);
  const json = await response.json();

  return "Hello";
}

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
  const data = fetchProfessorData().then(function(result){
    return result;
  })
  console.log("first ", data);

  return (
    <>
      <h1>{ProfessorNameFiltering(props.professorName)}</h1>
      {data}
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
