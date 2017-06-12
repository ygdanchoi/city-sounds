export const RECEIVE_PLAYBACK_STATE = 'RECEIVE_PLAYBACK_STATE';

export const receivePlaybackState = (playbackState) => {
  return {
    type: RECEIVE_PLAYBACK_STATE,
    playbackState: playbackState
  }
}