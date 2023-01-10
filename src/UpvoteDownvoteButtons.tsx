import { IconButton } from '@mui/material';
import React, { useState } from 'react';
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { AuthenticatedTemplate } from '@azure/msal-react';
import { signIn } from './MicrosoftOath';
import Button from '@mui/material/Button';

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

export function UpvoteDownvoteButton(props: {
  professorName: string;
}): JSX.Element {
  const [upvoteClicked, changeUpvote] = useState(false);
  const [downvoteClicked, changeDownvote] = useState(false);
  const sendUpvote = (): void => {
    changeUpvote(true);
    changeDownvote(false);
    void (async () => await signIn())();
    // void (async () =>
    //   await uploadProfRating(
    //     ProfessorNameFiltering(props.professorName)[0],
    //     true
    //   ))();
  };
  const sendDownvote = (): void => {
    changeUpvote(false);
    changeDownvote(true);
    void (async () => await signIn())();
    // void (async () =>
    //   await uploadProfRating(
    //     ProfessorNameFiltering(props.professorName)[0],
    //     false
    //   ))();
  };

  return (
    <>
      <Button aria-label="upvote" onClick={sendUpvote}>
        {/* {!upvoteClicked && (
          <ArrowUpwardIcon
            sx={{
              fontSize: '2rem',
              stroke: '#000000',
              strokeWidth: 2.5,
            }}
          />
        )} */}
        {/* Upvote button not selected (default icon) */}
        {/* {upvoteClicked && (
          <ArrowUpwardIcon
            sx={{
              fontSize: '2rem',
              stroke: '#008000',
              strokeWidth: 2.5,
            }}
          />
        )} */}
        {/* Clicked Upvote button icon */}
        UPVOTE
      </Button>

      <Button
        aria-label="downvote"
        onClick={sendDownvote}
      >
        DOWNVOTE
        {/* {!downvoteClicked && (
          <ArrowDownwardIcon
            sx={{
              fontSize: '2rem',
              stroke: '#000000',
              strokeWidth: 2.5,
            }}
          />
        )} */}
        {/* Downvote button not selected (default icon) */}
        {/* {downvoteClicked && (
          <ArrowDownwardIcon
            sx={{
              fontSize: '2rem',
              stroke: '#ff0000',
              strokeWidth: 2.5,
            }}
          />
        )} */}
        {/* Clicked Downvote button icon */}
      </Button>
    </>
  );
}

// Same name filter method as in ProfessorPopup except as a string array
function ProfessorNameFiltering(profName: string): String[] {
  const set = new Set(profName.split(',').join('').split('\n'));
  set.delete('To be Announced');
  return Array.from(set);
}

/**
 * Separate function for BroncoDirect Upvote / Downvote because React styling doesn't apply
 * @returns Div container holding upvote and downvote buttons
 */
export function broncoDirectUpvoteDownvoteButton(): HTMLDivElement {
  const ratingContainer = document.createElement('div');
  ratingContainer.id = 'upvoteDownvoteRoot';
  ratingContainer.style.float = 'left';
  ratingContainer.style.padding = '2%';

//   const unclickedUpvoteIcon = document.createElementNS("http://www.w3.org/2000/svg","svg");
//   const clickedUpvoteIcon = document.createElementNS("http://www.w3.org/2000/svg","svg");
//   const unclickedDownvoteIcon = document.createElementNS("http://www.w3.org/2000/svg","svg");
//   const clickedDownvoteIcon = document.createElementNS("http://www.w3.org/2000/svg","svg");

//   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
//   <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
// </svg>
// // Arrow up circle fill
  
// <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
//   <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
// </svg>
// // Arrow up circle

// <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
//   <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
// </svg>
// // Arrow down circle fill

// <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-circle" viewBox="0 0 16 16">
//   <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
// </svg>
// Arrow down circle
  // https://www.i-programmer.info/programming/graphics-and-imaging/3254-svg-javascript-and-the-dom.html
  
  
  return ratingContainer;
}
