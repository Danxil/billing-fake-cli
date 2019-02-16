import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import AdvCash from './AdvCash';

const Hp = ({ match }) => (
  <Route path={`${match.path}/adv-cash/:userId/:amount/:purpose`} exact component={AdvCash} />
);

export default compose(
  withRouter,
)(Hp);
