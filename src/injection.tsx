import React from 'react';
import { createRoot } from 'react-dom/client';
import { ProfessorPopup } from './ProfessorPopup';
// import UpvoteDownvoteButton from './UpvoteDownvoteButtons';

/**
 * Injects React component into DOM
 * @param injectCallback callback function of injection content
 */
export function loadInject(injectCallback: () => void) {
  const observer = new MutationObserver(function (mutationList) {
    mutationList.forEach((mutation) => {
      // runs if data-subpage attribute in document.body changes
      if (mutation.attributeName === 'data-subpage') {
        const currPage = (mutation.target as HTMLElement).getAttribute(
          'data-subpage'
        );
        console.log('[BRONCODIRECT] Current Page:', currPage);

        // injection
        injectCallback();
      }
    });
  });

  observer.observe(document.body, { attributes: true });
}
/**
 * @param targetElem element to inject into
 * @param children react code to inject
 * @returns
 */
export const inject = (targetElem: HTMLElement, children: React.ReactNode) => {
  if (targetElem === undefined) return;
  const containerRoot = targetElem.parentElement as HTMLDivElement;
  targetElem.style.display = 'none';
  createRoot(containerRoot).render(<>{children}</>);
};
