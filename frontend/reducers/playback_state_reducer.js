import { RECEIVE_PLAYBACK_STATE } from '../actions/playback_state_actions';
import merge from 'lodash/merge';

const _defaultState = {
  playedYet: false,
  playing: false,
  playingSound: null,
  playingCollection: null,
  audioCurrentTime: 0,
  audioDuration: 0
};

const PlaybackStateReducer = (state = _defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PLAYBACK_STATE:
      return merge({}, state, action.playbackState);
    default:
      return state;
  }
}

export default PlaybackStateReducer;