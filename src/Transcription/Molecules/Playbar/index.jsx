import React from 'react';
import cn from 'classnames';
import s from './index.styl';

class Playbar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.isDrag = false;
  }

  timeCurrentChange(width, offset) {
    const timeCurrentNew = (offset * this.props.total) / width;
    this.props.onTimeChange(timeCurrentNew);
  }
  
  onMouseDown(e) {
    this.timeCurrentChange(e.currentTarget.clientWidth, e.clientX - e.currentTarget.getBoundingClientRect().left);
    this.isDrag = true;
  }

  onMouseMove(e) {
    if(this.isDrag) {
      this.timeCurrentChange(e.currentTarget.clientWidth, e.clientX - e.currentTarget.getBoundingClientRect().left);    
    }
  }

  onMouseLeave() {
    this.isDrag = false;
  }
  
  onMouseUp() {
    this.isDrag = false;
  }
  
  render() {
    const { className, total, loaded, current } = this.props;
    const playedPercent = total && current ? (+((current * 100) / total) || 0).toFixed() : 0;
    const loadedPercent = total && loaded ? (+((loaded * 100) / total) || 0).toFixed() : 0;
    return (
      <div className={cn(s.root, className)}>
        <div className={s.bar}
             onMouseDown={this.onMouseDown}
             onMouseUp={this.onMouseUp}
             onMouseMove={this.onMouseMove}
             onMouseLeave={this.onMouseLeave}
        >
          <div className={s.loaded} style={{ width: `${loadedPercent}%` }}/>
          <div className={s.played} style={{ width: `${playedPercent}%` }}/>
          <div className={s.point} style={{ left: `calc(${playedPercent}% - 5px)` }}/>
        </div>
      </div>
    );
  }
}

export { Playbar }
