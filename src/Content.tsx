import React from 'react';
import { createRoot } from 'react-dom/client';
import ProfessorPopup from './ProfessorPopup';

const iframe = document.getElementById('ptifrmtgtframe') as HTMLIFrameElement;

// event listener on the iframe which fires on search
// since iframe will receive a post message of the search criteria
// however event will fire regardless if the search criteria is invalid and will remain on the page
iframe?.contentWindow?.addEventListener('message', () => {
  const insts = iframe.contentWindow?.document.querySelectorAll(
    '*[id^="MTG_INSTR$"]'
  );
  // iterate through insts and create new instance of ProfessorPopup for each inst
  insts?.forEach((inst) => {
    // append a new root container under inst.parent to retain original span element
    const root = document.createElement('div');
    const parentElem = inst.parentElement as HTMLDivElement;

    // styling for the ProfessorPopup Button
    root.setAttribute('id', 'root');
    root.style.float = 'right';
    parentElem?.append(root);

    // innerHtml is used until I can figure out why innerText doesnt work
    createRoot(root).render(<ProfessorPopup professor={inst.innerHTML} />);
  });
});

console.log(document.URL);
