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
    authority:
      'https://login.microsoftonline.com/164ba61e-39ec-4f5d-89ff-aa1f00a521b4',
    // authority URL generated with CPP's tenant ID from https://www.whatismytenantid.com/
    redirectUri,
    postLogoutRedirectUri: redirectUri,
  },
  cache: {
    cacheLocation: 'sessionStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);

/**
 * Launches Google Chrome Auth Web flow (sample code from MSAL)
 * @param {} url Url to navigate to.
 */
async function launchWebAuthFlow(url: string): Promise<void> {
  // return await new Promise((resolve, reject) => {
  //   chrome.identity.launchWebAuthFlow(
  //     {
  //       interactive: true,
  //       url,
  //     },
  //     (responseUrl) => {
  //       // Response urls includes a hash (login, acquire token calls)
  //       if (responseUrl?.includes('#')) {
  //         msalInstance
  //           .handleRedirectPromise(`#${responseUrl.split('#')[1]}`)
  //           .then(resolve)
  //           .catch(reject);
  //       } else {
  //         // Logout calls
  //         resolve(null);
  //       }
  //     }
  //   );
  // });
  console.log(chrome.identity);
  chrome.identity.launchWebAuthFlow(
    {
      interactive: true,
      url,
    },
    (responseUrl) => {
      console.log(responseUrl);
    }
  );
}

/**
 * Returns the user sign into the browser.
 */
async function getSignedInUser(): Promise<chrome.identity.UserInfo | null> {
  return await new Promise((resolve) => {
    if (chrome?.identity) {
      // Running in extension popup
      chrome.identity.getProfileUserInfo((user) => {
        if (user) {
          resolve(user);
        } else {
          resolve(null);
        }
      });
    } else {
      // Running on localhost
      resolve(null);
    }
  });
}

/**
 * Attempts to silent acquire an access token, falling back to interactive.
 */
async function acquireToken(
  request: RedirectRequest
): Promise<AuthenticationResult> {
  return await new Promise((resolve) => {
    msalInstance
      .acquireTokenSilent(request)
      .then(resolve)
      .catch(async (error): Promise<void> => {
        console.error(error);
        const acquireTokenUrl = await getAcquireTokenUrl(request);
        await launchWebAuthFlow(acquireTokenUrl);
      });
  });
}

/**
 * Generates an acquire token url
 */
async function getAcquireTokenUrl(request: RedirectRequest): Promise<string> {
  return await new Promise((resolve, reject) => {
    msalInstance
      .acquireTokenRedirect({
        ...request,
        onRedirectNavigate: (url) => {
          resolve(url);
          return false;
        },
      })
      .catch(reject);
  });
}

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

async function signIn(): Promise<void> {
  const signInRequest: RedirectRequest = {
    scopes: ['user.read'],
  };
  const url = await getLoginUrl(signInRequest);
  console.log(url);
  const result = await launchWebAuthFlow(url);
  console.log(result);

  // console.log(result?.account?.username);
  // const { accessToken } = await acquireToken({
  //   scopes: ['user.read'],
  //   account: msalInstance.getAllAccounts()[0],
  // });
  // console.log('Access token: ' + accessToken);
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
