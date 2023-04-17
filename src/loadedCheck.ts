/**
 * Checks if extension is enabled in its settings
 * @returns {Promise<boolean>} true if extension is enabled, false otherwise
 */
async function enabledCheck(): Promise<boolean> {
  return await new Promise((resolve) => {
    chrome.storage.local.get('toggleExtension', (result: any) => {
      if (!result.toggleExtension) {
        chrome.storage.local
          .set({ toggleExtension: 'on' })
          .catch((err: Error) => {
            console.error(err);
          });
        resolve(true);
      } else {
        resolve(result.toggleExtension === 'on');
      }
    });
  });
}
/**
 * Checks if on correct page
 * @returns {boolean} true if page is correct, false otherwise
 */
function pageUrlCheck(): boolean {
  // URL set on entire cpp portal so injection will work on add class page too
  const URL = 'https://cmsweb.cms.cpp.edu/psp/'; // /CPOMPRDM/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.CLASS_SEARCH.GBL?';
  if (!window.location.href.includes(URL)) return false;
  console.log('[BRONCODIRECT] Page Loaded');
  return true;
}
/**
 *
 * @returns {Promise<boolean>} true if extension is enabled and on correct page, false otherwise
 */
async function isLoaded(): Promise<boolean> {
  return pageUrlCheck() && (await enabledCheck());
}
export default isLoaded;
