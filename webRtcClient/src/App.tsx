import React, { FC, createContext, useReducer, useContext } from "react";
import { style } from "typestyle";
import Game from "./Components/Game";
import Version from "./Components/Version";
import FpsDisplay from "./Components/FpsDisplay";
import GlobalStateHandler from "./Components/GlobalState";
import genericReducer from "./store/genericReducer";

const App: FC = () => {
  const [state, dispatch] = useReducer(genericReducer, { fps: 0, fullscreen: false });
  console.log(fullscreen);
  return (
    <GlobalStateHandler dispatch={dispatch}>
          <Game />
          <FpsDisplay />
          <Version />
    </GlobalStateHandler>
  );
};

export default App;
