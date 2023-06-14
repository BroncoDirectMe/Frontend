import TableRedesignBody from './TableRedesignBody';
import TableRedesignHeader from './TableRedesignHeader';
import React, { useEffect, useState } from 'react';
import { Table } from '@mui/material';
import ExpandableRows from './ExpandableTableRows';
import courseScraper from '../courseScraper';
import '../../styles/TableRedesign.css';

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
    <div style={{ overflowX: 'auto' }}>
      <Table id="course-catalog">
        {Object.entries(data as CourseMap).map(([Course, Sections]) => (
          <ExpandableRows key={Course} title={Course}>
            <Table className="course-section">
              <TableRedesignHeader Headings={Object.keys(Sections[0])} />
              <TableRedesignBody Sections={Sections} />
            </Table>
          </ExpandableRows>
        ))}
      </Table>
    </div>
  );
};

export default TableRedesign;
