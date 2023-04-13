import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

import ExpandableAccordion from './ExpandableAccordion';

// returns Course array of array class details
function tableScraper(classRows: NodeListOf<HTMLElement>): string[][] {
  return Array.from(classRows).map((rowContent: Element) => {
    const rowSpanElems = rowContent.querySelectorAll('span');
    const rowTextContents = Array.from(rowSpanElems).map((i) => i.innerText);
    return rowTextContents.filter((i) => i !== ''); // remove blank entries
  });
}

function detailsMapping(elem: Element): object {
  const classSections: NodeListOf<HTMLElement> = elem.querySelectorAll(
    '*[id^="trSSR_CLSRCH_MTG1$"]'
  );
  return tableScraper(classSections).map((classSection) => {
    const [ID, Section, Times, Location, Instr, Dates, Status] = classSection;
    return { ID, Section, Times, Location, Instr, Dates, Status };
  });
}
// maps array of class sections to object value and course name as object key
function DataMapping(classRows: NodeListOf<Element>): Record<string, object> {
  const map: Record<string, object> = {};
  Array.from(classRows).forEach((elem) => {
    const courseTitle = elem.querySelectorAll('h2,h3,h4')[0] as HTMLElement; // first instance of a heading
    map[courseTitle.innerText] = detailsMapping(elem);
  });
  return map;
}

const courseDisplay = (data: object) => {
  const lineBreaks = (content: string) => {
    const out = content.split('\n');
    if (out.length < 2) return content;
    return (
      <>
        {out[0]}
        {out.slice(1).map((i) => (
          <>
            <br />
            {i}
          </>
        ))}
      </>
    );
  };
  let classIdx = 0;
  return (
    <Table>
      {Object.entries(data).map(([title, content]: any) => (
        <ExpandableAccordion title={title}>
          <Table
            style={{ borderCollapse: 'separate', borderSpacing: '0 10px' }}
          >
            {/* class categories */}
            <TableHead sx={{ justifyContent: 'left' }}>
              <TableRow>
                {/* <TableCell width="10%">Dates</TableCell> */}
                <TableCell width="10%">ID</TableCell>
                <TableCell width="10%">Instructor</TableCell>
                <TableCell width="10%" align="center">
                  Location
                </TableCell>
                <TableCell width="10%">Section</TableCell>
                <TableCell width="10%">Times</TableCell>
                <TableCell width="10%">Status</TableCell>
              </TableRow>
            </TableHead>
            {/* classes  */}
            <TableBody>
              {content.map((val: any) => (
                <TableRow>
                  {/* <TableCell width="10%">{val.Dates}</TableCell> */}
                  <TableCell width="10%">
                    <a
                      href={`javascript:submitAction_win0(document.win0,'MTG_CLASS_NBR$${classIdx++}');`}
                    >
                      {console.log('[BRONCODIRECTME]', val, classIdx)}
                      {val.ID}
                    </a>
                  </TableCell>
                  <TableCell width="10%">{lineBreaks(val.Instr)}</TableCell>
                  <TableCell width="10%">{lineBreaks(val.Location)}</TableCell>
                  <TableCell width="10%">{lineBreaks(val.Section)}</TableCell>
                  <TableCell width="10%">{lineBreaks(val.Times)}</TableCell>
                  <TableCell width="10%">{val.Status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ExpandableAccordion>
      ))}
    </Table>
  );
};

const TableRedesign = ({
  classRows,
}: {
  classRows: NodeListOf<Element>;
}): JSX.Element => {
  const [data, setData] = useState({});
  useEffect(() => {
    setData(DataMapping(classRows));
  }, [classRows]);
  console.log(data);
  return courseDisplay(data);
};
export default TableRedesign;
