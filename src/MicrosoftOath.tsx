import {
  AuthenticationResult,
  Configuration,
  PublicClientApplication,
  RedirectRequest,
} from '@azure/msal-browser';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/system';
import { App } from './App';

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
 * Creates Login Error element in the extension window using Material UI (MUI)
 */
function LoginErrorElement(): JSX.Element {
  const [open, setOpen] = React.useState(true);

  return (
    <Collapse in={open}>
      <Alert
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
        variant="outlined"
        severity="error"
      >
        Error: Microsoft Account not associated with CPP.
      </Alert>
    </Collapse>
  );
}

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
 */
async function signIn(): Promise<void> {
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

      return await new Promise((resolve) => resolve());
      // Empty promise to make guard clause work
    }

    if (userEmail === undefined) {
      sessionStorage.clear();
      return await new Promise((resolve) => resolve());
      // Guard clause when the user begins the login process but closes the authentication window
    }

    const appContainer = document.getElementById('app') as HTMLElement;
    createRoot(appContainer).render(
      <Box>
        <LoginErrorElement />
        <App />
      </Box>
    );

    await signOut();
    // Microsoft Authentication will force the user to sign out when the user does not have a CPP-associated account
  } catch {
    console.log('The login interaction failed.');
    sessionStorage.clear();
    // Clears session storage to allow user to open login popup in the same extension window
  }
}

/**
 * Creates Sign in Button element that triggers a pop up window prompting users to login with their Microsoft Account
 */
export function MicrosoftOAuth(): JSX.Element {
  return (
    <section>
      <button
        onClick={() => {
          void (async () => await signIn())();
        }}
      >
        Sign In
      </button>

      <button
        onClick={() => {
          void (async () => await signOut())();
        }}
      >
        Sign Out
      </button>
    </section>
    // Onclick function is an IIFE function that allows async functions to run in global scope
  );
}
