/* eslint-disable no-undef */

/**
 * Handles uploading professor rating client-side to server-side with a GET request
 * @param professor Professor Name
 * @param voteType Upvote (true)  Downvote (false)
 * @param token Microsoft Auth Token
 */
async function uploadProfRating(professor, voteType, token) {
  await fetch('https://api.cppbroncodirect.me/vote', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ professor, voteType, token }),
  });
}

/**
 * Gets Microsoft Auth Token from Chrome Storage
 * @returns Microsoft Auth Token
 */
async function getToken() {
  try {
    const data = await new Promise((resolve, reject) => {
      chrome.storage.local.get('userAuth', (result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(result.userAuth);
        }
      });
    });
    return data;
  } catch (error) {
    console.error('Error retrieving data from storage:', error);
  }
}

chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  const authToken = await getToken();
  await uploadProfRating(request.professor, request.vote, authToken);

  await sendResponse('Request successful.');
});
