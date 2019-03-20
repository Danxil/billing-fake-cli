import React from 'react';
import { withRouter } from 'react-router-dom';
import sha256 from 'sha256';
import { compose, withProps, withHandlers, lifecycle } from 'recompose';
import withMeta from '../../containers/withMeta';
import withOrderId from '../../containers/withOrderId';

const EMAIL = 'danxilggggaa@gmail.com';
const NAME = 'Billing';
const CURRENCY = 'USD';
const SECRET = '13TKLM26';

const CoinPayments = ({
  formRef,
  orderId,
  match: {
    params: { amount, merchant }
  },
  generateSign,
  meta,
}) => (
  <form action="https://www.coinpayments.net/index.php" method="post" ref={formRef}>
  	<input readOnly type="hidden" name="cmd" value="_pay_simple">
  	<input readOnly type="hidden" name="reset" value="1">
  	<input readOnly type="hidden" name="merchant" value="ec994ee517bc549a0b9e066c0c54af23">
  	<input readOnly type="hidden" name="currency" value="USDT">
  	<input readOnly type="hidden" name="amountf" value={amount}>
  	<input readOnly type="hidden" name="item_name" value={meta.comment}>
  	<input readOnly type="hidden" name="invoice" value={orderId}>
  	<input readOnly type="hidden" name="custom" value={JSON.stringify(meta)}>
  	<input readOnly type="hidden" name="ipn_url" value="http://www.cases-billing.live/coin-payments/info/">
  	<input readOnly type="hidden" name="success_url" value="http://www.cases-billing.live/coin-payments/success/">
  </form>
);

export default compose(
  withRouter,
  withMeta,
  withOrderId,
  withProps(() => {
    return {
      formRef: React.createRef(),
    };
  }),
  lifecycle({
    componentDidMount() {
      this.props.formRef.current.submit();
    }
  }),
)(CoinPayments);
