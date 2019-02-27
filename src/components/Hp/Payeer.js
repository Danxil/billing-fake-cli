import React from 'react';
import { withRouter } from 'react-router-dom';
import sha256 from 'sha256';
import md5 from 'md5';
import Rijndael from 'rijndael-js';
import { compose, withProps, withHandlers, lifecycle } from 'recompose';
import withMeta from '../../containers/withMeta';

const SHOP = 736562412;
const CURRENCY = 'USD';
const SECRET = 123;
const META_KEY = 123;

const Payeer = ({
  formRef,
  orderId,
  match: {
    params: { amount, merchant }
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
    <input type="hidden" name="m_cipher_method" value="AES-256-ECB" />
    <input type="submit" name="m_process" value="send" />
  </form>
);

export default compose(
  withRouter,
  withMeta,
  withProps(({ meta }) => ({
    orderId: (new Date()).getTime(),
  })),
  withProps(({ meta, orderId }) => {
    const key = md5(`${META_KEY}${orderId}`);
    console.log(key);
    const rij = new Rijndael(key, 'ecb');
    const encryptedMeta = encodeURIComponent(Buffer.from(rij.encrypt(JSON.stringify(meta), 256)).toString('base64'));
    return {
      formRef: React.createRef(),
      encryptedDescription: Buffer.from(meta.comment).toString('base64'),
      encryptedMeta: encryptedMeta,
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
