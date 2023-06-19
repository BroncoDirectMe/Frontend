import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
  return (
    <>
      {/* does the indexing work for you */}
      {props.list.map((person: person, index: number) => (
        <Accordion key={index} defaultExpanded={true}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ fontSize: '2.5rem' }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography
              sx={{
                margin: 'auto 0',
                fontWeight: 'bold',
                fontSize: '1.2rem',
              }}
            >
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
              <Typography sx={{ display: 'flex' }}>
                <b style={{ alignSelf: 'center' }}>User Rating: </b>
              </Typography>
              <UpvoteDownvoteButton professorName={person.professorName} />
            </AuthenticatedTemplate>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
