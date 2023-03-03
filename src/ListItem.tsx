import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AuthenticatedTemplate } from '@azure/msal-react';
import { UpvoteDownvoteButton } from './UpvoteDownvoteButtons';

export interface person {
  professorName: string;
  overallRating: number;
  difficulty: number;
  reviewCount: number;
}

export function ListPage(props: { list: person[] }): JSX.Element {
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
              {person.professorName}
              <br />
              <b>Rating {person.overallRating} / 5 </b>
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
              </Typography>
              <UpvoteDownvoteButton professorName={person.professorName}/>
            </AuthenticatedTemplate>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
