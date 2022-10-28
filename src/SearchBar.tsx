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
          onKeyUp={(e) => {
            if (e.key === 'Enter') console.log(searchText);
            // run search function when backend is implemented
          }}
        />
      </div>
    </>
  );
}
