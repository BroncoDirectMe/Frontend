import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowUpIcon from '@mui/icons-material/ExpandLess';

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

const ExpandableTableRow = ({
  children,
  title,
}: {
  children: JSX.Element;
  title: String;
}) => {
  const [isExpanded, setIsExpanded] = React.useState(true);

  return (
    <>
      <TableRow style={{ backgroundColor: 'grey' }}>
        <TableCell padding="checkbox">
          <IconButton style={ICON} onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
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
