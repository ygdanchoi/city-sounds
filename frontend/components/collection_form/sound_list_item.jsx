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

const toMB = (bytes) => {
  return`${ Math.ceil(parseInt(bytes) * 10 / 1048576) / 10} MB`;
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
    console.log(props);
    return (
      <li className='collection-form-sound-list-item'>
        <div className='collection-form-sound-tab' onClick={ props.handleClickSoundTab(collectionFormSoundSubForm) }>
          <div className='collection-form-sound-tab-left'>
            <p className='collection-form-sound-tab-idx'>{ parseInt(props.idx) + 1 }</p>
          </div>
          <div className='collection-form-sound-tab-right'>
            <div className='collection-form-sound-tab-right-top'>
              <p className='collection-form-sound-tab-title'>{ props.sound.title === '' ? 'Untitled Sound' : props.sound.title }</p>
              <div className='collection-form-sound-delete' onClick={ props.handleDeleteSound }>
                <p>X</p>
              </div>
            </div>
            <div className='collection-form-sound-tab-right-bottom'>
              <p className='collection-form-sound-tab-file'>{ props.sound.audioFile ? `${props.sound.audioFile.name}, ${toMB(props.sound.audioFile.size)}` : 'previously uploaded file' }</p>
              <p className='collection-form-sound-tab-downloadable'>downloadable, free</p>
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
