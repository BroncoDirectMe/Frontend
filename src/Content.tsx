import React from 'react';
import { createRoot } from 'react-dom/client';
import ProfessorPopup from './ProfessorPopup';
import RateMyProfessorButton from './RateMyProfessorButton';
// import UpvoteDownvoteButton from './UpvoteDownvoteButtons';

let searchResultsTrue = false;

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
  iframe?.contentWindow?.addEventListener('click', () => {
    const insts: NodeListOf<HTMLElement> | undefined =
      iframe.contentWindow?.document.querySelectorAll('*[id^="MTG_INSTR$"]');

    const header: HTMLElement | null | undefined =
      iframe.contentWindow?.document.querySelector('.gh-page-header-headings');

    // Log to console the current page of Bronco Direct (using the header of the page)
    if (header !== undefined && header !== null) {
      console.log((header.children[2] as HTMLElement).innerText);

      if ((header.children[2] as HTMLElement).innerText === 'Search Results') {
        if (!searchResultsTrue) {
          // iterate through insts and create new instance of ProfessorPopup & UpvoteDownvoteButton for each inst
          insts?.forEach((inst) => {
            // append new root containers under inst.parent to retain original span element
            const professorPopupRoot = document.createElement('div');
            const rateMyProfessorRoot = document.createElement('div');
            // const upvoteDownvoteRoot = document.createElement('div');
            const parentElem = inst.parentElement as HTMLDivElement;

            // styling for the ProfessorPopup Button
            professorPopupRoot.setAttribute('id', 'professorPopupRoot');
            professorPopupRoot.style.float = 'right';
            parentElem?.append(professorPopupRoot);

            // styling for RateMyProfessor Button
            rateMyProfessorRoot.setAttribute('id', 'rateMyProfessorRoot');
            rateMyProfessorRoot.style.flex = 'right';
            parentElem?.append(rateMyProfessorRoot);

            // Styling for the UpvoteDownvote Button
            // upvoteDownvoteRoot.setAttribute('id', 'upvoteDownvoteRoot');
            // upvoteDownvoteRoot.style.float = 'left';
            // upvoteDownvoteRoot.style.padding = '2%';
            // parentElem?.prepend(upvoteDownvoteRoot);

            // createRoot(upvoteDownvoteRoot).render(
            //   <UpvoteDownvoteButton professorName={inst.innerText} />
            // );

            createRoot(rateMyProfessorRoot).render(
              <RateMyProfessorButton professorName={inst.innerText} />
            );

            createRoot(professorPopupRoot).render(
              <ProfessorPopup professorName={inst.innerText} />
            );
          });
          searchResultsTrue = true;
        }
      } else searchResultsTrue = false;
    } else console.log('undefined');
  });
}

console.log(document.URL);
