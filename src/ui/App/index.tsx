import * as React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";

import { hasDarkMode } from "../Services/helper";

import Home from "~/ui/Routes/Home";
import Camera from "~/ui/Routes/Camera";
import Scoreboard from "~/ui/Routes/Scoreboard";
import Tool from "~/ui/Routes/Tool";
import Playground from "~/ui/Routes/Playground";
import PreStream from "~/ui/Routes/PreStream";
import DET8 from "~/ui/Routes/DET8";
import Commentator from "~/ui/Routes/Commentator";
import BreakWithoutVideo from "~/ui/Routes/BreakWithoutVideo";

import CameraMaskImage from "~/ui/Routes/Camera/mask.png";

const App = () => {
  const [darkMode, setDarkMode] = React.useState(hasDarkMode());

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: darkMode ? "dark" : "light",
          primary: deepOrange,
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path="/">
          <Home setDarkMode={setDarkMode} />
        </Route>
        <Route exact path="/tool">
          <Tool setDarkMode={setDarkMode} />
        </Route>
        <Route exact path="/camera">
          <Camera maskImage={CameraMaskImage} />
        </Route>
        <Route exact path="/scoreboard">
          <Scoreboard />
        </Route>
        <Route exact path="/playground">
          <Playground />
        </Route>
        <Route exact path="/prestream">
          <PreStream />
        </Route>
        <Route exact path="/det8">
          <DET8 />
        </Route>
        <Route exact path="/commentator">
          <Commentator />
        </Route>
        <Route exact path="/break-without-video">
          <BreakWithoutVideo />
        </Route>
      </Switch>
    </ThemeProvider>
  );
};

export default withRouter(App);
