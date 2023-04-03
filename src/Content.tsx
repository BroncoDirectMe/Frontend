import React from 'react';
import { createRoot } from 'react-dom/client';

const observer = new MutationObserver(function (mutationList) {
  mutationList.forEach((mutation) => {
    // runs if data-subpage attribute in document.body changes
    if (mutation.attributeName === 'data-subpage') {
      const currPage = (mutation.target as HTMLElement).getAttribute(
        'data-subpage'
      );
      console.log('[BRONCODIRECT] Current Page:', currPage);

      // example injection
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const insts = (
        document.getElementById('ptifrmtgtframe') as HTMLIFrameElement
      ).contentDocument!.querySelectorAll('*[id^="MTG_INSTR$"]');
      testInject(insts);
    }
  });
});

// example injection
function testInject(insts: NodeListOf<Element>): void {
  insts?.forEach((inst) => {
    const TESTINJECTION = document.createElement('div');
    const parentElem = inst.parentElement as HTMLDivElement;
    parentElem?.append(TESTINJECTION);
    createRoot(TESTINJECTION).render(
      <>
        <div>TEST INJECTION</div>
      </>
    );
  });
}

function pageLoadCheck(): boolean {
  // URL set on entire cpp portal so injection will work on add class page too
  const URL = 'https://cmsweb.cms.cpp.edu/psp/'; // /CPOMPRDM/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.CLASS_SEARCH.GBL?';
  if (!window.location.href.includes(URL)) return false;
  console.log('[BRONCODIRECT] Page Loaded');
  return true;
}

if (pageLoadCheck()) {
  observer.observe(document.body, { attributes: true });
}
console.log(document.URL);
