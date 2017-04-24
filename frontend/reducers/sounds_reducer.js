import { RECEIVE_SOUNDS, RECEIVE_SOUND } from '../actions/sound_actions';
import merge from 'lodash/merge';

const SoundsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SOUNDS:
      return action.sounds;
    case RECEIVE_SOUND:
      return {[action.sound.id]: action.sound};
    default:
      return state;
  }
};

export default SoundsReducer;
