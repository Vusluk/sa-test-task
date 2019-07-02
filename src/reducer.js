import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { reducer as core } from './Core';
import { reducer as transcription } from './Transcription';

export default history => combineReducers({
  core,
  transcription,

  router: connectRouter(history),
});
