window.onload = (event) => {
  if (document.URL.includes('https://cmsweb.cms.cpp.edu/')) {
    console.log('BroncoDirect Page Loaded');

    if (
      document.URL.includes(
        'https://cmsweb.cms.cpp.edu/psp/CPOMPRDM/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.CLASS_SEARCH.GBL?'
      )
    ) {
      const iframe = document.getElementById(
        'ptifrmtgtframe'
      ) as HTMLIFrameElement;
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
        if (insts?.length == 0) console.log('- Enter Search Criteria Page');
        else console.log('- Search Results Page');
      });
      // const iframe = document.getElementById(
      //   'ptifrmtgtframe'
      // ) as HTMLIFrameElement;
      // iframe?.contentWindow?.addEventListener('click', (event) => {
      //   console.log('something has been clicked');
      //   if ((event.target as HTMLElement).tagName == 'SPAN') {
      //     console.log('SEARCH BUTTON CLICKED');
      //   }
      // });
      // iframe?.contentWindow?.addEventListener('change', (event) => {
      //   console.log('something has been changed');
      //   if ((event.target as HTMLElement).tagName == 'H2')
      //     console.log(
      //       (event.target as HTMLElement).innerHTML,
      //       ' has been changed'
      //     );
      // });

      // identify an element to observe
      // const elementToObserve = document.querySelector('#ptifrmtgtframe');

      // // create a new instance of `MutationObserver` named `observer`,
      // // passing it a callback function
      // const observer = new MutationObserver(() => {
      //   console.log('callback that runs when observer is triggered');
      // });

      // // call `observe()` on that MutationObserver instance,
      // // passing it the element to observe, and the options object
      // if (elementToObserve != undefined) {
      //   observer.observe(elementToObserve, {
      //     subtree: true,
      //     childList: true,
      //     attributes: true,
      //     characterData: true,
      //   });
      //   console.log(elementToObserve);
      // } else console.log('element is undefined');
    }
  }
};
// function getCurrentPage(iframe: HTMLIFrameElement) {
//   var header = iframe.contentWindow?.document
//     .getElementsByClassName('gh-page-header-headings')[0]
//     .getElementsByTagName('h2');

//   if (header != undefined && header.length > 0) {
//     console.log(
//       'Current Bronco Direct Page: Class Search - ',
//       header[0].innerHTML
//     );
//   } else console.log('undefined');
// }
// if (
//   document.URL.includes(
//     'https://cmsweb.cms.cpp.edu/psp/CPOMPRDM/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.CLASS_SEARCH.GBL?'
//   )
// ) {
//   window.onload = (event) => {
//     const iframe = document.getElementById(
//       'ptifrmtgtframe'
//     ) as HTMLIFrameElement;

//     getCurrentPage(iframe);
//     var footers =
//       iframe.contentWindow?.document.getElementsByClassName('gh-footer-item');

//     if (footers != undefined) {
//       console.log(footers[1].innerHTML);

//       footers[1]?.addEventListener('click', function (event) {
//         // event.preventDefault();
//         console.log('button clicked');
//         console.log(event);
//         console.log(event.target);
//       });
//     }
//   };
// }

// --------------------------------------//

// console.log('jdafljsl');
// const iframe = document.getElementById('ptifrmtgtframe') as HTMLIFrameElement;
// var header = iframe.contentWindow?.document
//   .getElementsByClassName('gh-page-header-headings')[0]
//   .getElementsByTagName('h2');
// if (header != undefined && header.length > 0) {
//   console.log(
//     'Current Bronco Direct Page: Class Search - ',
//     header[0].innerHTML
//   );
// } else console.log('undefined');

// const frame = document.getElementById('ptifrmtarget');
// console.log(frame);
// if (frame != undefined) {
//   frame.addEventListener(
//     'click',
//     function (event) {
//       console.log(event.target, ' has been clicked');

//       window.onload = (event) => {
//         const iframe = document.getElementById(
//           'ptifrmtgtframe'
//         ) as HTMLIFrameElement;
//         var header = iframe.contentWindow?.document
//           .getElementsByClassName('gh-page-header-headings')[0]
//           .getElementsByTagName('h2');

//         if (header != undefined && header.length > 0) {
//           console.log(
//             'Current Bronco Direct Page: Class Search - ',
//             header[0].innerHTML
//           );
//         } else console.log('undefined');
//       };
//     },
//     true
//   );
// }

// function someListener(event: { target: any }) {
//   var element = event.target;
//   console.log(element);
//   if (element.tagName == 'SPAN') {
//     // && element.classList.contains('gh-footer-item')) {
//     console.log('A button CLICKED');
//   }
// }

// document.addEventListener('DOMContentLoaded',  ()=> {
//   alert("It's loaded!");
//   const buttonsUL = document
//     .getElementById('gh-footer')
//     ?.getElementsByTagName('ul');
//   if (buttonsUL != undefined) console.log(buttonsUL[0]);
//   const button = document.getElementsByClassName('gh-footer-item');
//   console.log('gh footer items: ', button.length);
// });
// if (document.readyState == 'complete') {
//   const buttonsUL = document
//     .getElementById('gh-footer')
//     ?.getElementsByTagName('ul');
//   if (buttonsUL != undefined) console.log(buttonsUL[0]);
//   const button = document.getElementsByClassName('gh-footer-item');
//   console.log('gh footer items: ', button.length);
//   if (button != undefined) {
//     button[0]?.addEventListener('click', (event) => {
//       event.preventDefault();
//       console.log('button clicked');
//       console.log(event);
//       console.log(event.target);
//     });
//   } else console.log('Could not find');
// } else {
//   document.onreadystatechange = function () {
//     if (document.readyState == 'complete') {
//       const buttonsUL = document
//         .getElementById('gh-footer')
//         ?.getElementsByTagName('ul');
//       if (buttonsUL != undefined) console.log(buttonsUL[0]);
//       const button = document.getElementsByClassName('gh-footer-item');
//       console.log('gh footer items: ', button.length);
//       if (button != undefined) {
//         button[0]?.addEventListener('click', (event) => {
//           event.preventDefault();
//           console.log('button clicked');
//           console.log(event);
//           console.log(event.target);
//         });
//       } else console.log('Could not find');
//     }
//   };
// }
// console.log('included');
// console.log('included');
// console.log('tf?');
// console.log(buttonsUL?.length);
// if (buttonsUL != undefined) {
//   console.log(buttonsUL[0]);
//   const buttons = buttonsUL[0].getElementsByTagName('li');
//   console.log(buttons?.length);
//   const buttonsA1 = buttons[0].getElementsByTagName('a');
//   const buttonsA2 = buttons[1].getElementsByTagName('a');
//   console.log(buttonsA1[0].innerHTML);
//   console.log(buttonsA1[1].innerHTML);
//   console.log('Did nothing print out?');
// } else console.log('could not find buttonsUL');
// (button[0] as HTMLElement).click();
// if(button[0].firstChild)

// console.log(element.firstChild);

// element?.contentWindow?.addEventListener('message', (e) => {
//   console.log(e);
// });
