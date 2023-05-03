import React from 'react';
import { CourseSections } from '../../types/types';
import { TableBody, TableRow, TableCell } from '@mui/material';
const TableRedesignBody = ({ Sections }: { Sections: CourseSections }): JSX.Element => {
  return (
    <TableBody>
      {Sections.map((Section) => (
        <TableRow key={Section._idx}>
          {Object.entries(Section).map(
            ([key, value]) =>
              !key.includes('_') && (
                <TableCell style={{ textAlign: 'left', whiteSpace: 'pre-line' }} width="10%" key={key}>
                  {value}
                </TableCell>
              )
          )}
        </TableRow>
      ))}
    </TableBody>
  );
};
export default TableRedesignBody;
