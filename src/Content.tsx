import React from 'react';
import { createRoot } from 'react-dom/client';
import UpvoteDownvoteButton from './UpvoteDownvoteButtons';

// Page iframe
const iframe = document.getElementById('ptifrmtgtframe') as HTMLIFrameElement;

iframe?.contentWindow?.addEventListener('message', () => {
  const insts: NodeListOf<HTMLElement> | undefined =
    iframe.contentWindow?.document.querySelectorAll('*[id^="MTG_INSTR$"]');
  // iterate through insts and create new instance of ProfessorPopup for each inst
  insts?.forEach((inst) => {
    // Root container
    const upvoteDownvoteRoot = document.createElement('div');
    const parentElem = inst.parentElement as HTMLDivElement;

    // Upvote and Downvote Buttons
    upvoteDownvoteRoot.setAttribute('id', 'upvoteDownvoteRoot');
    upvoteDownvoteRoot.style.float = 'left';
    upvoteDownvoteRoot.style.padding = '2%';

    parentElem?.prepend(upvoteDownvoteRoot);

    createRoot(upvoteDownvoteRoot).render(
      <UpvoteDownvoteButton professorName={inst.innerText} />
    );
  });
});
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

    // Log to console the current page of Bronco Direct (using the header of the page)
    if (header !== undefined && header !== null)
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
