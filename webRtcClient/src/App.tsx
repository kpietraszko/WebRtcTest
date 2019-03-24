import React, { FC, createContext, useReducer } from "react";
import { style } from "typestyle";
import Game from "./Components/Game";
import Version from "./Components/Version";
import FpsDisplay from "./Components/FpsDisplay";
import GlobalStateHandler from "./Components/GlobalState";
import genericReducer from "./store/genericReducer";
import { FpsContext } from "./contexts";

const appStyle = style({ color: "red" });

const App: FC = () => {
  const [state, dispatch] = useReducer(genericReducer, { fps: 0 });
  return (
    <GlobalStateHandler dispatch={dispatch}>
      <Game />
      <FpsContext.Provider value={state.fps}>
        <FpsDisplay />
      </FpsContext.Provider>
      <Version />
    </GlobalStateHandler>
  );
};

export default App;
