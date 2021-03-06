/**
 *
 * ListTitle
 *
 */

import React from 'react';

import styles from './styles.scss';

function ListTitle({children}) {
  return (
    < div
  className = {styles.listTitle} >
    {children}
    < /div>
)

      }

ListTitle.defaultProps = {
  children: null,
};

ListTitle.propTypes = {
  children: PropTypes.node,
};

export default ListTitle;
