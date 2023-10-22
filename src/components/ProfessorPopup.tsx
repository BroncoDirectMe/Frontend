import React, { useState, useEffect } from 'react';
import {
  ClickAwayListener,
  Divider,
  Tooltip,
  Typography,
  IconButton,
  Button,
} from '@mui/material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CloseIcon from '@mui/icons-material/Close';
import FmdBadIcon from '@mui/icons-material/FmdBad';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import RateMyProfessorButton from './RateMyProfessorButton';
import '../styles/ProfessorPopup.css';

interface professorPopupTooltipProps {
  professorName: string;
  Course?: string;
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
  classAvgGPA: number;
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

export const fetchInstructorAndCourseGPA = async (
  firstName: string,
  lastName: string,
  courseNum: string,
  courseSubject: string
): Promise<{
  avgGPA: number | null;
  totalEnrollment: number | null;
  classAvgGPA: number | null;
}> => {
  try {
    console.log('first: ' + firstName);
    console.log('last: ' + lastName);
    console.log('courseNum: ' + courseNum);
    console.log('courseSubject: ' + courseSubject);

    const profResponse = await fetch(
      'https://cpp-scheduler.herokuapp.com/data/instructors/find',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          InstructorFirst: firstName,
          InstructorLast: lastName,
        }),
      }
    );

    const courseResponse = await fetch(
      'https://cpp-scheduler.herokuapp.com/data/instructions/find',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          InstructorFirst: firstName,
          InstructorLast: lastName,
          CourseNumber: courseNum,
          Subject: courseSubject,
        }),
      }
    );

    let avgGPA = 0;
    let totalEnrollment = 0;
    let classAvgGPA = 0;

    if (profResponse.ok) {
      const profData = await profResponse.json();
      console.log('profData:');
      console.log(profData);
      avgGPA = profData[0].AvgGPA ?? 0;
      totalEnrollment = profData[0].TotalEnrollment ?? 0;
      console.log('Avg gpa:');
      console.log(avgGPA);
      console.log('Total enrollment:');
      console.log(totalEnrollment);
    } else {
      console.error('Failed to fetch instructor data');
    }

    if (courseResponse.ok) {
      const courseData = await courseResponse.json();
      console.log('Course data: ');
      console.log(courseData);
      classAvgGPA = courseData[0].AvgGPA ?? 0;
      console.log('Class avg gpa:');
      console.log(classAvgGPA);
    } else {
      console.error('Failed to fetch instructor sections data');
    }

    return {
      avgGPA,
      totalEnrollment,
      classAvgGPA,
    };
  } catch (error) {
    console.log('Error:', error);
    return { avgGPA: 0, totalEnrollment: 0, classAvgGPA: 0 };
  }
};

/**
 * Component that shows the info inside the popup
 * @param props See professorPopupTooltipProps interface
 * @param props.professorName Professor name
 * @param props.Course Full course title
 * @param props.handleTooltipClose Tooltip closing
 * @returns Element containing the UI for professor information
 */
function ProfessorPopupInfo({
  professorName,
  Course,
  handleTooltipClose,
}: professorPopupTooltipProps): JSX.Element {
  const [professorData, setProfessorData] = useState({
    difficulty: 'N/A', // avgDifficulty
    rating: 'N/A', // avgRating
    reviews: 'N/A', // numRatings
    retention: 'N/A', // wouldTakeAgainPercent
    averageGPA: 'N/A', // avgGPA
    gpaCount: 'N/A', // totalEnrollment
    classAverageGPA: 'N/A', // sectionAvgGPA
  });

  const [loading, setLoading] = useState(false);
  const [hasResult, setHasResult] = useState(true);
  const [page, setPage] = useState(0);
  const [currentProfessor, setCurrent] = useState('TBA');
  const filteredProfNames = ProfessorNameFiltering(professorName);
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

      const firstName = selectedProf.split(' ')[0];
      const lastName = selectedProf.split(' ').slice(1).join(' ');
      const classString = (Course ?? '').toString();
      const classStringParts = classString.split(' ');
      const subject = classStringParts[0];
      const courseNumber = classStringParts[1];
      const { avgGPA, totalEnrollment, classAvgGPA } =
        await fetchInstructorAndCourseGPA(
          firstName,
          lastName,
          courseNumber,
          subject
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
        classAverageGPA: classAvgGPA != null ? classAvgGPA.toString() : 'N/A',
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
          src="https://media4.giphy.com/media/3oEjI6SIIHBdRxXI40/200w.gif?cid=6c09b9526oi97khsansodigbd19wofk9q41qtc1jehlvl00d&ep=v1_gifs_search&rid=200w.gif&ct=g"
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
              <span className="bold-style">{professorData.retention}% </span>
              <span className="unbold-style">would retake</span>
            </Typography>
            <Typography>
              <span className="bold-style">Reviews: </span>
              <span className="unbold-style">{professorData.reviews}</span>
            </Typography>
            <Divider className="divider" />
            <Typography>
              <span className="bold-style">Average GPA: </span>
              <span className="unbold-style">
                {parseFloat(professorData.averageGPA).toFixed(2)}
              </span>
              <span className="unbold-style">/4</span>
            </Typography>
            <Typography>
              <span className="bold-style">
                {Course
                  ? Course.toString().split(' - ')[0].replace(' ', '')
                  : ''}{' '}
                GPA:
              </span>
              <span className="unbold-style">
                {parseFloat(professorData.classAverageGPA) === 0
                  ? ' TBA'
                  : ` ${parseFloat(professorData.classAverageGPA).toFixed(2)}`}
              </span>
              {parseFloat(professorData.classAverageGPA) !== 0 && (
                <span className="unbold-style">/4</span>
              )}
            </Typography>
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

          <IconButton className="icon-button" onClick={handleTooltipClose}>
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
          Course={props.Course}
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
export function ProfessorPopup({
  professorName,
  Course,
}: professorPopupTooltipProps): JSX.Element {
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
          professorName={professorName}
          Course={Course}
          open={open}
          handleTooltipOpen={handleTooltipOpen}
          handleTooltipClose={handleTooltipClose}
        />
      </div>
    </ClickAwayListener>
  );
}
