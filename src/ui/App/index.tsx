import * as React from 'react';
import {
  Switch,
  Route,
  withRouter,
} from 'react-router-dom';

import Home from '~/ui/Routes/Home';
import Camera from '~/ui/Routes/Camera';
import Scoreboard from '~/ui/Routes/Scoreboard';
import Tool from '~/ui/Routes/Tool';
import Playground from '~ui/Routes/Playground';

const App = () => (
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route exact path="/tool">
      <Tool />
    </Route>
    <Route exact path="/camera">
      <Camera />
    </Route>
    <Route exact path="/scoreboard">
      <Scoreboard />
    </Route>
    <Route exact path="/playground">
      <Playground />
    </Route>
  </Switch>
);

export default withRouter(App);
