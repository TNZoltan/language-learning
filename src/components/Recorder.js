import { Microphone, StopFill } from 'grommet-icons';
import React, { Component } from 'react';
import styles from './Recorder.module.scss';

const audioType = 'audio/*';

export const emptyAudio = {
  url: null,
  blob: null,
  chunks: null,
  duration: {
    h: 0,
    m: 0,
    s: 0,
  }
}

class Recorder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: {},
      miliseconds: 0,
      recording: false,
      medianotFound: false,
      audios: [],
      audioBlob: null,
      stream: null
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  handleAudioPause(e) {
    e.preventDefault();
    clearInterval(this.timer);
  }

  handleAudioStart(e) {
    e.preventDefault();
    this.startTimer();
  }

  startTimer() {
    // if (this.timer === 0 && this.state.seconds > 0) {
    this.timer = setInterval(this.countDown, 100);
    // }
  }

  countDown() {
    if (this.state.time.s === 10) {
      this.stopRecording({})
    }
    this.setState(prevState => {
      const miliseconds = prevState.miliseconds + 100;
      return ({ time: this.milisecondsToTime(miliseconds), miliseconds: miliseconds });
    });

    this.props.handleCountDown(this.state.time);
  }

  milisecondsToTime(milisecs) {

    let secs = milisecs / 1000;
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);


    let obj = {
      h: hours,
      m: minutes,
      s: seconds,
      ms: milisecs
    };
    return obj;
  }

  async initRecorder() {
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;
    if (navigator.mediaDevices) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (this.props.mimeTypeToUseWhenRecording) {
        this.mediaRecorder = new MediaRecorder(stream, { mimeType: this.props.mimeTypeToUseWhenRecording });
      } else {
        this.mediaRecorder = new MediaRecorder(stream);
      }
      this.chunks = [];
      this.mediaRecorder.ondataavailable = e => {
        if (e.data && e.data.size > 0) {
          this.chunks.push(e.data);
        }
      };

      this.stream = stream;
    } else {
      this.setState({ medianotFound: true });
    }
  }

  async startRecording() {
    this.handleReset()
    // wipe old data chunks
    this.chunks = [];

    await this.initRecorder();
    // start recorder with 10ms buffer
    this.mediaRecorder.start(10);
    this.startTimer();
    // say that we're recording
    this.setState({ recording: true });
  }

  stopRecording() {
    clearInterval(this.timer);
    this.setState({ time: {} });

    if (this.stream.getAudioTracks) {
      const tracks = this.stream.getAudioTracks();
      tracks.forEach((track) => {
        track.stop();
      });
    } 

    this.mediaRecorder.stop();

    // say that we're not recording
    this.setState({ recording: false });
    // save the video to memory
    this.saveAudio();
  }

  handleReset() {
    if (this.state.recording) {
      this.stopRecording();
    }
    this.setState({
      time: {},
      miliseconds: 0,
      recording: false,
      medianotFound: false,
      audios: [],
      audioBlob: null
    }, () => {
      this.props.handleReset(this.state);
    });

  }

  saveAudio() {
    // convert saved chunks to blob
    const blob = new Blob(this.chunks, { type: audioType });
    // generate video url from blob
    const audioURL = window.URL.createObjectURL(blob);
    // append videoURL to list of saved videos for rendering
    const audios = [audioURL];
    this.setState({ audios, audioBlob: blob });
    this.props.handleAudioStop({
      url: audioURL,
      blob: blob,
      chunks: this.chunks,
      duration: this.state.time
    });
  }

  render() {
    const { recording, audios, time, medianotFound, pauseRecord } = this.state;
    const { title, audioURL, disableFullUI } = this.props;

    if (disableFullUI) { return null; }

    return (
      <div className={styles.recorder}>
        <div className={styles.playZone}>
          {
            audios[0] ?
              (
                <audio controls>
                  <source src={audios[0]} type='audio/ogg' />
                  <source src={audios[0]} type='audio/mpeg' />
                </audio>
              ) :
              null
          }
        </div>
        <div className={styles.clockZone}>
          <span className={styles.secs}>
            {
              time.s !== undefined ? `00:0${10 - time.s}` : '00:10'
              // time.s !== undefined ? `${time.s <= 9 ? '0' + time.s : time.s}` : '00'
            }
          </span>
        </div>
        <div className={styles.recordZone}>
          {
            !recording ?
              (
                <div className={styles.recordButton}>
                  <Microphone size="large" color="white" onClick={() => this.startRecording()} />
                </div>
              ) :
              (
                <div className={styles.recordButton}>
                  <StopFill size="large" color="white" onClick={() => this.stopRecording()} />
                </div>
              )
          }
        </div>
      </div>
    );
  }
}

export default Recorder;

Recorder.defaultProps = {
  hideHeader: false,
  mimeTypeToUseWhenRecording: null,
  handleCountDown: (data) => { },
}
