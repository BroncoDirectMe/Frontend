import React from 'react';
import { createRoot } from 'react-dom/client';

// key is page name, value is array of functions to run
let currPage: string | null = null;
let observerRunning = false;
const observer = new MutationObserver(observerCallback);
const injectionQueue: { [key: string]: Array<() => void> } = {};

function observerCallback(mutationList: MutationRecord[]): void {
  observerRunning = true;
  mutationList = mutationList.filter(
    (mutation) => mutation.attributeName === 'data-subpage'
  );

  mutationList.forEach((mutation) => {
    currPage = (mutation.target as HTMLElement).getAttribute('data-subpage');
    console.log('[BRONCODIRECT] Current Page:', currPage);

    console.log('[BRONCODIRECT]', injectionQueue);
    if (currPage && injectionQueue && currPage in injectionQueue) {
      while (injectionQueue[currPage].length > 0) {
        injectionQueue[currPage].pop()?.();
      }
    }
  });
}

export function enableInject(): void {
  if (observerRunning) return;
  observer.observe(document.body, { attributes: true });
  observerRunning = true;
}

export function closeInject(): void {
  observer.disconnect();
  observerRunning = false;
}

export function addinjection(page: string, injectCallback: () => void): void {
  injectionQueue[page] = [];
  injectionQueue[page].push(injectCallback);
}

export function injectReplace(
  targetElem: HTMLElement,
  children: React.ReactNode
): void {
  if (targetElem == null) return;
  const containerRoot = targetElem.parentElement;
  if (containerRoot == null) return;
  targetElem.style.display = 'none';
  createRoot(containerRoot).render(<>{children}</>);
}

export function getCurrentPage(): string | null {
  return currPage;
}
