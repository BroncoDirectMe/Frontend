import React from 'react';
import { inject, loadInject } from './injection';
import { ProfessorPopup } from './ProfessorPopup';
import isLoaded from './loadedCheck';

Promise.resolve(isLoaded).then(() =>
  loadInject(() => {
    const insts: NodeListOf<HTMLElement> | undefined = (
      document.getElementById('ptifrmtgtframe') as HTMLIFrameElement
    ).contentDocument?.querySelectorAll('*[id^="MTG_INSTR$"]');

    insts?.forEach((inst) => {
      inject(inst, <ProfessorPopup professorName={inst.innerText} />);
    });
  })
);
