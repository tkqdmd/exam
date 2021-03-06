/**
 *
 * LeftMenuSection
 *
 */

import React from 'react';

import styles from './styles.scss';

function LeftMenuSection({children}) {
  return (
    < div
  className = {styles.leftMenuSection} >
    {children}
    < /div>
)

      }

LeftMenuSection.defaultProps = {
  children: null,
};

LeftMenuSection.propTypes = {
  children: PropTypes.node,
};

export default LeftMenuSection;
