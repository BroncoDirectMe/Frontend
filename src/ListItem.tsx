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

export interface person {
  professorName: string;
  overallRating: number;
  difficulty: number;
  reviewCount: number;
}

export function ListPage(props: { list: person[] }): JSX.Element {
  const [upvoteClicked, changeUpvote] = useState(false);
  const [downvoteClicked, changeDownvote] = useState(false);

  return (
    <>
      {/* does the indexing work for you */}
      {props.list.map((person: person, index: number) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ fontSize: '2.5rem' }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              {person.professorName}{' '}
              <b>{person.overallRating} / 5 Overall Rating</b>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <b>Difficulty: </b>
              {person.difficulty} / 5
            </Typography>
            <Typography>
              <b>Review Count: </b>
              {person.reviewCount}
            </Typography>
            <AuthenticatedTemplate>
              <Typography sx={{ display: 'flex' }}>
                <b style={{ alignSelf: 'center' }}>User Rating: </b>
                <IconButton
                  aria-label="upvote"
                  onClick={() => {
                    changeUpvote(true);
                    changeDownvote(false);
                  }}
                >
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
                  onClick={() => {
                    changeUpvote(false);
                    changeDownvote(true);
                  }}
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
              </Typography>
            </AuthenticatedTemplate>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
