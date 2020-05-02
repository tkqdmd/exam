/**
 *
 * Video
 *
 */

import React from 'react';

/* eslint-disable jsx-a11y/media-has-caption */
const Video = props => {
  const {height, src, width} = props.contentState.getEntity(props.entityKey).getData();

  return (
    < video
  height = {height}
  width = {width}
  style = {
  {
    '100%'
  }
}
  controls >
  < source
  src = {src}
  />
  < /video>
)

    };

Video.propTypes = {
  contentState: PropTypes.object.isRequired,
  entityKey: PropTypes.string.isRequired,
};

export default Video;
