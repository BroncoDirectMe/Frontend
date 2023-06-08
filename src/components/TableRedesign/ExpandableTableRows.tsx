import React from 'react';
import { TableCell, TableRow, Icon } from '@mui/material';
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
  stroke: '#ffffff',
  strokeWidth: 2,
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
      <TableRow
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          background: 'linear-gradient(to right, #00843D 0%, #01426A 100%)',
          cursor: 'pointer'
        }}
      >
        <TableCell padding="checkbox">
          <Icon style={ICON}>
            {isExpanded ? <ExpandLess /> : <ExpandMore />}
          </Icon>
        </TableCell>
        <TableCell style={{ fontWeight: 'bold', color: 'white' }}>
          {title}
        </TableCell>
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
