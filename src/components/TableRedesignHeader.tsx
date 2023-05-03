import { TableRow, TableHead, TableCell } from '@mui/material';
import React from 'react';
const TableRedesignHeader = ({ Headings }: { Headings: string[] }): JSX.Element => (
  <TableHead>
    <TableRow>
      {Headings.map(
        (label: string) =>
          !label.includes('_') && (
            <TableCell style={{ fontWeight: 'bold', textAlign: 'left' }} width="10%" key={label}>
              {label}
            </TableCell>
          )
      )}
    </TableRow>
  </TableHead>
);
export default TableRedesignHeader;
