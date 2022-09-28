import React, { ReactElement } from 'react';
import ListPage from './ListItem';

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
    reviewCount: 800,
  },
];

export function App(): ReactElement {
  return <ListPage list={personArray} />;
}
