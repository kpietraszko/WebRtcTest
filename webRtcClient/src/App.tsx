import React, { FC } from "react";
import { style } from "typestyle";
import Game from "./Components/Game";
import Version from "./Components/Version";

const appStyle = style({ color: "red" });

const App: FC = () => {
  return (
    <>
      <Game />
      <Version />
    </>
  );
};

export default App;
