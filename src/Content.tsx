import React from 'react';
import { createRoot } from 'react-dom/client';
import ProfessorPopup from './ProfessorPopup';

const iframe = document.getElementById('ptifrmtgtframe') as HTMLIFrameElement;
let insts = iframe.contentWindow?.document.querySelectorAll(
  '*[id^="MTG_INSTR$"]'
);

// event listener on the iframe which fires on search
// since iframe will receive a post message of the search criteria
// however event will fire regardless if the search criteria is invalid and will remain on the page
iframe?.contentWindow?.addEventListener('message', () => {
  insts = iframe.contentWindow?.document.querySelectorAll(
    '*[id^="MTG_INSTR$"]'
  );
  console.log(insts);

  if (insts) {
    insts.forEach((inst) => {
      // not sure if its a bug but it seems like innerText is invalid but innerHTML works
      console.log(inst.innerHTML);
      // null is placeholder for the popup component

      // create a new root container under inst.parent to retain original span element
      const container = document.createElement('div');
      container.setAttribute('id', 'root');
      container.style.float = 'right';
      inst.parentElement?.append(container);

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      createRoot(inst.parentElement!.children[1]).render(
        <ProfessorPopup professor={inst.innerHTML} />
      );
    });
  }
});

console.log(document.URL);
