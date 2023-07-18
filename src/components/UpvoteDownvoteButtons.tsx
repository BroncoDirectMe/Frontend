import { Button } from '@mui/material';
import React from 'react';

/**
 * Upvote and downvote button component
 * @param props React props
 * @param props.professorName Professor name to vote on
 * @returns Upvote and downvote button components
 */
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

/**
 * Upvote button component constructor
 * @param props React props
 * @param props.professorName Professor name to vote on
 * @returns Upvote button component
 */
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

/**
 * Downvote button component constructor
 * @param props React props
 * @param props.professorName Professor name to vote on
 * @returns Downvote button component
 */
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

/**
 * Filters professor name string
 * @param profName Professor name string
 * @returns Array of professor names
 */
function ProfessorNameFiltering(profName: string): String[] {
  const set = new Set(profName.split(',').join('').split('\n'));
  set.delete('To be Announced');
  return Array.from(set);
}
