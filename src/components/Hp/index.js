import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import AdvCash from './AdvCash';
import Payeer from './Payeer';

const Hp = ({ match }) => (<div>
  <Route path={`${match.path}/adv-cash/`} exact component={AdvCash} />
  <Route path={`${match.path}/payeer/`} exact component={Payeer} />

</div>);

export default compose(
  withRouter,
)(Hp);
