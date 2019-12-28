import React from "reactn";
import { useGlobal } from 'reactn';
import { style } from "typestyle";
import Game from "./Components/Game";
import Version from "./Components/Version";
import FpsDisplay from "./Components/FpsDisplay";
import GlobalState from "./GlobalState";

const App = () => {
  const [ global, setGlobal ] = useGlobal<GlobalState>();
  setGlobal({fps: 0, fullscreen: false});

  return (<React.Fragment>
            <Game />
            <FpsDisplay />
            <Version />
          </React.Fragment>
  );
};

export default App;
