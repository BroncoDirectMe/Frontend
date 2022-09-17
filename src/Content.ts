import { createRoot } from 'react-dom/client';
//import professorPopup from'./ProfessorPopup';

const iframe = document.getElementById('ptifrmtgtframe') as HTMLIFrameElement;
var insts = iframe.contentWindow?.document.querySelectorAll(
  '*[id^="MTG_INSTR$"]'
);

//event listener on the iframe which fires on search
//since iframe will receive a post message of the search criteria
//however event will fire regardless if the search criteria is invalid and will remain on the page
iframe?.contentWindow?.addEventListener('message', (e) => {
  insts = iframe.contentWindow?.document.querySelectorAll(
    '*[id^="MTG_INSTR$"]'
  );
  console.log(insts);

  if (insts) {
    insts.forEach((inst) => {
      //not sure if its a bug but it seems like innerText is invalid but innerHTML works
      console.log(inst.innerHTML);
      //null is placeholder for the popup component
      createRoot(inst).render(null);
    });
  }
});

console.log(document.URL);
