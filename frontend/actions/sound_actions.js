import * as APIUtil from '../util/sound_api_util';

export const RECEIVE_SOUNDS = 'RECEIVE_SOUNDS';
export const RECEIVE_SOUND = 'RECEIVE_SOUND';

export const receiveSounds = (sounds) => {
  return {
    type: RECEIVE_SOUNDS,
    sounds: sounds
  };
};

export const receiveSound = (sound) => {
  return {
    type: RECEIVE_SOUND,
    sound: sound
  };
};

export const fetchAllSounds = () => (dispatch) => {
  return APIUtil.fetchAllSounds().then(
    response => dispatch(receiveSounds(response))
  );
};

export const fetchCollectionSounds = (collectionId) => (dispatch) => {
  return APIUtil.fetchCollectionSounds(collectionId).then(
    response => dispatch(receiveSounds(response))
  );
};

export const fetchSound = (id) => (dispatch) => {
  return APIUtil.fetchSound(id).then(
    response => dispatch(receiveSound(response))
  );
};

export const deleteSound = (id) => (dispatch) => {
  return APIUtil.deleteSound(id).then(
    response => dispatch(receiveSound(response))
  );
};
