import { Button } from '@mui/material';
import React from 'react';

export default function UpvoteDownvoteButton(props: {
  professorName: string;
}): JSX.Element {
  return (
    <>
      <UpvoteButton professorName={props.professorName} />
      <DownvoteButton professorName={props.professorName} />
    </>
  );
}

function UpvoteButton(props: { professorName: string }): JSX.Element {
  return (
    <Button
      color="success"
      onClick={() => {
        console.log('Upvoted:', ProfessorNameFiltering(props.professorName));
      }}
    >
      ^
    </Button>
  );
}

function DownvoteButton(props: { professorName: string }): JSX.Element {
  return (
    <Button
      color="warning"
      onClick={() => {
        console.log('Downvoted:', ProfessorNameFiltering(props.professorName));
      }}
    >
      v
    </Button>
  );
}

//Same name filter method as in ProfessorPopup except as a string arrayo
function ProfessorNameFiltering(profName: string): String[] {
  const set = new Set(profName.split(',').join('').split('\n'));
  set.delete('To be Announced');
  return Array.from(set);
}
