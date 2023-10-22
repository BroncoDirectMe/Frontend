import {
  TextField,
  Autocomplete,
  createFilterOptions,
  CircularProgress,
} from '@mui/material';
import React, { CSSProperties, useState, useEffect } from 'react';
import RateMyProfessorButton from './RateMyProfessorButton';
import '../styles/SearchBar.css';

let searchView: CSSProperties = {
  display: 'none',
};

interface ProfessorName {
  broncoDirectName: string;
}

interface CircularProgressBarProps {
  value: number;
  color: string;
  title: string;
  displayPercentage: boolean;
  isGPA: boolean;
}

interface SearchBarProps {
  settingBarState: boolean;
}

/**
 * Helper function -- closes search results element
 */
function closeSearchResult(): void {
  searchView = { display: 'none' };
}

/**
 * Helper function -- opens search results element
 */
function openSearchResult(): void {
  searchView = { display: 'block' };
}

/**
 * Circular progress bar component constructor
 * @param {CircularProgressBarProps} progress Progress Bar properties
 * @returns Circular progress bar component
 */
function CircularProgressBar({
  value,
  color,
  title,
  displayPercentage,
  isGPA,
}: CircularProgressBarProps): JSX.Element {
  const remainingColor = 'rgba(0, 0, 0, 0.1)';

  return (
    <div className="progress-container">
      <CircularProgress
        id="colored"
        variant="determinate"
        thickness={2.5}
        value={value}
        size={110}
        style={{ color }}
      />
      <CircularProgress
        id="uncolored"
        variant="determinate"
        thickness={2.5}
        value={100}
        size={110}
        style={{ color: remainingColor }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <span
          style={{ fontSize: '30px', textAlign: 'center', fontWeight: 'bold' }}
        >
          {displayPercentage ? (
            <span>
              <span>{value.toFixed(0)}</span>
              <span style={{ fontSize: '15px', fontWeight: 'normal' }}>%</span>
            </span>
          ) : (
            <span style={{ fontSize: '30px', fontWeight: 'bold' }}>
              {(value / 20).toFixed(1)}
              <span style={{ fontSize: '15px', fontWeight: 'normal' }}>
                {isGPA ? '/4.0' : '/5'}
              </span>
            </span>
          )}
        </span>
      </div>
      <span id="ratings-categories">{title}</span>
    </div>
  );
}

/**
 * Fetches an instructor's GPA and total enrollment data.
 * @param {string} firstName - The first name of the instructor.
 * @param {string} lastName - The last name of the instructor.
 * @returns {Promise<{avgGPA: number | null, totalEnrollment: number | null}>} A Promise that resolves to an object containing the instructor's average GPA and total enrollment. If the fetch fails, the Promise resolves to an object with null values.
 */
export const fetchInstructorGPA = async (
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
      return {
        avgGPA: data[0].AvgGPA,
        totalEnrollment: data[0].TotalEnrollment,
      };
    } else {
      console.log('Failed to fetch GPA data');
      return { avgGPA: 0.0, totalEnrollment: 0 };
    }
  } catch (error) {
    console.log(error);
    return { avgGPA: 0.0, totalEnrollment: 0 };
  }
};

/**
 * Search bar component constructor
 * @param {SearchBarProps} props - The props object containing the state of the search bar
 * @returns {JSX.Element} - The search bar component
 */
