import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ link }) => (
  <div>
    <p>{`${link.description} - ${link.url}`}</p>
  </div>
);

Link.propTypes = {
  link: PropTypes.object.isRequired,
};

export default Link;
