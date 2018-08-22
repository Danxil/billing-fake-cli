import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';

import './PageTitle.css'

const Title = ({
  children,
}) => (
  <h1 className="page-title">{children}</h1>
);

export default compose(
  pure,
)(Title);

Title.propTypes = {
  children: PropTypes.node.isRequired,
};
