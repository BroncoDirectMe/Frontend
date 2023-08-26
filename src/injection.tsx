import React from 'react';
import { createRoot } from 'react-dom/client';
import TableRedesign from './components/TableRedesign/TableRedesign';

type pageMappingType = Record<string, (doc: Document) => void>;
export const pageMapping: pageMappingType = {
  SSR_CLSRCH_RSLT: classSearchInject, // Class Search Result
  CSU_SS_DPR_ADB: degreeProgressInject, // Degree Progress Report
};

/**
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

/**
 * @param doc Root Document to inject into
 */
function degreeProgressInject(doc: Document): void {
  console.log('[ID] ', doc.getElementById('SCC_PERS_SA_VW_EMPLID')?.innerText);
}
