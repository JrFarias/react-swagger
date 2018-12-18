import {  BrowserRouter as Router, Route } from 'react-router-dom';
import * as React from 'react';
import App from '../components/App';

const Routes = () => (
  <Router>
    <Route path="/" component={App} />
  </Router>
);

export default Routes;
