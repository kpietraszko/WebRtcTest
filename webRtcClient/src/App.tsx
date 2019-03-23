import React, { FC, createContext, useReducer } from "react";
import { style } from "typestyle";
import Game from "./Components/Game";
import Version from "./Components/Version";
import FpsDisplay from "./Components/FpsDisplay";
import GlobalStateHandler from "./Components/GlobalState";

const appStyle = style({ color: "red" });

const App: FC = () => {
  return (
    <GlobalStateHandler>
      <Game />
      <FpsDisplay />
      <Version />
    </GlobalStateHandler>
  );
};

export default App;
