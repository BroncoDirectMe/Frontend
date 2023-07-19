import { Button, ClickAwayListener, Tooltip } from '@mui/material';
import React from 'react';

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

// eslint-disable-next-line jsdoc/require-returns
/**
 *
 * @param props
  // eslint-disable-next-line jsdoc/require-param-description
 * @param props.professorName
  // eslint-disable-next-line jsdoc/require-param-description
 */
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
// eslint-disable-next-line jsdoc/require-returns
/**
 *
 * @param props
 // eslint-disable-next-line jsdoc/require-param-description
 */
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
// eslint-disable-next-line jsdoc/require-returns
/**
 *
 * @param props
 // eslint-disable-next-line jsdoc/require-param-description
 */
function ProfessorPopupInfo(props: professorPopupTooltipProps): JSX.Element {
  return (
    <>
      <h1>{ProfessorNameFiltering(props.professorName)}</h1>
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
// filters out duplicate professor names and To be Announced
// eslint-disable-next-line jsdoc/require-returns
/**
 *
 * @param profName
 // eslint-disable-next-line jsdoc/require-param-description
 */
function ProfessorNameFiltering(profName: string): string {
  // removes all commas then splits set elements by every new line
  const set = new Set(profName.split(',').join('').split('\n'));
  set.delete('To be Announced');
  // set to array to string with chosen separator
  return Array.from(set).join(' & ');
}
