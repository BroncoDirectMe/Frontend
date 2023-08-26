import { pageMapping } from './injection';

let currPage: string | null = null;
const observer = new MutationObserver(
  (mutationList: MutationRecord[]): void => {
    mutationList.forEach((mutation) => {
      // runs if data-subpage attribute in document.body changes
      if (mutation.attributeName === 'data-subpage') {
        currPage = (mutation.target as HTMLElement).getAttribute(
          'data-subpage'
        );
        console.log('[BRONCODIRECTME] Current Page:', currPage);

        const iframeDocument = (
          document.getElementById('ptifrmtgtframe') as HTMLIFrameElement
        ).contentDocument;
        if (iframeDocument) injection(iframeDocument);
      }
    });
  }
);

/**
 * Injects custom components into the BroncoDirect DOM
 * @param iframeDoc Professor instances on the page
 */
function injection(iframeDoc: Document): void {
  if (currPage) pageMapping[currPage](iframeDoc);
}

/**
 * Checks if the BroncoDirect page is loaded
 * @returns Boolean returning if page is loaded
 */
function pageLoadCheck(): boolean {
  // URL set on entire cpp portal so injection will work on add class page too
  const URL = 'https://cmsweb.cms.cpp.edu/psp/CPOMPRDM/'; // /CPOMPRDM/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.CLASS_SEARCH.GBL?';
  if (!window.location.href.includes(URL)) return false;
  console.log('[BRONCODIRECTME] Page Loaded');
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
