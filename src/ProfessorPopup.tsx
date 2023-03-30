import {
  ClickAwayListener,
  Divider,
  Tooltip,
  Typography,
  IconButton,
  Button,
} from '@mui/material';
import React, { useState, useEffect, CSSProperties } from 'react';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CloseIcon from '@mui/icons-material/Close';
import FmdBadIcon from '@mui/icons-material/FmdBad';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
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

interface ProfessorInfo {
  avgDifficulty: string;
  avgRating: string;
  numRatings: number;
  wouldTakeAgainPercent: number;
}

const iconButtonStyle: CSSProperties = {
  minHeight: '34px',
  minWidth: '34px',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '50%',
  border: 'none',
  boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)',
};

const professorIconStyle: CSSProperties = {
  minHeight: '16px',
  minWidth: '16px',
  height: '24px',
  display: 'flex',
};

const boldStyle: CSSProperties = {
  fontSize: '1.25rem',
  fontWeight: 'bold',
  color: 'black',
};

const unboldStyle: CSSProperties = {
  fontSize: '1.25rem',
  fontWeight: 'normal',
  color: '#1c1c1c',
};

const centerItems: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
};

/**
 * Filters out duplicate professor names and "To be Announced"
 * @param profName Professor names that may contain duplicates
 * @returns Unique professor names as a string
 */
function ProfessorNameFiltering(profName: string): string {
  // removes all commas then splits set elements by every new line
  const set = new Set(profName.split(',').join('').split('\n'));
  set.delete('To be Announced');
  // set to array to string with chosen separator
  return Array.from(set).join(' & ');
}

/**
 * Helper function to send endpoint request
 * @param professor professorName
 * @returns See ProfessorInfo interface for object returned
 */
async function professorRequest(professor: string): Promise<ProfessorInfo> {
  const url = 'https://api.cppbroncodirect.me/professor';
  const request = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: ProfessorNameFiltering(professor) }),
  });

  return await request.json();
}

/**
 * Component that shows the info inside the popup
 * @param props See professorPopupTooltipProps interface (control click) to see parameters
 * @returns Element containing the UI for professor information
 */
function ProfessorPopupInfo(props: professorPopupTooltipProps): JSX.Element {
  const [professorData, setProfessorData] = useState({
    difficulty: 'N/A', // avgDifficulty
    rating: 'N/A', // avgRating
    reviews: 'N/A', // numRatings
    retention: 'N/A', // wouldTakeAgainPercent
  });

  const [loading, setLoading] = useState(false);
  const [hasResult, setHasResult] = useState(true);
  const [page, setPage] = useState(0);
  const [currentProfessor, setCurrent] = useState('');
  const filteredProfNames = ProfessorNameFiltering(props.professorName);
  const professorsList = filteredProfNames.split('&');

  /**
   * Gets professor data from backend 'server.ts/professor' function and sets data to their respective useState
   */
  async function getProfessorData(): Promise<void> {
    try {
      setHasResult(true);
      const selectedProf = professorsList[page].trim()
      setCurrent(selectedProf);

      const {
        avgDifficulty,
        avgRating,
        numRatings,
        wouldTakeAgainPercent,
      }: ProfessorInfo = await professorRequest(selectedProf);

      setProfessorData({
        difficulty: numRatings > 0 ? avgDifficulty : 'N/A', // if there are 0 reviews, there can't be any data
        rating: numRatings > 0 ? avgRating : 'N/A',
        reviews: numRatings > 0 ? numRatings.toString() : 'N/A',
        retention:
          numRatings > 0 || wouldTakeAgainPercent < 0
            ? wouldTakeAgainPercent.toString()
            : 'N/A', // RMP can return wouldTakeAgainPercent as -1
      });

      setLoading(true); // data finished loading
    } catch (error) {
      console.log(error);
      setHasResult(false);
      setLoading(true);
    }
  }

  /**
   * Onclick function for next page button
   */
  function nextPage(): void {
    const minPage = 0;
    if ((page + 1) >= professorsList.length) {
      setPage(minPage);
      return;
    }
    setPage(page + 1);
  }

  /**
   * Onclick function for previous page button
   */
  function previousPage(): void {
    const minPage = 0;
    if ((page - 1) < minPage) {
      setPage(professorsList.length - 1);
      return;
    }
    setPage(page - 1);
  }

  // Runs getProfessorData upon page reload
  useEffect(() => {
    void getProfessorData();
  }, [page]);

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
              {currentProfessor.toUpperCase()}
            </Typography>
            <RateMyProfessorButton professorName={currentProfessor} />
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
            <IconButton style={iconButtonStyle} onClick={previousPage}>
              <NavigateBeforeIcon />
            </IconButton>
            {/* Previous page button */}

            <IconButton
              onClick={props.handleTooltipClose}
              style={iconButtonStyle}
            >
              <CloseIcon />
            </IconButton>

            <IconButton style={iconButtonStyle} onClick={nextPage}>
              <NavigateNextIcon />
            </IconButton>
            {/* Next page button */}
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

/**
 * Converts UI components from ProfessorPopupInfo into a Material UI Tooltip
 * @param props
 * @returns Material UI Tooltip Element
 */
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
        {ProfessorNameFiltering(props.professorName)}
      </Button>
    </Tooltip>
  );
}

/**
 * Professor Popup Element
 * @param professorName Takes in Professor Name
 * @returns Div containing the professor popup element
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
