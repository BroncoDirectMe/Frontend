/* eslint-disable @typescript-eslint/no-unused-vars */
// import { IconButton } from '@mui/material';
import React, { useState } from 'react';
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// import { AuthenticatedTemplate } from '@azure/msal-react';
import { signIn } from './MicrosoftOath';
import Button from '@mui/material/Button';

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
    chrome.runtime.sendMessage(
      { professor: '', vote: true },
      function (response) {
        console.log(response);
      }
    );
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

      <Button aria-label="downvote" onClick={sendDownvote}>
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

function generateSVG(
  width: string,
  fill: string,
  viewBox: string,
  pathD: string,
  fillRule: string = 'nonzero'
): SVGSVGElement {
  const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgIcon.setAttribute('width', width);
  svgIcon.setAttribute('fill', fill);
  svgIcon.setAttribute('viewBox', viewBox);

  const svgPath = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'path'
  );
  svgPath.setAttribute('d', pathD);
  svgPath.setAttribute('fill-rule', fillRule);
  svgIcon.appendChild(svgPath);
  return svgIcon;
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

  // chrome.runtime.sendMessage(
  //   { professor: '', vote: true },
  //   function (response) {
  //     console.log(response);
  //   }
  // );

  const clickedUpvoteIcon = generateSVG(
    '24',
    'currentColor',
    '0 0 16 16',
    'M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z'
  );
  const unclickedUpvoteIcon = generateSVG(
    '24',
    'currentColor',
    '0 0 16 16',
    'M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z',
    'evenodd'
  );
  const clickedDownvoteIcon = generateSVG(
    '24',
    'currentColor',
    '0 0 16 16',
    'M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z'
  );
  const unclickedDownvoteIcon = generateSVG(
    '24',
    'currentColor',
    '0 0 16 16',
    'M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z',
    'evenodd'
  );

  const upvoteButton = document.createElement('button');
  upvoteButton.style.background = 'none';
  upvoteButton.style.border = 'none';
  let upvoteState = false;
  upvoteButton.appendChild(unclickedUpvoteIcon);
  // Sets initial button state to unclicked Upvote icon

  upvoteButton.addEventListener('click', () => {
    upvoteState = !upvoteState;
    upvoteButton.textContent = '';
    // Clears button state
    upvoteState
      ? upvoteButton.appendChild(clickedUpvoteIcon)
      : upvoteButton.appendChild(unclickedUpvoteIcon);
  });
  ratingContainer.appendChild(upvoteButton);

  const downvoteButton = document.createElement('button');
  downvoteButton.style.background = 'none';
  downvoteButton.style.border = 'none';
  let downvoteState = false;
  downvoteButton.appendChild(unclickedDownvoteIcon);
  // Sets initial button state to unclicked Downvote icon

  downvoteButton.addEventListener('click', () => {
    downvoteState = !downvoteState;
    downvoteButton.textContent = '';
    // Clears button state
    downvoteState
      ? downvoteButton.appendChild(clickedDownvoteIcon)
      : downvoteButton.appendChild(unclickedDownvoteIcon);
  });
  ratingContainer.appendChild(downvoteButton);

  return ratingContainer;
}
