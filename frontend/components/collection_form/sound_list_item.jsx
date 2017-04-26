import React from 'react';
import { Link } from 'react-router';
import CollectionFormSoundSubForm from './collection_form_sound_sub_form';

const toHHMMSS = (seconds) => {
  let hh = Math.floor(seconds / 3600);
  let mm = Math.floor(seconds / 60) % 60;
  let ss = seconds % 60;
  if (ss < 10) {
    ss = "0" + ss;
  }
  if (hh === 0) {
    return `${mm}:${ss}`;
  } else {
    if (mm < 10) {
      mm = "0" + mm;
    }
    return `${hh.toString()}:${mm.toString()}:${ss.toString()}`;
  }
};

const SoundListItem = (props) => {
  if (props.sound) {
    const collectionFormSoundSubForm = (
      <CollectionFormSoundSubForm
        title={ props.sound.title }
        duration={ props.sound.duration }
        idx={ props.idx }
        handleChange={ props.handleChange } />
    );
    return (
      <li className='collection-form-sound-list-item'>
        <div className='collection-form-sound-tab' onClick={ props.handleClickSoundTab(collectionFormSoundSubForm) }>
          <p>{ props.idx + '. title: ' + (props.sound.title === '' ? 'Untitled Sound' : props.sound.title) }</p>
          <p>{ props.idx + '. duration: ' + toHHMMSS(props.sound.duration) }</p>
          <p>{ props.idx + '. audioUrl: ' + props.sound.audioUrl }</p>
          <p>{ props.idx + '. audioFile: ' + (props.sound.audioFile ? props.sound.audioFile.name : null) }</p>
          <a onClick={ props.handleDeleteSound }>X</a>
        </div>

      </li>
    );
  } else {
    return <li />;
  }
};

export default SoundListItem;
