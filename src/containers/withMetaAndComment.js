import React from 'react';
import { compose, withProps } from 'recompose';
import queryString from 'query-string'

export default (Comp) => compose(
  withProps(({ location: { search } }) => {
    const query = queryString.parse(search);
    return {
      comment: query.comment,
      meta: query.meta,
    };
  })
)((props) => {
  return (<Comp {...props} />);
});
