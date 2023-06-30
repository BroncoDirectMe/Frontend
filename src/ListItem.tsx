import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { AuthenticatedTemplate } from '@azure/msal-react';
import RateMyProfessorButton from './RateMyProfessorButton';

/**
 * Handles uploading professor rating client-side to server-side with a GET request
 * @param professor Professor Name
 * @param voteType Upvote (true)  Downvote (false)
 */
async function uploadProfRating(
  professor: String,
  voteType: boolean
): Promise<void> {
  await fetch('https://api.cppbroncodirect.me/vote', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ professor, voteType }),
  });
}

export interface person {
  professorName: string;
  overallRating: number;
  difficulty: number;
  reviewCount: number;
}

/**
 * ListPage component
 * @param props React props
 * @param props.list List of professors
 * @returns Component showcasing professor statistics
 */
export function ListPage(props: { list: person[] }): JSX.Element {
  const [upvoteClicked, changeUpvote] = useState(false);
  const [downvoteClicked, changeDownvote] = useState(false);

  return (
    <>
      {/* does the indexing work for you */}
      {props.list.map((person: person, index: number) => (
        <Accordion key={index} defaultExpanded={true}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon id="expand-icon" />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography id="professor-header">
              {person.professorName}
            </Typography>
            <RateMyProfessorButton professorName={person.professorName} />
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <b>Rating: </b>
              <b>{person.overallRating} / 5 </b>
            </Typography>
            <Typography>
              <b>Difficulty: </b>
              {person.difficulty} / 5
            </Typography>
            <Typography>
              <b>Review Count: </b>
              {person.reviewCount}
            </Typography>
            <AuthenticatedTemplate>
              <Typography id="user-typography">
                <b id="user-rating">User Rating: </b>
                <IconButton
                  aria-label="upvote"
                  onClick={() => {
                    changeUpvote(!upvoteClicked);
                    changeDownvote(false);
                    void (async () =>
                      await uploadProfRating(person.professorName, true))();
                  }}
                >
                  {!upvoteClicked && (
                    <ArrowUpwardIcon className="unclicked-arrow" />
                  )}
                  {/* Upvote button not selected (default icon) */}

                  {upvoteClicked && (
                    <ArrowUpwardIcon className="clicked-upward-arrow" />
                  )}
                  {/* Clicked Upvote button icon */}
                </IconButton>

                <IconButton
                  aria-label="downvote"
                  onClick={() => {
                    changeDownvote(!downvoteClicked);
                    changeUpvote(false);
                    void (async () =>
                      await uploadProfRating(person.professorName, false))();
                  }}
                >
                  {!downvoteClicked && (
                    <ArrowDownwardIcon className="unclicked-arrow" />
                  )}
                  {/* Downvote button not selected (default icon) */}

                  {downvoteClicked && (
                    <ArrowDownwardIcon className="clicked-downward-arrow" />
                  )}
                  {/* Clicked Downvote button icon */}
                </IconButton>
              </Typography>
            </AuthenticatedTemplate>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
