import { Button, ClickAwayListener, Tooltip } from '@mui/material';
import React from 'react';

const dummyData: String =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tincidunt lobortis feugiat vivamus at augue.';

function ProfessorPopupInfo(props: any): JSX.Element {
  return (
    <>
      <h1>{props.professor}</h1>
      {dummyData}
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

function ProfessorPopupToolTip(props: any): JSX.Element {
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
          professor={props.professor}
          handleTooltipClose={props.handleTooltipClose}
        />
      }
      arrow
    >
      <Button onClick={props.handleTooltipOpen}>Click</Button>
    </Tooltip>
  );
}

export default function ProfessorPopup(props: any): JSX.Element {
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = (): void => {
    setOpen(false);
  };

  const handleTooltipOpen = (): void => {
    setOpen(true);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <div>
        <ProfessorPopupToolTip
          professor={props.professor}
          open={open}
          handleTooltipOpen={handleTooltipOpen}
          handleTooltipClose={handleTooltipClose}
        />
      </div>
    </ClickAwayListener>
  );
}

// var inst = iframe.contentWindow?.document.getElementById('MTG_INSTR$0')
// var insts = iframe.contentWindow?.document.querySelectorAll('*[id^="MTG_INSTR$"]');
