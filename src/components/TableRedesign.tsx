import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

const tableScraper = (arr: any) => {
  return Array.from(arr).map((i: any) =>
    Array.from(i.querySelectorAll('span'))
      .map((i: any) => i.innerText)
      .filter((i) => i !== '')
  );
};
const detailsMapping = (elem: any) =>
  tableScraper(elem.querySelectorAll('*[id^="trSSR_CLSRCH_MTG1$"]')).map(
    ([ID, Section, Times, Location, Instr, Dates, Status]) => ({
      ID,
      Section,
      Times,
      Location,
      Instr,
      Dates,
      Status,
    })
  );
const DataMapping = (fold: any) => {
  const map: any = {};
  Array.from(fold).map((elem: any) => {
    map[elem.querySelectorAll('h2,h3,h4')[0].innerText] = detailsMapping(elem);
  });
  return map;
};

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
