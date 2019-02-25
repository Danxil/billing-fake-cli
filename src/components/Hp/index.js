import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import AdvCash from './AdvCash';

const Hp = ({ match }) => (<div>
  <Route path={`${match.path}/adv-cash/`} exact component={AdvCash} />
</div>);

export default compose(
  withRouter,
)(Hp);
