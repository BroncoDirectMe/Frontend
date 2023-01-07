import { Button } from '@mui/material';
import React from 'react';

/**
 * Handles uploading professor rating client-side to server-side with a GET request
 * @param professor Professor Name
 * @param voteType Upvote (true)  Downvote (false)
 */
async function uploadProfRating(
  professor: String,
  voteType: boolean
): Promise<void> {
  await fetch('http://localhost:3000/vote', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ professor, voteType }),
  });
}

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
        void (async () =>
          await uploadProfRating(
            ProfessorNameFiltering(props.professorName)[0],
            true
          ))();
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
        void (async () =>
          await uploadProfRating(
            ProfessorNameFiltering(props.professorName)[0],
            false
          ))();
      }}
    >
      v
    </Button>
  );
}

// Same name filter method as in ProfessorPopup except as a string arrayo
function ProfessorNameFiltering(profName: string): String[] {
  const set = new Set(profName.split(',').join('').split('\n'));
  set.delete('To be Announced');
  return Array.from(set);
}
