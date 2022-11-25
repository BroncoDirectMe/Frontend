import React, { ReactElement } from 'react';
import ListPage from './ListItem';
import { ToggleButton } from './ToggleButton';
import Button from './components/MissingButton';
import Form from './components/Form';
import { useState } from 'react';

const personArray = [
  {
    professorName: 'Dr. Billy',
    overallRating: 4.5,
    difficulty: 18,
    reviewCount: 50,
  },
  {
    professorName: 'Professor Bobby',
    overallRating: 5.0,
    difficulty: 31,
    reviewCount: 60,
  },
  {
    professorName: 'Dr. Marshal',
    overallRating: 1.2,
    difficulty: 27,
    reviewCount: 80,
  },
  {
    professorName: 'Dr. J',
    overallRating: 5,
    difficulty: 19,
    reviewCount: 190,
  },
  {
    professorName: 'Professor Yimmy',
    overallRating: 4.2,
    difficulty: 18,
    reviewCount: 12,
  },
];

/**
 * @returns Main app component
 */
export function App(): ReactElement {
  const [buttonPopup, setButtonPopup] = useState(false);
  return (
    <>
      <div className="App">
        <ToggleButton />
        <ListPage list={personArray} />
      </div>
      <>
        <br />
        <button className="closebtn" onClick={() => setButtonPopup(false)}>
          Close
        </button>
        <br />
        <Button
          border="solid"
          color="red"
          height="100px"
          onClick={() => setButtonPopup(true)}
          radius="15px"
          width="300px"
          children="Report Missing Professor"
          align-items="center"
        />
        {buttonPopup && <Form />}
      </>
    </>
  );
}

export default App;
