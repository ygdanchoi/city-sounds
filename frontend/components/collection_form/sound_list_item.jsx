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
          <div className='collection-form-sound-tab-left'>
            <p>{ parseInt(props.idx) + 1 }</p>
          </div>
          <div className='collection-form-sound-tab-right'>
            <div className='collection-form-sound-tab-right-top'>
              <p>{ props.sound.title === '' ? 'Untitled Sound' : props.sound.title }</p>
              <a onClick={ props.handleDeleteSound }>
                <div>x</div>
              </a>
            </div>
            <div className='collection-form-sound-tab-right-bottom'>
              <p>{ props.sound.audioFile ? props.sound.audioFile.name : 'previously uploaded' }</p>
              <p>downloadable, free</p>
            </div>
          </div>
        </div>

      </li>
    );
  } else {
    return <li />;
  }
};

export default SoundListItem;
