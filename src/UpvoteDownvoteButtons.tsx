import { Button } from '@mui/material';
import React from 'react';

export function UpvoteButton(props: { professorName: string }): JSX.Element {
  return (
    <Button
      color="success"
      onClick={() => {
        console.log(
          'Upvote: Professor ' + ProfessorNameFiltering(props.professorName)
        );
      }}
    >
      ^
    </Button>
  );
}

export function DownvoteButton(props: { professorName: string }): JSX.Element {
  return (
    <Button
      color="warning"
      onClick={() => {
        console.log('Downvote: Professor ' + ProfessorNameFiltering(props.professorName));
      }}
    >
      v
    </Button>
  );
}

//Filtering out duplicate professor names & "To be Announced"
function ProfessorNameFiltering(profName: string): string {
  // Remove commas and new lines (\n)
  const set = new Set(profName.split(',').join('').split('\n'));
  set.delete('To be Announced');
  return Array.from(set).join(' & ');
}
