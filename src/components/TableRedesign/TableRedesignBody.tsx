import React from 'react';
import { CourseSections } from '../../../types/types';
import { Button, TableBody, TableRow, TableCell } from '@mui/material';
import linkGen from '../linkGeneration';
import ProfessorPopup from '../../ProfessorPopup';

interface TableRedesignBodyProps {
  Sections: CourseSections;
}
interface TableButtonProps {
  value: string;
  link: string;
}

const buttonStyling = {
  backgroundColor: 'green',
  color: 'white',
  borderRadius: '5px',
  display: 'inline-block',
  padding: '3%',
};

const TableButton = ({ value, link }: TableButtonProps): JSX.Element => {
  return value ? (
    <Button href={link} style={buttonStyling}>
      Select Class
    </Button>
  ) : (
    <>Selection Unavailable</>
  );
};

// Maps the course sections to the table body
const TableRedesignBody = ({
  Sections,
}: TableRedesignBodyProps): JSX.Element => {
  return (
    <TableBody>
      {Sections.map((Section) => (
        <TableRow key={Section._idx}>
          {Object.entries(Section).map(([key, value]) => {
            // if the key starts with _ then don't render an
            if (key.startsWith('_')) return null;
            return (
              // if the key is $Select, then we want to render a button
              // if the key starts with $, then we want to render a link
              // else if the key doesn't start with $, we want to render the value
              <TableCell
                style={{ textAlign: 'left', whiteSpace: 'pre-line' }}
                width="10%"
                key={key}
              >
                {(() => {
                  if (key === '$Select')
                    return (
                      <TableButton
                        value={value}
                        link={linkGen(key, Section._idx)}
                      />
                    );
                  else if (key.startsWith('$'))
                    return <a href={linkGen(key, Section._idx)}>{value}</a>;
                  else if (key === 'Instructor')
                    return <ProfessorPopup professorName={value} />;
                  else return value;
                })()}
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </TableBody>
  );
};
export default TableRedesignBody;
