import React from 'react';
import { withRouter } from 'react-router-dom';
import sha256 from 'sha256';
import { compose, withProps, withHandlers, lifecycle } from 'recompose';
import withMeta from '../../containers/withMeta';
import withOrderId from '../../containers/withOrderId';

const CoinPayments = ({
  formRef,
  orderId,
  match: {
    params: { amount, merchant }
  },
  generateSign,
  meta,
}) => (
  <form action="https://perfectmoney.is/api/step1.asp" method="POST" ref={formRef}>
    <input readOnly type="hidden" name="PAYEE_ACCOUNT" value="U20229846" />
    <input readOnly type="hidden" name="PAYEE_NAME" value={meta.comment} />
    <input readOnly type="hidden" name="PAYMENT_ID" value={orderId} />
    <input readOnly type="hidden" name="PAYMENT_AMOUNT" value={amount} />
    <input readOnly type="hidden" name="PAYMENT_UNITS" value="USD" />
    <input readOnly type="hidden" name="STATUS_URL" value={`http://www.cases-billing.live/perfect-money/info/`} />
    <input readOnly type="hidden" name="PAYMENT_URL" value={`http://www.cases-billing.live/perfect-money/success/?merchant=${merchant}`} />
    <input readOnly type="hidden" name="PAYMENT_URL_METHOD" value="GET" />
    <input readOnly type="hidden" name="NOPAYMENT_URL" value="http://www.cases-billing.live/perfect-money/fail/" />
    <input readOnly type="hidden" name="NOPAYMENT_URL_METHOD" value="GET" />
    <input readOnly type="hidden" name="SUGGESTED_MEMO" value="-" />
    <input readOnly type="hidden" name="merchant" value={merchant} />
    {
      Object.entries(meta).map((item) => <input readOnly type="hidden" name={`custom_${item[0]}`} value={item[1]} />)
    }
    <input type="hidden" name="BAGGAGE_FIELDS" value="meta" />
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
