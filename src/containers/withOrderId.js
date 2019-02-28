import React from 'react';
import { compose, withProps } from 'recompose';

export default (Comp) => compose(
  withProps(({
    match: {
      params: { merchant }
    },
  }) => {
    return { orderId: `${merchant}_${(new Date()).getTime()}` };
  })
)((props) => {
  return (<Comp {...props} />);
});
