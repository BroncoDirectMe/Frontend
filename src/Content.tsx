import React from 'react';
import { createRoot } from 'react-dom/client';
import UpvoteDownvoteButton from './UpvoteDownvoteButtons';

// Page iframe
const iframe = document.getElementById('ptifrmtgtframe') as HTMLIFrameElement;

iframe?.contentWindow?.addEventListener('message', () => {
  const insts: NodeListOf<HTMLElement> | undefined =
    iframe.contentWindow?.document.querySelectorAll('*[id^="MTG_INSTR$"]');
  // iterate through insts and create new instance of ProfessorPopup for each inst
  insts?.forEach((inst) => {
    //Root container
    const upvoteDownvoteRoot = document.createElement('div');
    const parentElem = inst.parentElement as HTMLDivElement;

    //Upvote and Downvote Buttons
    upvoteDownvoteRoot.setAttribute('id', 'upvoteDownvoteRoot');
    upvoteDownvoteRoot.style.float = 'left';
    upvoteDownvoteRoot.style.padding = '2%';

    parentElem?.prepend(upvoteDownvoteRoot);

    createRoot(upvoteDownvoteRoot).render(
      <UpvoteDownvoteButton professorName={inst.innerText} />
    );
  });
});
