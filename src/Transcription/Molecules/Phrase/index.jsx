import React from 'react';
import cn from 'classnames';
import s from './index.styl';

import { Avatar } from '../../Atoms';

const highlightCheck = (current, start, end) => start <= current && current <= end; 

const Phrase = ({ className, phrase, timeStart, words, audioTimeCurrent }) => (
  <div className={cn(s.root, className)}>
    <Avatar className={s.avatar} />
    <div>
      <div className={s.timeStart}>{timeStart}</div>
      <div className={s.words}>
        {words.map((word, i) => (
          <React.Fragment key={`${timeStart}_${i}`}>
            <span className={cn(s.word, {[s.highlight]: word.timeStart <= audioTimeCurrent && audioTimeCurrent <= word.timeEnd})}>
              {word.word}
            </span>
            <span> </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  </div>
);

export { Phrase }

