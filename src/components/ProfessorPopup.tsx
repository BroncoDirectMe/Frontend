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
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import RateMyProfessorButton from './RateMyProfessorButton';
import '../styles/ProfessorPopup.css';

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
  avgGPA: number;
  totalEnrollment: number;
  // sectionAvgGPA: number;
}

/**
 * Filters out duplicate professor names and "To be Announced"
 * @param profName Professor names that may contain duplicates
 * @param filterTBA Optional option to remove To be Announced from raw professor name text
 * @returns Unique professor names as a string
 */
export function ProfessorNameFiltering(
  profName: string,
  filterTBA: boolean = true
): string {
  // removes all commas then splits set elements by every new line
  const set = new Set(profName.split(',').join('').split('\n'));
  if (filterTBA) {
    set.delete('To be Announced');
  }
  // set to array to string with chosen separator
  return Array.from(set).join(' & ');
}

/**
 * Helper function to send endpoint request
 * @param professor professorName
 * @returns See ProfessorInfo interface for object returned
 */
async function professorRequest(
  professor: string
): Promise<ProfessorInfo | string> {
  const url = 'https://api.cppbroncodirect.me/professor';
  const request = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: ProfessorNameFiltering(professor) }),
  });
  if (!(await request.ok)) {
    return await request.text();
  }
  return await request.json();
}

