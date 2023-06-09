import React from 'react';
import { createRoot } from 'react-dom/client';

let currPage: string | null = null;
let observerRunning = false;
const observer = new MutationObserver(observerCallback);
// key is page name, value is array of functions to run
const injectionQueue: { [key: string]: Array<() => void> } = {};

/**
 * Adds a function to the injection queue
 * @param page - page to inject into
 * @param injectCallback - function to run when page is loaded
 */
export function addinjection(page: string, injectCallback: () => void): void {
  injectionQueue[page] = [];
  injectionQueue[page].push(injectCallback);
}

/**
 * Enables injection of components into the page
 */
export function enableInject(): void {
  console.log('[BRONCODIRECTME] Injection loaded.');
  if (observerRunning) return;
  observer.observe(document.body, { attributes: true });
  observerRunning = true;
}

/**
 * Disables injection of components into the page
 */
export function closeInject(): void {
  console.log('[BRONCODIRECTME] Injection closed.');
  observer.disconnect();
  observerRunning = false;
}

/**
 * Gets a target HTML Element's parent and replaces children with components
 * @param targetElem target HTML Element
 * @param children React components to replace targetElem's children
 */
export function injectReplace(
  targetElem: HTMLElement,
  children: React.ReactNode | React.ReactNode[]
): void {
  if (targetElem == null) return;
  const containerRoot = targetElem.parentElement;
  if (containerRoot == null) return;
  targetElem.style.display = 'none';
  createRoot(containerRoot).render(<>{children}</>);
}

/**
 * Returns the current page
 * @returns current page
 */
export function getCurrentPage(): string | null {
  return currPage;
}

/**
 * Callback for the MutationObserver
 * @param mutationList - list of mutations
 */
function observerCallback(mutationList: MutationRecord[]): void {
  observerRunning = true;
  mutationList = mutationList.filter(
    (mutation) => mutation.attributeName === 'data-subpage'
  );

  mutationList.forEach((mutation) => {
    currPage = (mutation.target as HTMLElement).getAttribute('data-subpage');
    console.log('[BRONCODIRECT] Current Page:', currPage);

    // console.log('[BRONCODIRECT]', injectionQueue);
    if (currPage && injectionQueue && currPage in injectionQueue) {
      while (injectionQueue[currPage].length > 0) {
        injectionQueue[currPage].pop()?.();
      }
    }
  });
}
