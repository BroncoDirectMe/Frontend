import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { AuthenticatedTemplate } from '@azure/msal-react';

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
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ professor, voteType }),
  });
}

export default function UpvoteDownvoteButton(props: {
  professorName: string;
}): JSX.Element {
  const [upvoteClicked, changeUpvote] = useState(false);
  const [downvoteClicked, changeDownvote] = useState(false);
  const sendUpvote = (): void => {
    changeUpvote(true);
    changeDownvote(false);
    void (async () =>
      await uploadProfRating(
        ProfessorNameFiltering(props.professorName)[0],
        true
      ))();
  };
  const sendDownvote = (): void => {
    changeUpvote(false);
    changeDownvote(true);
    void (async () =>
      await uploadProfRating(
        ProfessorNameFiltering(props.professorName)[0],
        false
      ))();
  };

  return (
    <AuthenticatedTemplate>
      <IconButton aria-label="upvote" onClick={sendUpvote}>
        {!upvoteClicked && (
          <ArrowUpwardIcon
            sx={{
              fontSize: '2rem',
              stroke: '#000000',
              strokeWidth: 2.5,
            }}
          />
        )}
        {/* Upvote button not selected (default icon) */}

        {upvoteClicked && (
          <ArrowUpwardIcon
            sx={{
              fontSize: '2rem',
              stroke: '#008000',
              strokeWidth: 2.5,
            }}
          />
        )}
        {/* Clicked Upvote button icon */}
      </IconButton>

      <IconButton
        aria-label="downvote"
        onClick={sendDownvote}
        sx={{ display: { xs: 'block', sm: 'none!important' } }}
      >
        {!downvoteClicked && (
          <ArrowDownwardIcon
            sx={{
              fontSize: '2rem',
              stroke: '#000000',
              strokeWidth: 2.5,
            }}
          />
        )}
        {/* Downvote button not selected (default icon) */}
        {downvoteClicked && (
          <ArrowDownwardIcon
            sx={{
              fontSize: '2rem',
              stroke: '#ff0000',
              strokeWidth: 2.5,
            }}
          />
        )}
        {/* Clicked Downvote button icon */}
      </IconButton>
    </AuthenticatedTemplate>
  );
}

// Same name filter method as in ProfessorPopup except as a string array
function ProfessorNameFiltering(profName: string): String[] {
  const set = new Set(profName.split(',').join('').split('\n'));
  set.delete('To be Announced');
  return Array.from(set);
}
