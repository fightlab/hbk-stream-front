import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import 'typeface-roboto';

import './index.css';

import App from '~/ui/App';

render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root'),
);
