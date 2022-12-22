import { TextField } from '@mui/material';
import React from 'react';

export default function SearchBar(): JSX.Element {
  const [searchText, setsearchText] = React.useState('');

  return (
    <>
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
              const request = await fetch('http://localhost:3000/professor', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ test: 0 }),
              });
              // POST request to the backend with endpoint /professor
              const response = await request.json();
              console.log(response)
            }
          }}
        />
      </div>
    </>
  );
}
