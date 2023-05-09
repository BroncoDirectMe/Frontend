import TableRedesignBody from './TableRedesignBody';
import TableRedesignHeader from './TableRedesignHeader';
import React, { useEffect, useState } from 'react';
import { Table } from '@mui/material';
import ExpandableRows from './ExpandableTableRows';
import courseScraper from './courseScraper';

import { CourseMap } from '../../types/types';

const TableRedesign = ({
  courseHTML,
}: {
  courseHTML: NodeListOf<HTMLElement>;
}): JSX.Element => {
  const [data, setData] = useState({});
  useEffect(() => {
    setData(courseScraper(courseHTML));
  }, []);

  return (
    <Table
      style={{ borderCollapse: 'separate', borderSpacing: '0 10px' }}
      sx={{ Width: 1200 }}
    >
      {Object.entries(data as CourseMap).map(([Course, Sections]) => (
        <ExpandableRows key={Course} title={Course}>
          <TableRedesignHeader Headings={Object.keys(Sections[0])} />
          <TableRedesignBody Sections={Sections} />
        </ExpandableRows>
      ))}
    </Table>
  );
};

export default TableRedesign;
