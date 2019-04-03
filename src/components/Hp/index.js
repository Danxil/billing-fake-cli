import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import AdvCash from './AdvCash';
import Payeer from './Payeer';
import CoinPayments from './CoinPayments';
import PerfectMoney from './PerfectMoney';

const Hp = ({ match }) => (<div>
  <Route path={`${match.path}/:paymentSystem(adv\-cash)/`} exact component={AdvCash} />
  <Route path={`${match.path}/:paymentSystem(payeer)/`} exact component={Payeer} />
  <Route path={`${match.path}/:paymentSystem(coin\-payments)/`} exact component={CoinPayments} />
  <Route path={`${match.path}/:paymentSystem(perfect\-money)/`} exact component={PerfectMoney} />
</div>);

export default compose(
  withRouter,
)(Hp);
