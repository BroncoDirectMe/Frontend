import { TextField } from '@mui/material';
import React, { CSSProperties, useState, useEffect } from 'react';
import { ListPage, person } from './ListItem';

let searchView: CSSProperties = {
  display: 'none',
};
let noResultsView: CSSProperties = {
  display: 'none',
};

export default function SearchBar(): JSX.Element {
  const [searchText, setsearchText] = useState('');
  const [count, hasResult] = useState(0);
  const [searchResult, newResult] = useState<person>({
    professorName: 'professor',
    overallRating: 1.0,
    difficulty: 1.0,
    reviewCount: 1,
  });

  useEffect(() => {
    noResultsView = {
      display: 'block',
    };
    searchView = {
      display: 'none',
    };
  }, [count])
  // attempt at trying to render a 'no results' element when the search has no results

  return (
    <div>
      <h1>BroncoDirectMe Search Bar</h1>
      <TextField
        type="text"
        value={searchText}
        fullWidth
        onChange={(e) => {
          setsearchText(e.target.value);
        }}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onKeyUp={async (e) => {
          if (e.key === 'Enter') {
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

              searchView = {
                display: 'block',
              };
              noResultsView = {
                display: 'none',
              };
              newResult({
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                professorName: `${firstName} ${lastName}`,
                overallRating: avgRating,
                difficulty: avgDifficulty,
                reviewCount: numRatings,
              });
            } catch {
              console.log("no work")
              hasResult((count) => count ++)
              // Case when the search yields no results
            }
          }
        }}
      />

      <section id="searchResult" style={searchView}>
        <ListPage list={[searchResult]} />
      </section>
      <p style={noResultsView}>The query yielded no results</p>
    </div>
  );
}
