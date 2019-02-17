import React from 'react';
import { withRouter } from 'react-router-dom';
import sha256 from 'sha256';
import { compose, withProps, withHandlers, lifecycle } from 'recompose';

const EMAIL = 'danxilggggaa@gmail.com';
const NAME = 'hp';
const CURRENCY = 'USD';
const SECRET = '13TKLM26';

const AdvCash = ({
  formRef,
  orderId,
  match: {
    params: { userId, amount, purpose }
  },
  generateSign
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
  <input readOnly type="hidden" name="ac_comments" value={`${userId}:${purpose}`} />
  <input readOnly type="hidden" name="user_id" value={userId} />
  <input readOnly type="hidden" name="purpose" value={purpose} />
</form>
);

export default compose(
  withRouter,
  withProps(() => ({
   formRef: React.createRef(),
   orderId: (new Date).getTime(),
 })),
 withHandlers({
   generateSign: ({
     orderId,
     match: {
       params: { userId, amount }
     }
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
