import React from 'react';
import { createRoot } from 'react-dom/client';
import TableRedesign from './components/TableRedesign/TableRedesign';

type pageMappingType = Record<string, (doc: Document) => void>;
export const pageMapping: pageMappingType = {
  SSR_CLSRCH_RSLT: classSearchInject, // Class Search Result
  CSU_SS_DPR_ADB: degreeProgressInject, // Degree Progress Report
};

/**
 * Function to inject into Class Search Result
 * @param doc Root Document to inject into
 */
function classSearchInject(doc: Document): void {
  const rootInjection: HTMLElement | null = doc.getElementById(
    'win0divDERIVED_CLSRCH_GROUP6'
  );
  if (rootInjection == null) return;
  const classRows: NodeListOf<HTMLElement> = doc.querySelectorAll(
    '*[data-for^="SSR_CLSRSLT_WRK_GROUPBOX2$"]'
  );
  createRoot(rootInjection).render(<TableRedesign courseHTML={classRows} />);
}

interface courseListType {
  courses: Record<string, number>;
  taken: number;
  enrolled: number;
  needed: number;
}

/**
 * Function to inject into Degree Progress Report
 * @param doc Root Document to inject into
 */
function degreeProgressInject(doc: Document): void {
  const major: courseListType = {
    courses: {},
    taken: 0,
    enrolled: 0,
    needed: 0,
  };

  const majorDPR = doc.querySelectorAll<HTMLElement>(
    'table [id="ACE_CSU_ARSLT_RLVW$3"] h2.ui-collapsible-heading'
  );

  majorDPR.forEach((elem, idx, nodes) => {
    if (idx === nodes.length - 1) return; // last element will be elective tab
    const course = elem.innerText.split(/ (?:\(.*\))(?:\n)/); // output is [course, status]
    let status = 0;
    if (course[1] === 'Taken') {
      status = 0;
      major.taken++;
    } else if (course[1] === 'Enrolled') {
      status = 1;
      major.enrolled++;
    } else if (course[1] === 'Error') {
      status = 2;
      major.needed++;
    } else return;

    major.courses[course[0]] = status;
  });

  chrome.storage.local.set({ major }).catch((err: Error) => console.error(err));
}
