/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Tooltip, Typography, createTheme } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { ProfessorNameFiltering } from './ProfessorPopup';
import { ThemeProvider } from '@emotion/react';

const infoIconStyle = {
  minHeight: '16px',
  minWidth: '16px',
  height: '24px',
};

const tooltipStyle = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '2em',
          color: 'black',
          backgroundColor: 'white!important',
        },
      },
    },
  },
});

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
      {loading && '. . .'}
      {!loading && (
        <ThemeProvider theme={tooltipStyle}>
          <Tooltip
            disableFocusListener
            title={
              <ThemeProvider theme={tooltipStyle}>
                <Typography>Open RateMyProfessor Page</Typography>
              </ThemeProvider>
            }
            placement="top"
          >
            <Button
              style={{ background: 'none', border: 'none' }}
              className={`${loading ? 'disabled' : ''}`}
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={handleButtonClick}
            >
              <InfoIcon style={infoIconStyle} sx={{ color: 'black' }} />
            </Button>
          </Tooltip>
        </ThemeProvider>
      )}
    </>
  );
}
