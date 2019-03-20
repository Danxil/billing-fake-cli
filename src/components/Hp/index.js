import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import AdvCash from './AdvCash';
import Payeer from './Payeer';
import CoinPayments from './CoinPayments';
import PerfectMoney from './PerfectMoney';

const Hp = ({ match }) => (<div>
  <Route path={`${match.path}/adv-cash/`} exact component={AdvCash} />
  <Route path={`${match.path}/payeer/`} exact component={Payeer} />
  <Route path={`${match.path}/coin-payments/`} exact component={CoinPayments} />
  <Route path={`${match.path}/perfect-money/`} exact component={PerfectMoney} />
</div>);

export default compose(
  withRouter,
)(Hp);
