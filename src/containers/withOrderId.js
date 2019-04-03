import React from 'react';
import { compose, withProps } from 'recompose';

export default (Comp) => compose(
  withProps(({
    match: {
      params: { merchant, paymentSystem }
    },
  }) => {
    return { orderId: `${merchant}_${paymentSystem}_${(new Date()).getTime()}` };
  })
)((props) => {
  return (<Comp {...props} />);
});