export default function SearchBar({
  settingBarState,
}: SearchBarProps): JSX.Element {
  const [searchText, setSearchText] = useState('');
  const [hasResult, setResult] = useState(true);
  const [loading, isLoading] = useState(false);
  const [searchResult, newResult] = useState({
    professorName: 'professor',
    averageGPA: null as number | null,
    overallRating: 1.0,
    difficulty: 1.0,
    reviewCount: 1,
    gpaCount: null as number | null,
    retention: 'N/A',
  });

  const [profList, setProfList] = useState<ProfessorName[]>([]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    settingBarState ? closeSearchResult() : openSearchResult();
    // Closes search results element if the settings window is open

    fetch('https://api.cppbroncodirect.me/professor/names')
      // eslint-disable-next-line @typescript-eslint/promise-function-async
      .then((response) => response.json())
      .then((data) => setProfList(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <Autocomplete
        className="search-bar"
        freeSolo
        selectOnFocus
        disableClearable
        filterOptions={createFilterOptions({
          matchFrom: 'any',
          limit: 25,
        })}
        getOptionLabel={(option) =>
          typeof option === 'string' ? option : option.broncoDirectName
        }
        options={profList}
        inputValue={searchText}
        onInputChange={(e, value) => {
          setSearchText(value);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            type="text"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            placeholder="Search Professor Name"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onKeyUp={async (e) => {
              if (e.key === 'Enter') {
                isLoading(true);
                setResult(true);
                try {
                  const request = await fetch(
                    'https://api.cppbroncodirect.me/professor',
                    {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ name: searchText }),
                    }
                  );
                  // POST request to the backend with endpoint /professor
                  const {
                    avgRating,
                    avgDifficulty,
                    firstName,
                    lastName,
                    numRatings,
                    wouldTakeAgainPercent,
                  } = await request.json();
                  const { avgGPA, totalEnrollment } = await fetchInstructorGPA(
                    firstName,
                    lastName
                  );
                  newResult({
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    professorName: `${firstName} ${lastName}`,
                    averageGPA: avgGPA,
                    overallRating: avgRating,
                    difficulty: avgDifficulty,
                    reviewCount: numRatings,
                    gpaCount: totalEnrollment,
                    retention:
                      wouldTakeAgainPercent >= 0
                        ? wouldTakeAgainPercent.toString()
                        : 'N/A',
                  });
                  // Deconstructs fetch response to fit interface used for ListPage component

                  openSearchResult();
                  isLoading(false);
                } catch {
                  setResult(false);
                  isLoading(false);
                  // Case when the search yields no results
                }
              }
            }}
          />
        )}
      />

      {loading && (
        <div className="loading-container">
          <CircularProgress />
        </div>
      )}
      {/* Conditional rendering for loading circular progress */}
      {!loading && hasResult && (
        <section id="searchResult" style={searchView}>
          <h2>
            {searchResult.professorName}
            <RateMyProfessorButton professorName={searchResult.professorName} />
          </h2>
          {/* Professor details and information */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', marginBottom: '20px' }}>
              {/* Rating progress bar */}
              <CircularProgressBar
                value={searchResult.overallRating * 20}
                color={
                  searchResult.overallRating < 5 / 3
                    ? 'red'
                    : searchResult.overallRating < 10 / 3
                    ? 'blue'
                    : 'green'
                }
                title={`Rating`}
                displayPercentage={false}
                isGPA={false}
              />
              <div style={{ width: '40px' }} />{' '}
              {/* spacing between progress bars */}
              {/* Difficulty progress bar */}
              <CircularProgressBar
                value={searchResult.difficulty * 20}
                color={
                  searchResult.difficulty < 5 / 3
                    ? 'green'
                    : searchResult.difficulty < 10 / 3
                    ? 'blue'
                    : 'red'
                }
                title={`Difficulty`}
                displayPercentage={false}
                isGPA={false}
              />
            </div>
            <div style={{ height: '30px' }} />{' '}
            {/* vertical spacing between progress bar rows */}
            <div style={{ display: 'flex' }}>
              {/* Avg. GPA progress bar */}
              <CircularProgressBar
                value={
                  searchResult.averageGPA ? searchResult.averageGPA * 20 : 0
                }
                color={
                  searchResult.averageGPA === null
                    ? 'gray' // Use a suitable color for null value
                    : searchResult.averageGPA < 3 && searchResult.averageGPA > 2
                    ? 'blue'
                    : searchResult.averageGPA < 2
                    ? 'red'
                    : 'green'
                }
                title={`Average\u00a0GPA`}
                displayPercentage={false}
                isGPA={true}
              />
              <div style={{ width: '40px' }} />{' '}
              {/* spacing between progress bars */}
              {/* Retention progress bar */}
              <CircularProgressBar
                value={
                  searchResult.retention === 'N/A'
                    ? 0
                    : parseInt(searchResult.retention)
                }
                color={
                  parseInt(searchResult.retention) < 50
                    ? 'red'
                    : parseInt(searchResult.retention) < 80
                    ? 'blue'
                    : 'green'
                }
                title={
                  searchResult.retention === 'N/A' ? 'N/A' : `Would\u00a0Retake`
                }
                displayPercentage={true}
                isGPA={false}
              />
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              fontSize: '16px',
              color: '#A3A3A3',
              marginBottom: '35px',
              paddingTop: '55px',
            }}
          >
            <span>
              {searchResult.reviewCount} total reviews, {searchResult.gpaCount}{' '}
              total grades
            </span>
          </div>
        </section>
      )}

      {!hasResult && (
        <div id="noResult">
          <h3>{"Sorry, we couldn't find any results for your search."}</h3>
        </div>
      )}
      {/* Conditional React rendering for result and no result */}
    </div>
  );
}
