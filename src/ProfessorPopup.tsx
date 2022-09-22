import { Button, ClickAwayListener, Tooltip } from '@mui/material';
import React, { SyntheticEvent } from 'react';

const dummyData: String =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

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
  return (
    <>
      <h1>{props.professorName}</h1>
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
