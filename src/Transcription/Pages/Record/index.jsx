import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import * as Templates from './Templates';

const mapState = (state, ownProps) => ({
  transcript: state.transcription.transcript,
  title: 'Пример звонка.wav',
  date: '21 мар 18:03:41',
  audioUrl: state.transcription.audioUrl,
  audioTimeCurrent: state.transcription.audioTimeCurrent,
});

const mapDispatch = (dispatch, ownProps) => ({
  actions: bindActionCreators(actions, dispatch)
});

class Record extends React.Component {
  componentDidMount() {
    this.props.actions.init();
  }

  render() {
    const { platform = 'desktop', ...props } = this.props;
    const Template = Templates[platform];
    return (<Template {...props} />);
  }
}

const Container = connect(
  mapState,
  mapDispatch,
)(Record);

export { Container }
