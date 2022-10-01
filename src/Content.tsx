import React from 'react';
import { createRoot } from 'react-dom/client';
import ProfessorPopup from './ProfessorPopup';

if (document.URL.includes('https://cmsweb.cms.cpp.edu/'))
  console.log('BroncoDirect Page Loaded');

if (
  document.URL.includes(
    'https://cmsweb.cms.cpp.edu/psp/CPOMPRDM/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.CLASS_SEARCH.GBL?'
  )
) {
  const iframe = document.getElementById('ptifrmtgtframe') as HTMLIFrameElement;

  // event listener on the iframe which fires on search
  // since iframe will receive a post message of the search criteria
  // however event will fire regardless if the search criteria is invalid and will remain on the page
  iframe?.contentWindow?.addEventListener('message', () => {
    const insts: NodeListOf<HTMLElement> | undefined =
      iframe.contentWindow?.document.querySelectorAll('*[id^="MTG_INSTR$"]');

    const header: HTMLElement | null | undefined =
      iframe.contentWindow?.document.querySelector('.gh-page-header-headings');

    if (header != undefined)
      console.log((header.children[2] as HTMLElement).innerText);
    else console.log('undefined');

    // iterate through insts and create new instance of ProfessorPopup for each inst
    insts?.forEach((inst) => {
      // append a new root container under inst.parent to retain original span element
      const root = document.createElement('div');
      const parentElem = inst.parentElement as HTMLDivElement;

      // styling for the ProfessorPopup Button
      root.setAttribute('id', 'root');
      root.style.float = 'right';
      parentElem?.append(root);

      createRoot(root).render(
        <ProfessorPopup professorName={inst.innerText} />
      );
    });
  });
}
console.log(document.URL);
