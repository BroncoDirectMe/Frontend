import React from 'react';
import { createRoot } from 'react-dom/client';
import { UpvoteButton } from './UpvoteDownvoteButtons';
import { DownvoteButton } from './UpvoteDownvoteButtons';

//Page iframe
const iframe = document.getElementById('ptifrmtgtframe') as HTMLIFrameElement;

iframe?.contentWindow?.addEventListener('message', () => {
  const insts: NodeListOf<HTMLElement> | undefined =
    iframe.contentWindow?.document.querySelectorAll('*[id^="MTG_INSTR$"]');
  // iterate through insts and create new instance of ProfessorPopup for each inst
  insts?.forEach((inst) => {
    // append new root containers under inst.parent to retain original span element
    const upvoteRoot = document.createElement('div');
    const downvoteRoot = document.createElement('div');
    const parentElem = inst.parentElement as HTMLDivElement;

    //Upvote Button
    upvoteRoot.setAttribute('id', 'upvoteRoot');
    upvoteRoot.style.float = 'left: 0';
    parentElem?.append(upvoteRoot);

    createRoot(upvoteRoot).render(<UpvoteButton professorName={inst.innerText}/>);

    //Downvote Button
    downvoteRoot.setAttribute('id', 'downvoteRoot');
    downvoteRoot.style.float = 'left: 1';
    parentElem?.append(downvoteRoot);

    createRoot(downvoteRoot).render(<DownvoteButton professorName={inst.innerText}/>);
  });
});