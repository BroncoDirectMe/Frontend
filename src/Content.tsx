import React from 'react';
import { createRoot } from 'react-dom/client';
// import { ProfessorPopup } from './ProfessorPopup';
import TableRedesign from './components/TableRedesign';

// import UpvoteDownvoteButton from './UpvoteDownvoteButtons';

const observer = new MutationObserver(function (mutationList) {
  mutationList.forEach((mutation) => {
    // runs if data-subpage attribute in document.body changes
    if (mutation.attributeName === 'data-subpage') {
      const currPage = (mutation.target as HTMLElement).getAttribute('data-subpage');
      console.log('[BRONCODIRECT] Current Page:', currPage);

      // injection
      const iframeDoc = (document.getElementById('ptifrmtgtframe') as HTMLIFrameElement).contentDocument;

      injection(iframeDoc);
    }
  });
});

// injection
function injection(iframeDoc: Document | null): void {
  if (iframeDoc == null) return;
  const rootInjection: HTMLElement | null = iframeDoc.getElementById('win0divDERIVED_CLSRCH_GROUP6');
  const classRows: NodeListOf<HTMLElement> = iframeDoc.querySelectorAll('*[data-for^="SSR_CLSRSLT_WRK_GROUPBOX2$"]');
  if (rootInjection == null) return;
  createRoot(rootInjection).render(<TableRedesign courseHTML={classRows} />);
}

function pageLoadCheck(): boolean {
  // URL set on entire cpp portal so injection will work on add class page too
  const URL = 'https://cmsweb.cms.cpp.edu/psp/'; // /CPOMPRDM/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.CLASS_SEARCH.GBL?';
  if (!window.location.href.includes(URL)) return false;
  console.log('[BRONCODIRECT] Page Loaded');
  return true;
}

/**
 * Checks if extension is enabled in its settings
 * @returns {Promise<boolean>} true if extension is enabled, false otherwise
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

async function setupObserver(): Promise<void> {
  if (pageLoadCheck() && (await enabledCheck())) {
    observer.observe(document.body, { attributes: true });
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
setupObserver();
