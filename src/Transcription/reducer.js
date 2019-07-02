import { RECORD_LOADED, AUDIO_TIME_UPDATE } from './actionTypes';

const initialState = {
  transcript: [],
  audioUrl: '',
  audioTimeCurrent: 0.0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RECORD_LOADED:
      return {
        ...state,
        transcript: action.transcript,
        audioUrl: action.audioUrl,
      };

    case AUDIO_TIME_UPDATE:
      return {
        ...state,
        audioTimeCurrent: action.time,
      };

    default:
      return state;
  }
};
