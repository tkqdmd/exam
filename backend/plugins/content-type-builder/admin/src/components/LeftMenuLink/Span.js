import React from 'react';

const Span = ({children}) =>
<
span
id = "from-wrapper"
style = {
{
  '1rem', fontStyle
:
  'italic', marginRight
:
  '10px'
}
}>
{
  children
}
<
/span>;

Span.defaultProps = {
  children: null,
};

Span.propTypes = {
  children: PropTypes.node,
};

export default Span;