export const fetchInstructorAndSectionGPA = async (
  firstName: string,
  lastName: string
): Promise<{ avgGPA: number | null; totalEnrollment: number | null }> => {
  const requestData = {
    InstructorFirst: firstName,
    InstructorLast: lastName,
  };

  try {
    const response = await fetch(
      'https://cpp-scheduler.herokuapp.com/data/instructors/find',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("working")
      console.log("avg gpa data type: ")
      // console.log(typeof data[0].AvgGPA);
      console.log("data: ")
      console.log(data)
      // console.log("Avg gpa: " + data[0].AvgGPA)
      return {
        avgGPA: data[0].AvgGPA,
        totalEnrollment: data[0].TotalEnrollment,
      };
    } else {
      console.log('Failed to fetch GPA data');
      return { avgGPA: 0.0, totalEnrollment: 0 };
    }
  } catch (error) {
    console.log("not working");
    console.log(error);
    return { avgGPA: 0.0, totalEnrollment: 0 };
  }
};

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
    averageGPA: 'N/A', // avgGPA
    gpaCount: 'N/A', // totalEnrollment
    // sectionAverageGPA: 'N/A', // sectionAvgGPA
  });

  const [loading, setLoading] = useState(false);
  const [hasResult, setHasResult] = useState(true);
  const [page, setPage] = useState(0);
  const [currentProfessor, setCurrent] = useState('TBA');
  const filteredProfNames = ProfessorNameFiltering(props.professorName);
  const professorsList = filteredProfNames.split('&');
  const [errorMessage, setErrorMessage] = useState(
    'Something went wrong when trying to retrieve data'
  );

  /**
   * Gets professor data from backend 'server.ts/professor' function and sets data to their respective useState
   */
  async function getProfessorData(): Promise<void> {
    try {
      setHasResult(true);
      // Throws an error if professor name is TBA
      if (professorsList.length === 1 && professorsList[0] === '') {
        throw Error('This course has no assigned professor yet');
      }

      const selectedProf = professorsList[page].trim();
      setCurrent(selectedProf);
      const request = await professorRequest(selectedProf);
      // Throws an error if request doesn't return valid RMP info
      if (request === 'professor not found in mapping') {
        throw Error(
          `${professorsList[page]} does not have a RateMyProfessor page.`
        );
      }

      // @ts-expect-error
      // Suppresses TypeScript error saying that this operation cannot be done if request is a string
      const {
        avgDifficulty,
        avgRating,
        numRatings,
        wouldTakeAgainPercent,
      }: ProfessorInfo = request;
      const firstName = selectedProf.split(" ")[0];
      const lastName = selectedProf.split(" ").slice(1).join(" ");
      const { avgGPA, totalEnrollment /*, sectionAvgGPA */}= await fetchInstructorAndSectionGPA(
        firstName,
        lastName
      );

      // Throws an error if professor has no ratings on Rate My Professor
      if (wouldTakeAgainPercent < 0) {
        throw Error(
          `${professorsList[page]} has a RateMyProfessor page with no ratings yet.`
        );
      }

      setProfessorData({
        difficulty: avgDifficulty,
        rating: avgRating,
        reviews: numRatings.toString(),
        retention: wouldTakeAgainPercent.toString(),
        averageGPA: avgGPA !== null ? avgGPA.toString() : 'N/A',
        gpaCount: totalEnrollment != null ? totalEnrollment.toString() : 'N/A',
        // sectionAverageGPA: sectionAvgGPA != null ? sectionAvgGPA.toString() : 'N/A',
      });

      setLoading(true); // data finished loading
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
      setHasResult(false);
      setLoading(true);
    }
  }

  /**
   * Onclick function for next page button
   */
  function nextPage(): void {
    const minPage = 0;
    if (page + 1 >= professorsList.length) {
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
    if (page - 1 < minPage) {
      setPage(professorsList.length - 1);
      return;
    }
    setPage(page - 1);
  }

  // Runs getProfessorData when the page number state changes
  useEffect(() => {
    void getProfessorData();
  }, [page]);

  return (
    <>
      {/* Display loading while data is being fetched */}
      {!loading && (
        <img
          id="loading-gif"
          src="https://i.imgur.com/AO3PZss.gif" // this gif is 1:1
          alt="Loading..."
        />
      )}

      <section>
        {/* Display professor data if no errors were caught during fetch */}
        {loading && hasResult && (
          <section>
            <div className="header center-items">
              <Typography id="header-text">
                {currentProfessor.toUpperCase()}
              </Typography>
              <RateMyProfessorButton professorName={currentProfessor} />
            </div>
            <Divider className="divider" />
            <Typography>
              <span className="bold-style">Rating: </span>
              <span className="unbold-style">{professorData.rating}</span>
              <span className="unbold-style">/5</span>
            </Typography>
            <Typography>
              <span className="bold-style">Difficulty: </span>
              <span className="unbold-style">{professorData.difficulty}</span>
              <span className="unbold-style">/5</span>
            </Typography>
            <Typography>
              <span className="bold-style">Reviews: </span>
              <span className="unbold-style">{professorData.reviews}</span>
            </Typography>
            <Typography>
              <span className="bold-style">Average GPA: </span>
              <span className="unbold-style">{parseFloat(professorData.averageGPA).toFixed(2)}</span>
              <span className="unbold-style">/4.00</span>
            </Typography>
            <Typography>
              <span className="bold-style">Section GPA: </span>
              <span className="unbold-style">{professorData.averageGPA}</span>
              <span className="unbold-style">/4.00</span>
            </Typography>
            <Typography>
              <span className="bold-style">GPA Count: </span>
              <span className="unbold-style">{professorData.gpaCount}</span>
            </Typography>
            <span className="bold-style">{professorData.retention}% </span>
            <span className="unbold-style">would take again</span>
          </section>
        )}

        {/* Display if error was caught during fetch process */}
        {!hasResult && (
          <div className="error center-items">
            <FmdBadIcon id="error-icon" />
            <Typography id="error-message">{errorMessage}</Typography>
          </div>
        )}

        <Divider className="divider" />
        <div className="center-items">
          {/* Previous page button */}
          <IconButton className="icon-button" onClick={previousPage}>
            <NavigateBeforeIcon />
          </IconButton>

          <IconButton
            className="icon-button"
            onClick={props.handleTooltipClose}
          >
            <CloseIcon />
          </IconButton>

          {/* Next page button */}
          <IconButton className="icon-button" onClick={nextPage}>
            <NavigateNextIcon />
          </IconButton>
        </div>
      </section>
    </>
  );
}

/**
 * Converts UI components from ProfessorPopupInfo into a Material UI Tooltip
 * @param props professorPopupTooltipProps object
 * @returns Material UI Tooltip Element
 */
function ProfessorPopupToolTip(props: professorPopupTooltipProps): JSX.Element {
  return (
    <Tooltip
      PopperProps={{
        className: 'popup-tooltip',
        disablePortal: true,
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
        className="popup-button"
        variant="outlined"
        startIcon={<AssignmentIndIcon id="professor-icon" />}
        size="medium"
        onClick={props.handleTooltipOpen}
      >
        {ProfessorNameFiltering(props.professorName, false)}
      </Button>
    </Tooltip>
  );
}

/**
 * Professor Popup Component
 * @param {professorPopupTooltipProps} props React props
 * @param props.professorName Professor Name from RateMyProfessor
 * @returns Div containing the professor popup element
 */
export function ProfessorPopup(props: { professorName: string }): JSX.Element {
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
