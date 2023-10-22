import { TableRow, TableHead, TableCell } from '@mui/material';
import React from 'react';
import '../../styles/TableRedesignHeader.css';

// Maps the course sections keys to the table header
const TableRedesignHeader = ({
  Headings,
}: {
  Headings: string[];
}): JSX.Element => (
  <TableHead>
    <TableRow>
      {Headings.map(
        (label: string) =>
          !label.startsWith('_') && (
            <TableCell className="table-header" key={label}>
              {label.replace('$', '')}
            </TableCell>
          )
      )}
    </TableRow>
  </TableHead>
);
export default TableRedesignHeader;
