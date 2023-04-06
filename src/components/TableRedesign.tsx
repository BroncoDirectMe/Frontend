import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

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

type prop = {
  classRows: NodeListOf<HTMLElement>;
};

const TableRedesign = ({ classRows }: prop) => {
  const [data, setData] = useState({});
  useEffect(() => {
    setData(DataMapping(classRows));
  }, []);
  console.log(data);

  return (
    <Table>
      {Object.entries(data).map(([key, value]: any) => (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                colSpan={7}
                align="center"
                style={{ fontWeight: 'bold' }}
              >
                {key}
              </TableCell>
            </TableRow>
            <TableRow>
              {Object.keys(value[0]).map((i) => (
                <TableCell style={{ fontWeight: 'bold' }}>{i}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {value.map((val: any) => (
              <TableRow>
                {Object.values(val).map((i: any) => (
                  <TableCell>{i}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ))}
    </Table>
  );
};
export default TableRedesign;
