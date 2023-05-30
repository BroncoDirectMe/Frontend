import React from 'react';
import { createRoot } from 'react-dom/client';
import { ProfessorPopup } from './ProfessorPopup';
// import UpvoteDownvoteButton from './UpvoteDownvoteButtons';

const observer = new MutationObserver(function (mutationList) {
  mutationList.forEach((mutation) => {
    // runs if data-subpage attribute in document.body changes
    if (mutation.attributeName === 'data-subpage') {
      const currPage = (mutation.target as HTMLElement).getAttribute(
        'data-subpage'
      );
      console.log('[BRONCODIRECT] Current Page:', currPage);

      // injection
      const insts: NodeListOf<HTMLElement> | undefined = (
        document.getElementById('ptifrmtgtframe') as HTMLIFrameElement
      ).contentDocument?.querySelectorAll('*[id^="MTG_INSTR$"]');
      injection(insts);
    }
  });
});

/**
 * Injects custom components into the BroncoDirect DOM
 * @param insts Professor instances on the page
 */
function injection(insts: NodeListOf<HTMLElement> | undefined): void {
  // iterate through insts and create new instance of ProfessorPopup & UpvoteDownvoteButton for each inst
  insts?.forEach((inst) => {
    // append new root containers under inst.parent to retain original span element
    // const upvoteDownvoteRoot = document.createElement('div');
    const parentElem = inst.parentElement as HTMLDivElement;
    inst.style.display = 'none';

    // Styling for the UpvoteDownvote Button
    // upvoteDownvoteRoot.setAttribute('id', 'upvoteDownvoteRoot');
    // upvoteDownvoteRoot.style.float = 'left';
    // upvoteDownvoteRoot.style.padding = '2%';
    // parentElem?.prepend(upvoteDownvoteRoot);

    // createRoot(upvoteDownvoteRoot).render(
    //   <UpvoteDownvoteButton professorName={inst.innerText} />
    // );

    createRoot(parentElem).render(
      <ProfessorPopup professorName={inst.innerText} />
    );
  });
}

/**
 * Checks if the BroncoDirect page is loaded
 * @returns Boolean returning if page is loaded
 */
function pageLoadCheck(): boolean {
  // URL set on entire cpp portal so injection will work on add class page too
  const URL = 'https://cmsweb.cms.cpp.edu/psp/'; // /CPOMPRDM/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.CLASS_SEARCH.GBL?';
  if (!window.location.href.includes(URL)) return false;
  console.log('[BRONCODIRECT] Page Loaded');
  return true;
}

/**
 * Checks if extension is enabled in its settings
 * @returns true if extension is enabled, false otherwise
 */
async function enabledCheck(): Promise<boolean> {
  return await new Promise((resolve) => {
    chrome.storage.local.get('toggleExtension', (result: any) => {
      if (!result.toggleExtension) {
        chrome.storage.local
          .set({ toggleExtension: 'on' })
          .catch((err: Error) => {
            console.error(err);
          });
        resolve(true);
      } else {
        resolve(result.toggleExtension === 'on');
      }
    });
  });
}

/**
 * Sets up observer to watch for DOM changes
 */
async function setupObserver(): Promise<void> {
  if (pageLoadCheck() && (await enabledCheck())) {
    observer.observe(document.body, { attributes: true });
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
setupObserver();
