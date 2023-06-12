import {
  TextField,
  Autocomplete,
  createFilterOptions,
  CircularProgress,
} from '@mui/material';
import React, { CSSProperties, useState, useEffect } from 'react';
import RateMyProfessorButton from './RateMyProfessorButton';
import './styles/SearchBar.css';

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
      <div className="ratings-container">
        <span id="overall-ratings">
          {displayPercentage ? (
            <span>
              <span>{value.toFixed(1)}</span>
              <span id="percentage">%</span>
            </span>
          ) : (
            <span id="score">
              {(value / 20).toFixed(1)}
              <span id="total">/5</span>
            </span>
          )}
        </span>
      </div>
      <span id="ratings-categories">{title}</span>
    </div>
  );
}

/**
 * Search bar component constructor
 * @param settingBarState State of search bar results
 * @returns Search bar
 */
export default function SearchBar(settingBarState: boolean): JSX.Element {
  const [searchText, setSearchText] = useState('');
  const [hasResult, setResult] = useState(true);
  const [loading, isLoading] = useState(false);
  const [searchResult, newResult] = useState({
    professorName: 'professor',
    overallRating: 1.0,
    difficulty: 1.0,
    reviewCount: 1,
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
                  newResult({
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    professorName: `${firstName} ${lastName}`,
                    overallRating: avgRating,
                    difficulty: avgDifficulty,
                    reviewCount: numRatings,
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
          <div className="overall-circle-align">
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
            />
            <div className="spacing-inbetween" /> {/* empty div with a width */}
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
            />
            <div className="spacing-inbetween" /> {/* empty div with a width */}
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
            />
          </div>
          <div id="number-of-reviews">
            <span>{searchResult.reviewCount} total reviews</span>
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
