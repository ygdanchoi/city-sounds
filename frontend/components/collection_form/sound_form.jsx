import React from 'react';
import { Link, hashHistory } from 'react-router';
import SoundFormItem from './sound_form_item';

class SoundForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const soundFormItems = this.props.audioUrls.map(
      (audioUrl, idx) => <SoundFormItem key={idx} audioUrl={audioUrl} />
    );
    return (
      <div>
        <p>sounds</p>
        <ul>
          { soundFormItems }
        </ul>
        <a>add sound</a>
      </div>
    );
  }
}

export default SoundForm;