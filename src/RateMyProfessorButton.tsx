/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { ProfessorNameFiltering } from './ProfessorPopup';

const infoIconStyle = {
  minHeight: '16px',
  minWidth: '16px',
  height: '24px',
};

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
      {loading && '. . .'}
      {!loading && (
        <Tooltip
          disableFocusListener
          title="Open RateMyProfessor Page"
          placement="top"
        >
          <Button
            style={{ background: 'none', border: 'none' }}
            className={`${loading ? 'disabled' : ''}`}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={handleButtonClick}
          >
            <InfoIcon style={infoIconStyle} />
          </Button>
        </Tooltip>
      )}
    </>
  );
}
