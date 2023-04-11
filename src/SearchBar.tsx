import {
  TextField,
  Autocomplete,
  createFilterOptions,
  CircularProgress,
} from '@mui/material';
import React, { CSSProperties, useState, useEffect } from 'react';

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

function CircularProgressBar({
  value,
  color,
  title,
  displayPercentage,
}: CircularProgressBarProps): JSX.Element {
  const remainingColor = 'rgba(0, 0, 0, 0.1)';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <CircularProgress
        variant="determinate"
        thickness={2.5}
        value={value}
        size={110}
        style={{ color }}
      />
      <CircularProgress
        variant="determinate"
        thickness={2.5}
        value={100}
        size={110}
        style={{ color: remainingColor, position: 'absolute' }}
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
          style={{ fontSize: '27px', textAlign: 'center', fontWeight: 'bold' }}
        >
          {displayPercentage ? (
            <span>
              <span>{value.toFixed(1)}</span>
              <span style={{ fontSize: '15px', fontWeight: 'normal' }}>%</span>
            </span>
          ) : (
            <span style={{ fontSize: '27px', fontWeight: 'bold' }}>
              {(value / 20).toFixed(1)}
              <span style={{ fontSize: '15px', fontWeight: 'normal' }}>/5</span>
            </span>
          )}
        </span>
      </div>
      <span
        style={{
          fontSize: '16px',
          color: 'black',
          textAlign: 'center',
          position: 'absolute',
          top: 'calc(50% + 55px)',
          left: '50%',
          transform: 'translate(-50%, 0)',
          marginTop: '10px',
          marginBottom: '10px',
        }}
      >
        {title}
      </span>
    </div>
  );
}

export default function SearchBar(): JSX.Element {
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
    fetch('https://api.cppbroncodirect.me/professor/names')
      // eslint-disable-next-line @typescript-eslint/promise-function-async
      .then((response) => response.json())
      .then((data) => setProfList(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <Autocomplete
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
        sx={{
          width: '90vw',
          marginBottom: '10%',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          '& input': { textAlign: 'center' },
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
                    retention: wouldTakeAgainPercent.toString(),
                  });
                  // Deconstructs fetch response to fit interface used for ListPage component

                  searchView = {
                    display: 'block',
                  };
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '20px',
          }}
        >
          <CircularProgress />
        </div>
      )}
      {/* Conditional rendering for loading circular progress */}
      {!loading && hasResult && (
        <section id="searchResult" style={searchView}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
            {searchResult.professorName}
          </h2>
          <div style={{ display: 'flex', marginBottom: '20px' }}>
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
            <div style={{ width: '20px' }} /> {/* empty div with a width */}
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
            <div style={{ width: '20px' }} /> {/* empty div with a width */}
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
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '45px',
              fontSize: '16px',
              position: 'relative',
              alignSelf: 'center',
              color: '#A3A3A3',
            }}
          >
            <span>{searchResult.reviewCount} total reviews</span>
          </div>
        </section>
      )}
      {!hasResult && <p>The query yielded no results</p>}
      {/* Conditional React rendering for result and no result */}
    </div>
  );
}
