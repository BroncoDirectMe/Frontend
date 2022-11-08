import {
  AuthenticationResult,
  Configuration,
  PublicClientApplication,
  RedirectRequest,
} from '@azure/msal-browser';
import React from 'react';

const redirectUri =
  typeof chrome !== 'undefined' && chrome.identity
    ? chrome.identity.getRedirectURL()
    : `${window.location.origin}/index.html`;

const msalConfig: Configuration = {
  auth: {
    clientId: '2f9b4faf-5895-49db-ad35-40120df164f9',
    authority: 'https://login.microsoftonline.com/common',
    redirectUri,
    postLogoutRedirectUri: redirectUri,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);

/**
 * Launches Microsoft Authentication through Google Chrome Extension Authentication function (sample code from MSAL)
 * @param {} url (Internal) Authentication URL to navigate through
 */
async function launchWebAuthFlow(
  url: string
): Promise<AuthenticationResult | null> {
  return await new Promise((resolve, reject) => {
    chrome.identity.launchWebAuthFlow(
      {
        interactive: true,
        url,
      },
      (responseUrl) => {
        if (responseUrl?.includes('#')) {
          msalInstance
            .handleRedirectPromise(`#${responseUrl.split('#')[1]}`)
            .then(resolve)
            .catch(reject);
          // Parses chrome extension URL to obtain Authentication result object
        } else {
          // Logout calls
          resolve(null);
        }
      }
    );
  });
}

/**
 * Returns the user sign into the browser.
 */
// async function getSignedInUser(): Promise<chrome.identity.UserInfo | null> {
//   return await new Promise((resolve) => {
//     if (chrome?.identity) {
//       // Running in extension popup
//       chrome.identity.getProfileUserInfo((user) => {
//         if (user) {
//           resolve(user);
//         } else {
//           resolve(null);
//         }
//       });
//     } else {
//       // Running on localhost
//       resolve(null);
//     }
//   });
// }

/**
 *
 * @param request RedirectRequest specifying the scope of the login (what information should be obtained)
 * @returns URL that actually redirects user to Microsoft page to input login credentials
 */
async function getLoginUrl(request: RedirectRequest): Promise<string> {
  return await new Promise((resolve, reject) => {
    msalInstance
      .loginRedirect({
        ...request,
        onRedirectNavigate: (url) => {
          resolve(url);
          return false;
        },
      })
      .catch(reject);
  });
}

/**
 * Initiates Microsoft Authentication. Use this function to prompt users to login
 */
async function signIn(): Promise<void> {
  const signInRequest: RedirectRequest = {
    scopes: ['user.read'],
  };
  const url = await getLoginUrl(signInRequest);
  const result = await launchWebAuthFlow(url);

  const accessToken = result?.accessToken;
  const userEmail = result?.account?.username;
  console.log(accessToken);
  console.log(userEmail);
}

export function MicrosoftOAuth(): JSX.Element {
  return (
    <button
      onClick={() => {
        void (async () => await signIn())();
      }}
    >
      Sign In
    </button>
    // Onclick function is an IIFE function that allows async functions to run in global scope
  );
}
