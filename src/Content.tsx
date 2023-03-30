import React from 'react';
import { createRoot } from 'react-dom/client';
import ProfessorPopup from './ProfessorPopup';
import RateMyProfessorButton from './RateMyProfessorButton';
import TableRedesign from './components/TableRedesign';
// import UpvoteDownvoteButton from './UpvoteDownvoteButtons';

let searchResultsTrue = false;

function injectButtons(): void {
  if (
    window.self !== window.top || // Makes sure only the top window loads first and not the iframe window
    !document.URL.includes('https://cmsweb.cms.cpp.edu/')
  ) {
    return;
  }
  console.log('[BRONCODIRECT] Page Loaded');

  if (
    document.URL.includes(
      'https://cmsweb.cms.cpp.edu/psp/CPOMPRDM/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.CLASS_SEARCH.GBL?'
    )
  ) {
    const iframe = (
      document.getElementById('ptifrmtgtframe') as HTMLIFrameElement
    ).contentWindow;

    iframe?.addEventListener('click', () => {
      const rootInjection = iframe.document.getElementById(
        'win0divDERIVED_CLSRCH_GROUP6'
      )!;
      const classRows: NodeListOf<HTMLElement> =
        iframe.document.querySelectorAll(
          '*[data-for^="SSR_CLSRSLT_WRK_GROUPBOX2$"]'
        );
      createRoot(rootInjection).render(<TableRedesign classRows={classRows} />);
    });
    searchResultsTrue = true;
  }
}

injectButtons();
console.log(document.URL);
