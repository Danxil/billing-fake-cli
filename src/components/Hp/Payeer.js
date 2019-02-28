import React from 'react';
import { withRouter } from 'react-router-dom';
import sha256 from 'sha256';
import md5 from 'md5';
import Rijndael from 'rijndael-js';
import { compose, withProps, withHandlers, lifecycle } from 'recompose';
import withMeta from '../../containers/withMeta';
import withOrderId from '../../containers/withOrderId';

const SHOP = 736562412;
const CURRENCY = 'USD';
const SECRET = 123;
const META_KEY = 123;

const Payeer = ({
  formRef,
  orderId,
  match: {
    params: { amount }
  },
  generateSign,
  encryptedMeta,
  encryptedDescription,
}) => (
  <form method="post" ref={formRef} action="https://payeer.com/merchant/">
    <input readOnly type="hidden" name="m_shop" value={SHOP} />
    <input readOnly type="hidden" name="m_orderid" value={orderId} />
    <input readOnly type="hidden" name="m_amount" value={parseFloat(amount).toFixed(2)} />
    <input readOnly type="hidden" name="m_curr" value={CURRENCY} />
    <input readOnly type="hidden" name="m_desc" value={encryptedDescription} />
    <input readOnly type="hidden" name="m_sign" value={generateSign()} />
    <input readOnly type="hidden" name="m_params" value={encryptedMeta} />
    <button>ok</button>
  </form>
);

export default compose(
  withRouter,
  withMeta,
  withOrderId,
  withProps(({
    meta,
    orderId,
    match: {
      params: { merchant }
    },
  }) => {
    const key = md5(`${META_KEY}${orderId}`);
    const rij = new Rijndael(key, 'ecb');
    console.log('JSON!!!!', { reference: { ...meta, merchant } });
    const encryptedMeta = Buffer.from(rij.encrypt(JSON.stringify({ reference: { ...meta, merchant } }), 256)).toString('base64');
    return {
      formRef: React.createRef(),
      encryptedDescription: Buffer.from(meta.comment || '').toString('base64'),
      encryptedMeta: encodeURIComponent(encryptedMeta),
    };
  }),
  withHandlers({
    generateSign: ({
      orderId,
      encryptedMeta,
      encryptedDescription,
      meta,
      match: {
        params: { amount }
      },
    }) => () => {
      const sign = sha256(`${SHOP}:${orderId}:${parseFloat(amount).toFixed(2)}:${CURRENCY}:${encryptedDescription}:${encryptedMeta}:${SECRET}`).toUpperCase();
      return sign;
    },
  }),
  lifecycle({
    componentDidMount() {
      // this.props.formRef.current.submit();
    }
  }),
)(Payeer);
