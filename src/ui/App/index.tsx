import * as React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import Home from '~/ui/Routes/Home';

export default function App() {
  return (
    <Switch>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
}
