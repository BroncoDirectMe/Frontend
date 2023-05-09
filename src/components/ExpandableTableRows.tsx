import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';

const ICON = {
  width: '1em',
  height: '1em',
  display: 'inline-block',
  fontSize: '1.5rem',

  padding: '0',
  outline: '0',
  border: 'none',
  background: 'none',
};

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
      <TableRow style={{ backgroundColor: 'grey' }}>
        <TableCell padding="checkbox">
          <IconButton style={ICON} onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </TableCell>
        <TableCell style={{ fontWeight: 'bold' }}>{title}</TableCell>
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
