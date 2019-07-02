import React from 'react';
import cn from 'classnames';
import s from './index.styl';

import { Atoms } from '../../../Core';

import { Playbar } from '../../Molecules';

const timeFormatSecondsToMinutes = (sec) => `${Math.floor((sec/60) % 60)}:${Math.floor(sec % 60)}`;
const AUDIO_TIME_UPDATE_INTERVAL = 100;

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canPlay: false,
      timeLoaded: 0,
      timeTotal: 0.00,
      timeTotalFormatted: '00:00',
    };
    this.playPause = this.playPause.bind(this);
    this.onAudioCanPlay = this.onAudioCanPlay.bind(this);
    this.onAudioMetaLoaded = this.onAudioMetaLoaded.bind(this);
    this.onAudioLoadProgress = this.onAudioLoadProgress.bind(this);
    this.onAudioLoaded = this.onAudioLoaded.bind(this);
    this.onAudioEnded = this.onAudioEnded.bind(this);
    this.onPlaybarTimeUpdate = this.onPlaybarTimeUpdate.bind(this);
    this.audio = React.createRef();
    this.interval = null;
    this.isPlay = false;
  }

  componentDidMount() {
    this.audioSourceCheck();
    this.audioListnersAdd();
  }
  
  componentDidUpdate() {
    this.audioSourceCheck();
  }

  componentWillUnmount() {
    this.audioListnersRemove();
  }
  
  audioListnersAdd() {
    const audio = this.audio.current;
    audio.addEventListener('canplay', this.onAudioCanPlay, false);
    audio.addEventListener('loadedmetadata', this.onAudioMetaLoaded, false);
    audio.addEventListener('progress', this.onAudioLoadProgress, false);
    audio.addEventListener('canplaythrough', this.onAudioLoaded, false);
    audio.addEventListener('ended', this.onAudioEnded, false);
  }

  audioListnersRemove() {
    const audio = this.audio.current;
    audio.removeEventListener('canplay', this.onAudioCanPlay, false);
    audio.removeEventListener('loadedmetadata', this.onAudioMetaLoaded, false);
    audio.removeEventListener('progress', this.onAudioLoadProgress, false);
    audio.removeEventListener('canplaythrough', this.onAudioLoaded, false);
    audio.removeEventListener('ended', this.onAudioEnded, false);
  }

  onAudioCanPlay() {
    this.setState({ canPlay: true });
  }
  
  onAudioMetaLoaded(e) {
    const timeTotalFormatted = timeFormatSecondsToMinutes(e.target.duration);
    this.setState({ timeTotal: e.target.duration, timeTotalFormatted });
  }
  
  onAudioLoadProgress(e) {
    if(e.target.buffered.length) this.setState({ timeLoaded: e.target.buffered.end(e.target.buffered.length-1) });
  }

  onAudioLoaded(e) {
    this.setState({ timeLoaded: e.target.duration });
  }
  
  onAudioEnded(e) {
    if(this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      this.setState({ isPlay: false });
      this.props.actions.audioTimeUpdate(e.target.currentTime);
    }
  }

  audioSourceCheck() {
    const audio = this.audio.current;
    if(this.props.url && !audio.src) {
      audio.src = this.props.url;
      audio.load();
    }
  }
  
  playPause() {
    const audio = this.audio.current;
    if(audio) {
      audio.paused ? this.play() : this.pause();
    }
  }

  play() {
    const audio = this.audio.current;
    this.interval = setInterval(() => this.props.actions.audioTimeUpdate(audio.currentTime), AUDIO_TIME_UPDATE_INTERVAL);
    this.setState({ isPlay: true });
    audio.play();
  }

  pause() {
    clearInterval(this.interval);
    this.interval = null;
    this.setState({ isPlay: false });
    this.audio.current.pause();
  }

  onPlaybarTimeUpdate(time) {
    if(!this.state.isPlay) {
      this.audio.current.currentTime = time;
      this.props.actions.audioTimeUpdate(time);
    }
  }
  
  render () {
    const { url, timeCurrent } = this.props;
    const { timeTotal, timeTotalFormatted, timeLoaded, canPlay, isPlay } = this.state;
    return (
      <div className={s.root}>
        <div className={cn(s.button, { [s.buttonDisable]: !canPlay, [s.buttonPause]: !isPlay })} onClick={this.playPause}>
          <Atoms.Icon className={s.buttonIcon} type={isPlay ? 'pause' : 'play'}/>
        </div>
        <Playbar className={s.playbar} current={timeCurrent} loaded={timeLoaded} total={timeTotal} onTimeChange={this.onPlaybarTimeUpdate}/>
        <div className={s.time}>{timeFormatSecondsToMinutes(timeCurrent)}/{timeTotalFormatted}</div>
        <audio ref={this.audio} className={s.player}/>
      </div>
    );
  }
}

export { Player }
