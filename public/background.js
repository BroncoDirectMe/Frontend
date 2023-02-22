/* eslint-disable no-undef */

async function getData() {
  try {
    const data = await new Promise((resolve, reject) => {
      chrome.storage.local.get("userAuth", (result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(result.userAuth);
        }
      });
    });
    return data
  } catch (error) {
    console.error("Error retrieving data from storage:", error);
  }
}


chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  const auth = await getData();
  console.log("I am getting something from the background!")
  console.log(auth)

  await sendResponse('Request successful.');
});
