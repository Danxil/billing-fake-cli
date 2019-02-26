import React from 'react';
import { withRouter } from 'react-router-dom';
import sha256 from 'sha256';
import { compose, withProps, withHandlers, lifecycle } from 'recompose';
import withMetaAndComment from '../../containers/withMetaAndComment';

const EMAIL = 'danxilggggaa@gmail.com';
const NAME = 'Billing';
const CURRENCY = 'USD';
const SECRET = '13TKLM26';

const AdvCash = ({
  formRef,
  orderId,
  metaQuery,
  match: {
    params: { amount, merchant }
  },
  generateSign,
  meta,
  comment,
}) => (
  <form method="post" ref={formRef} action="https://wallet.advcash.com/sci/">
    <input readOnly type="hidden" name="ac_account_email" value="danxilggggaa@gmail.com" />
    <input readOnly type="hidden" name="ac_sci_name" value={NAME} />
    <input readOnly type="hidden" name="ac_amount" value={amount} />
    <input readOnly type="hidden" name="ac_currency" value="USD" />
    <input readOnly type="hidden" name="ac_order_id" value={orderId} />
    <input readOnly type="hidden" name="ac_sign" value={generateSign()} />

    <input readOnly type="hidden" name="ac_success_url" value="http://www.cases-billing.live/hp/adv-cash/success/" />
    <input readOnly type="hidden" name="ac_success_url_method" value="POST" />
    <input readOnly type="hidden" name="ac_fail_url" value="http://www.cases-billing.live/hp/adv-cash/fail" />
    <input readOnly type="hidden" name="ac_fail_url_method" value="POST" />
    <input readOnly type="hidden" name="ac_status_url" value="http://www.cases-billing.live/hp/adv-cash/info" />
    <input readOnly type="hidden" name="ac_status_url_method" value="POST" />
    <input readOnly type="hidden" name="merchant" value={merchant} />
    <input readOnly type="hidden" name="ac_comments" value={comment} />
    <input readOnly type="hidden" name="meta" value={meta} />
  </form>
);

export default compose(
  withRouter,
  withMetaAndComment,
  withProps(() => {
    return {
      formRef: React.createRef(),
      orderId: (new Date).getTime(),
    };
  }),
  withHandlers({
    generateSign: ({
      orderId,
      match: {
        params: { amount }
      },
    }) => () => {
      return sha256(`${EMAIL}:${NAME}:${amount}:${CURRENCY}:${SECRET}:${orderId}`);
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.formRef.current.submit();
    }
  }),
)(AdvCash);
