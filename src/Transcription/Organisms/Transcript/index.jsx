import React from 'react';
import cn from 'classnames';
import s from './index.styl';

import { Phrase } from '../../Molecules';
 
const Transcript = ({ className, title = '', date = '', transcript = [], audioTimeCurrent }) => (
  <section className={cn(s.root, className)}>
    <h1 className={s.title}>{title}</h1>
    <div className={s.date}>{date}</div>
    <div className={s.hr}></div>
    {transcript.map((phrase, i) => (<Phrase audioTimeCurrent={audioTimeCurrent} className={s.phrase} key={`${title}_PHRASE_${i}`} {...phrase}/>))}
  </section>
);

export { Transcript }
