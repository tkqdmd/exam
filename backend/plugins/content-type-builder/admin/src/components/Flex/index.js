/**
 *
 * Flex
 *
 */

import React from 'react';
import styles from './styles.scss';

function Flex({children}) {
  return (
    < div
  className = {styles.flex} >
    {children}
    < /div>
)

      }

Flex.defaultProps = {
  children: null,
};

Flex.propTypes = {
  children: PropTypes.node,
};

export default Flex;
