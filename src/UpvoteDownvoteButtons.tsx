import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// import { AuthenticatedTemplate } from '@azure/msal-react';

// Same name filter method as in ProfessorPopup except as a string array
function ProfessorNameFiltering(profName: string): String[] {
  const set = new Set(profName.split(',').join('').split('\n'));
  set.delete('To be Announced');
  return Array.from(set);
}

/**
 * Creates a SVG image using DOM manipulation
 * @param width SVG pixel value
 * @param fill Color String -- default is `currentColor`
 * @param viewBox default is `0 0 16 16`
 * @param pathD property used for inner SVG element
 * @param fillRule used to alternate between filled and outlined SVG element
 */
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
 * Upvote and downvote button component
 * @param props React props
 * @param props.professorName Professor name to vote on
 * @returns Upvote and downvote button components
 */
export default function UpvoteDownvoteButton(props: {
  professorName: string;
}): JSX.Element {
  const [upvoteClicked, changeUpvote] = useState(false);
  const [downvoteClicked, changeDownvote] = useState(false);
  const sendUpvote = (): void => {
    changeUpvote(!upvoteClicked);
    changeDownvote(false);

    chrome.runtime.sendMessage(
      { professor: ProfessorNameFiltering(props.professorName)[0], vote: true },
      function (response) {
        console.log(response);
      }
    );
  };
  const sendDownvote = (): void => {
    changeUpvote(false);
    changeDownvote(!downvoteClicked);

    chrome.runtime.sendMessage(
      {
        professor: ProfessorNameFiltering(props.professorName)[0],
        vote: false,
      },
      function (response) {
        console.log(response);
      }
    );
  };

  return (
    <>
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

      <IconButton aria-label="downvote" onClick={sendDownvote}>
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

  const upvoteButton = document.createElement('button');
  upvoteButton.style.background = 'none';
  upvoteButton.style.border = 'none';
  let upvoteState = false;
  upvoteButton.appendChild(unclickedUpvoteIcon);
  // Sets initial button state to unclicked Upvote icon

  upvoteButton.addEventListener('click', (event) => {
    event.preventDefault();
    upvoteState = !upvoteState;
    upvoteButton.textContent = '';
    // Clears button state
    upvoteState
      ? upvoteButton.appendChild(clickedUpvoteIcon)
      : upvoteButton.appendChild(unclickedUpvoteIcon);

    chrome.runtime.sendMessage(
      { professor: professorName, vote: true },
      function (response) {
        console.log(response);
      }
    );
  });
  ratingContainer.appendChild(upvoteButton);

  const downvoteButton = document.createElement('button');
  downvoteButton.style.background = 'none';
  downvoteButton.style.border = 'none';
  let downvoteState = false;
  downvoteButton.appendChild(unclickedDownvoteIcon);
  // Sets initial button state to unclicked Downvote icon

  downvoteButton.addEventListener('click', (event) => {
    event.preventDefault();
    downvoteState = !downvoteState;
    downvoteButton.textContent = '';
    // Clears button state
    downvoteState
      ? downvoteButton.appendChild(clickedDownvoteIcon)
      : downvoteButton.appendChild(unclickedDownvoteIcon);

    chrome.runtime.sendMessage(
      { professor: professorName, vote: false },
      function (response) {
        console.log(response);
      }
    );
  });
  ratingContainer.appendChild(downvoteButton);

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
