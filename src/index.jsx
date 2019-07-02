import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore, { history } from './configureStore';
import Router from './router';

import './styles/index.styl';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} />
  </Provider>,
  document.getElementById('root')
);
