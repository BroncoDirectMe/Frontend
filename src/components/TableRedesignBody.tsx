import React from 'react';
import { CourseSections } from '../../types/types';
import { Button, TableBody, TableRow, TableCell } from '@mui/material';
import linkGen from './linkGeneration';

const TableRedesignBody = ({
  Sections,
}: {
  Sections: CourseSections;
}): JSX.Element => {
  return (
    <TableBody>
      {Sections.map((Section) => (
        <TableRow key={Section._idx}>
          {Object.entries(Section).map(
            ([key, value]) =>
              !key.startsWith('_') && (
                <TableCell
                  style={{ textAlign: 'left', whiteSpace: 'pre-line' }}
                  width="10%"
                  key={key}
                >
                  {key === '$Select' && (
                    <>
                      {value ? (
                        <Button href={linkGen(key, Section._idx)}>
                          Select Class
                        </Button>
                      ) : (
                        <>Selection Unavailable</>
                      )}
                    </>
                  )}
                  {key !== '$Select' && key.startsWith('$') && (
                    <a href={linkGen(key, Section._idx)}>{value}</a>
                  )}
                  {!key.startsWith('$') && value}
                </TableCell>
              )
          )}
        </TableRow>
      ))}
    </TableBody>
  );
};
export default TableRedesignBody;
