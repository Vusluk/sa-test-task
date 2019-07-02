import React from 'react';
import s from './index.styl';

import { Transcript, Player } from '../../../../Organisms';

const Desktop = ({ title, date, transcript, audioUrl, audioTimeCurrent, actions }) => (
  <div className={s.root}>
    <Transcript {...{ title, date, transcript, className: s.transcript, audioTimeCurrent }} />
    <Player url={audioUrl} timeCurrent={audioTimeCurrent} actions={actions}/>
  </div>
);

export { Desktop }
