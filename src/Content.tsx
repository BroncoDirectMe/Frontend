import React from 'react';
import * as inject from './injection';
import { ProfessorPopup } from './ProfessorPopup';
import isLoaded from './loadedCheck';

console.log('[BRONCODIRECTME] Content script loaded.');

void Promise.resolve(isLoaded()).then(() => {
  chrome.storage.local.onChanged.addListener((changes) => {
    if (changes?.toggleExtension.newValue === 'on') {
      inject.addinjection('SSR_CLSRCH_RSLT', injectPopup);
      inject.enableInject();
    } else inject.closeInject();
  });
});

/**
 * Injects the professor popup into the professor name element.
 */
function injectPopup(): void {
  const insts: NodeListOf<HTMLElement> | undefined = (
    document.getElementById('ptifrmtgtframe') as HTMLIFrameElement
  ).contentDocument?.querySelectorAll('*[id^="MTG_INSTR$"]');

  insts?.forEach((inst) =>
    inject.injectReplace(
      inst,
      <ProfessorPopup professorName={inst.innerText} />
    )
  );
}
