import React, { FC } from "react";
import { style } from "typestyle";
import Game from "./Components/Game";

const appStyle = style({ color: "red" });

const App: FC = () => {
  return (
    <Game />
  );
};

export default App;
