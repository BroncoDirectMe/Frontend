/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Tooltip, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { ProfessorNameFiltering } from './ProfessorPopup';
import '../styles/RateMyProfessorButton.css';

/**
 * Button that opens RateMyProfessor page for a given professor
 * @param props React props
 * @param props.professorName Professor name to search for
 * @returns RateMyProfessorButton component
 */
export default function RateMyProfessorButton(props: {
  professorName: string;
}): JSX.Element {
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleButtonClick = async () => {
    console.log('Clicked RMP Button');
    if (!props.professorName) {
      console.log('Empty professor name');
      return;
    }
    setLoading(true);
    try {
      const request = await fetch('https://api.cppbroncodirect.me/professor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: ProfessorNameFiltering(props.professorName),
        }),
      });

      if (!request.ok) {
        throw new Error(`Request failed with status code ${request.status}`);
      }

      const { legacyId } = await request.json();
      console.log(`LegacyId: ${legacyId}`);
      window.open(`https://www.ratemyprofessors.com/professor?tid=${legacyId}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <span id="loading-text">. . .</span>}
      {!loading && (
        <Tooltip
          disableFocusListener
          title={
            <Typography className="rmp-tooltip">
              Open RateMyProfessor Page
            </Typography>
          }
          placement="top"
        >
          <Button
            className={`${loading ? 'disabled' : 'enabled'}`}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={handleButtonClick}
          >
            <InfoIcon id="icon" />
          </Button>
        </Tooltip>
      )}
    </>
  );
}
