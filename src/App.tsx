import React, { ReactElement } from 'react';
import { ToggleButton } from './ToggleButton';
import SearchBar from './SearchBar';
import { MsalProvider } from '@azure/msal-react';
import { msalInstance, MicrosoftOAuth } from './MicrosoftOath';

export function App(): ReactElement {
  return (
    <MsalProvider instance={msalInstance}>
      <div className="App">
        <ToggleButton />
        <SearchBar />
        <MicrosoftOAuth />
      </div>
    </MsalProvider>
  );
}
