import React from 'react';
import TableRedesign from './components/TableRedesign/TableRedesign';
import * as inject from './injection';
import isLoaded from './loadedCheck';

console.log('[BRONCODIRECTME] Content script loaded.');

void Promise.resolve(isLoaded()).then(() => {
  chrome.storage.local.onChanged.addListener((changes) => {
    if (changes?.toggleExtension.newValue === 'on') {
      inject.addinjection('SSR_CLSRCH_RSLT', injectTable);
      inject.enableInject();
    } else inject.closeInject();
  });
});

/**
 * Injects custom components into the BroncoDirect DOM
 */
function injectTable(): void {
  const iframeDoc = (
    document.getElementById('ptifrmtgtframe') as HTMLIFrameElement
  ).contentDocument;
  if (iframeDoc == null) return;
  const rootInjection: HTMLElement | null = iframeDoc.getElementById(
    'win0divDERIVED_CLSRCH_GROUP6'
  );
  const classRows: NodeListOf<HTMLElement> = iframeDoc.querySelectorAll(
    '*[data-for^="SSR_CLSRSLT_WRK_GROUPBOX2$"]'
  );
  if (rootInjection == null) return;
  inject.injectReplace(rootInjection, <TableRedesign courseHTML={classRows} />);
}
