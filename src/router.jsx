import React from 'react';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';

import { Layouts } from './Core';
import { Pages as Transcription } from './Transcription';

export default ({ history }) => (
  <ConnectedRouter history={history}>
    <Layouts.Main>
      <Switch>
        <Route path="/" exact component={Transcription.Record} />
      </Switch>
    </Layouts.Main>
  </ConnectedRouter>
);
