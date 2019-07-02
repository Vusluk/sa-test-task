import * as api from '../api';
import { RECORD_LOADED, AUDIO_TIME_UPDATE } from './actionTypes';

export const init = () => dispatch => {
  dispatch(recordLoad());
};

export const recordLoad = () => dispatch => {
  api.get('/transcript.json').then(res => dispatch(recordLoaded(res, '/audio.wav')));
};

export const recordLoaded = (transcript = [], audioUrl) => ({
  type: RECORD_LOADED,
  transcript,
  audioUrl,
});

export const audioTimeUpdate = time => ({
  type: AUDIO_TIME_UPDATE,
  time,
});
