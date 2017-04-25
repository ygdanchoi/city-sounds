import React from 'react';
import { Link, hashHistory } from 'react-router';

const SoundFormItem = (props) => {
  return (
    <li>
      <p>{ props.audioUrl }</p>
    </li>
  );
}

export default SoundFormItem;