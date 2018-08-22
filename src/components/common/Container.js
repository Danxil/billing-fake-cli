import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { compose, pure } from 'recompose';

import './Container.css'

const Container = (props) => (
  <div className={classNames('container', props.className)}>{props.children}</div>
);

export default compose(
  pure,
)(Container);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};
