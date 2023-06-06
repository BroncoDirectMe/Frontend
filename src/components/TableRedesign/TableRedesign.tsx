import TableRedesignBody from './TableRedesignBody';
import TableRedesignHeader from './TableRedesignHeader';
import React, { useEffect, useState } from 'react';
import { Table } from '@mui/material';
import ExpandableRows from './ExpandableTableRows';
import courseScraper from '../courseScraper';

import { CourseMap } from '../../../types/types';

interface courseType {
  courseHTML: NodeListOf<HTMLElement>;
}

const TableRedesign = ({ courseHTML }: courseType): JSX.Element => {
  const [data, setData] = useState({});
  useEffect(() => {
    setData(courseScraper(courseHTML));
  }, []);

  return (
    <Table
      style={{ borderCollapse: 'separate', borderSpacing: '0 10px' }}
      sx={{ width: '100%' }}
    >
      {Object.entries(data as CourseMap).map(([Course, Sections]) => (
        <ExpandableRows key={Course} title={Course}>
          <Table style={{ tableLayout: 'fixed' }}>
            <TableRedesignHeader Headings={Object.keys(Sections[0])} />
            <TableRedesignBody Sections={Sections} />
          </Table>
        </ExpandableRows>
      ))}
    </Table>
  );
};

export default TableRedesign;
