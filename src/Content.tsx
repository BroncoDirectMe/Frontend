import React from 'react';
import { createRoot } from 'react-dom/client';
import ProfessorPopup from './ProfessorPopup';
import RateMyProfessorButton from './RateMyProfessorButton';
import { broncoDirectUpvoteDownvoteButton } from './UpvoteDownvoteButtons';

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
    const iframe = document.getElementById(
      'ptifrmtgtframe'
    ) as HTMLIFrameElement;

    // event listener on the iframe which fires on search
    // since iframe will receive a post message of the search criteria
    // however event will fire regardless if the search criteria is invalid and will remain on the page
    iframe?.contentWindow?.addEventListener('click', () => {
      const insts: NodeListOf<HTMLElement> | undefined =
        iframe.contentWindow?.document.querySelectorAll('*[id^="MTG_INSTR$"]');

      const header: HTMLElement | null | undefined =
        iframe.contentWindow?.document.querySelector(
          '.gh-page-header-headings'
        );

      // Log to console the current page of Bronco Direct (using the header of the page)
      if (header !== undefined && header !== null) {
        console.log((header.children[2] as HTMLElement).innerText);

        if (
          (header.children[2] as HTMLElement).innerText === 'Search Results'
        ) {
          if (!searchResultsTrue) {
            // iterate through insts and create new instance of ProfessorPopup & UpvoteDownvoteButton for each inst
            insts?.forEach((inst) => {
              // append new root containers under inst.parent to retain original span element
              const professorPopupRoot = document.createElement('div');
              const rateMyProfessorRoot = document.createElement('div');
              const parentElem = inst.parentElement as HTMLDivElement;
              const professor = inst.innerText;

              // styling for the ProfessorPopup Button
              professorPopupRoot.setAttribute('id', 'professorPopupRoot');
              professorPopupRoot.style.float = 'right';
              parentElem?.append(professorPopupRoot);

              // styling for RateMyProfessor Button
              rateMyProfessorRoot.setAttribute('id', 'rateMyProfessorRoot');
              rateMyProfessorRoot.style.flex = 'right';
              parentElem?.append(rateMyProfessorRoot);

              // Adds the UpvoteDownvote Button element
              parentElem?.prepend(broncoDirectUpvoteDownvoteButton(professor));

              createRoot(rateMyProfessorRoot).render(
                <RateMyProfessorButton professorName={professor} />
              );

              createRoot(professorPopupRoot).render(
                <ProfessorPopup professorName={professor} />
              );
            });
            searchResultsTrue = true;
          }
        } else searchResultsTrue = false;
      } else console.log('undefined');
    });
  }
}

injectButtons();
console.log(document.URL);
