import React, { Children } from 'react';
import { useState } from 'react';

export const Form = () => {
  const [pName, setPName] = useState('');
  const [pMajor, setPMajor] = useState('');

  const handleSubmit = (profName: string, profMajor: string) => {
    console.log(
      'Professor Name: ' + profName,
      '\n',
      'Professor Major: ' + profMajor
    );
  };
  return (
    <>
      <div className="popUpForm">
        <div>
          <br />
          <input
            type="text"
            name="profName"
            placeholder="Professor name"
            value={pName}
            onChange={(e) => setPName(e.target.value)}
          />
          <br /> <br />
          <input
            type="text"
            name="profMajor"
            placeholder="Major"
            value={pMajor}
            onChange={(e) => setPMajor(e.target.value)}
          />
          <br />
          <br />
          <button type="submit" onClick={() => handleSubmit(pName, pMajor)}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Form;
