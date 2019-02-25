import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from '../Landing';
import Hp from '../Hp';

const App = () => (
  <Router>
    <Fragment>
      <Route exact path="/" component={Landing} />
      <Route path="/hp/:amount" component={Hp} />
    </Fragment>
  </Router>
);

export default App;
