import { TextField } from '@mui/material';
import React, { CSSProperties, useState } from 'react';
import { ListPage, person } from './ListItem';

let searchView: CSSProperties = {
  display: 'none',
};
export default function SearchBar(): JSX.Element {
  const [searchText, setSearchText] = useState('');
  const [hasResult, setResult] = useState(true);
  const [loading, isLoading] = useState(false);
  const [searchResult, newResult] = useState<person>({
    professorName: 'professor',
    overallRating: 1.0,
    difficulty: 1.0,
    reviewCount: 1,
  });

  return (
    <div>
      <h1>BroncoDirectMe Search Bar</h1>
      <TextField
        type="text"
        value={searchText}
        fullWidth
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onKeyUp={async (e) => {
          if (e.key === 'Enter') {
            isLoading(true);
            setResult(true);
            try {
              const request = await fetch('http://localhost:3000/professor', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: searchText }),
              });
              // POST request to the backend with endpoint /professor
              const {
                avgRating,
                avgDifficulty,
                firstName,
                lastName,
                numRatings,
              } = await request.json();
              newResult({
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                professorName: `${firstName} ${lastName}`,
                overallRating: avgRating,
                difficulty: avgDifficulty,
                reviewCount: numRatings,
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

      {loading && (
        <img
          src="https://i.imgur.com/AO3PZss.gif"
          width="175"
          height="175"
          alt="Loading..."
        />
      )}
      {/* Conditional rendering for loading image */}

      {hasResult && (
        <section id="searchResult" style={searchView}>
          <ListPage list={[searchResult]} />
        </section>
      )}
      {!hasResult && <p>The query yielded no results</p>}
      {/* Conditional React rendering for result and no result */}
    </div>
  );
}
