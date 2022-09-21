import React, { ReactElement } from 'react';
import Button from './SettingsButton';

export function App(): ReactElement {
  return(
    <Button
      height = "100px"
      width = "100px"
      onClick={() => console.log("Click! :D")}
    ></Button>
  );
}

export default App;