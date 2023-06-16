import {
  AuthenticationResult,
  Configuration,
  PublicClientApplication,
  RedirectRequest,
} from '@azure/msal-browser';
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Alert, IconButton, Collapse } from '@mui/material';

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
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
};
// localStorage persists after extension window has been closed

export const msalInstance: PublicClientApplication =
  new PublicClientApplication(msalConfig);

/**
 * Determines whether user has a CPP account
 * @param email String
 * @returns True if the email is valid. False otherwise.
 */
const validateEmail = (email: string | undefined): boolean =>
  email?.split('@')[1].includes('cpp.edu') ?? false;

/**
 * Launches Microsoft Authentication through Google Chrome Extension Authentication function (sample code from MSAL)
 * @param {} url (Internal) Authentication URL to navigate through
 * @returns AuthenticationResult object containing user information
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
      (responseUrl: string | undefined) => {
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
 * @param request RedirectRequest specifying the scope of the login (what information should be obtained)
 * @returns URL that actually redirects user to Microsoft page to input login credentials
 */
async function getLogoutUrl(request: RedirectRequest): Promise<string> {
  return await new Promise((resolve, reject) => {
    msalInstance
      .logoutRedirect({
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
 * Login Error element in the extension window using Material UI (MUI)
 * @returns Login Error element
 */
function LoginErrorElement(): JSX.Element {
  const [open, setOpen] = React.useState(true);

  return (
    <Collapse in={open}>
      <Alert className="error-alert"
        action={
          <IconButton id="action-button"
            aria-label="close"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon id="close-icon" />
          </IconButton>
        }
        variant="outlined"
        severity="error"
      >
        Error: Microsoft Account not associated with CPP.
      </Alert>
    </Collapse>
  );
}

/**
 * Microsoft Authentication logout function
 */
async function signOut(): Promise<void> {
  const signOutRequest: RedirectRequest = {
    scopes: ['user.read'],
    prompt: 'none',
  };
  const url: string = await getLogoutUrl(signOutRequest);
  await launchWebAuthFlow(url);
}

/**
 * Initiates Microsoft Authentication. Use this function to prompt users to login
 * @returns True if there's no issues with logging in with Microsoft Authentication.
 */
async function signIn(): Promise<boolean> {
  const signInRequest: RedirectRequest = {
    scopes: ['user.read'],
  };
  const url: string = await getLoginUrl(signInRequest);

  try {
    const result: AuthenticationResult | null = await launchWebAuthFlow(url);
    // Launches Google Chrome extension's Popup window where the user can login

    const accessToken: string | undefined = result?.accessToken;
    const userEmail: string | undefined = result?.account?.username;

    if (validateEmail(userEmail)) {
      await fetch('/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ accessToken }),
      });
      // POST request to the backend with endpoint /user

      return await new Promise((resolve) => resolve(true));
      // Empty promise to make guard clause work
    }

    if (userEmail === undefined) {
      sessionStorage.clear();
      return await new Promise((resolve) => resolve(false));
      // Guard clause when the user begins the login process but closes the authentication window
    }

    const appContainer = document.getElementById('errorElm') as HTMLElement;
    createRoot(appContainer).render(<LoginErrorElement />);

    await signOut();
    // Microsoft Authentication will force the user to sign out when the user does not have a CPP-associated account
    return await new Promise((resolve) => resolve(false));
  } catch {
    console.log('The login interaction failed.');
    sessionStorage.clear();
    return await new Promise((resolve) => resolve(false));
    // Clears session storage to allow user to open login popup in the same extension window
  }
}

/**
 * Sign in button component triggering OAuth pop up window prompting users to login with their Microsoft Account
 * @returns Sign in Button element
 */
export function MicrosoftOAuth(): JSX.Element {
  const [signedIn, changeSignInStatus] = useState(false);
  useEffect(() => {
    const activeAccount = msalInstance.getAllAccounts();
    if (activeAccount.length > 0) {
      msalInstance.setActiveAccount(activeAccount[0]);
      changeSignInStatus(true);
    }
  }, []);
  // Updates login status based on cached login information after component has loaded (runs on extension load)

  return (
    <Button id="auth-button"
      variant="contained"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={async () => {
        if (signedIn) {
          void (async () => await signOut())();
          changeSignInStatus(false);
        }

        changeSignInStatus(await signIn());
      }}
      size="large"
    >
      {!signedIn && 'Sign In'}
      {signedIn && 'Sign Out'}
      {/* Changes button text depending on whether the user has clicked the log in button */}
    </Button>
    // Onclick function is an IIFE function that allows async functions to run in global scope
  );
}
