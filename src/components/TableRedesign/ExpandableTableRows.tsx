import React from 'react';
import { TableCell, TableRow, Icon } from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import '../../styles/ExpandableTableRows.css';

interface ExpandableTableRowProps {
  children: JSX.Element | JSX.Element[];
  title: String;
}

const ExpandableTableRow = ({
  children,
  title,
}: ExpandableTableRowProps): JSX.Element => {
  const [isExpanded, setIsExpanded] = React.useState(true);
  return (
    <>
      <TableRow
        onClick={() => setIsExpanded(!isExpanded)}
        className="expandable-table-row"
      >
        <TableCell padding="checkbox">
          <Icon className="icon">
            {isExpanded ? <ExpandLess /> : <ExpandMore />}
          </Icon>
        </TableCell>
        <TableCell className="expandable-table-cell">{title}</TableCell>
      </TableRow>
      {isExpanded && (
        <TableRow>
          <TableCell padding="checkbox" />
          {children}
        </TableRow>
      )}
    </>
  );
};

export default ExpandableTableRow;
