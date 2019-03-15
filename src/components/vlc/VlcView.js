/**
 * Created by Jason on 2018/2/9.
 */

import React from 'react';
import $ from 'jquery';
import styles from './vlcView.less';
import {API_PREFIX} from '../../utils/config';

const initCamera = (_MRL, width, id) => {
  const vlc = document.getElementById(id);
  if (!vlc) {
    return;
  }
  setTimeout(() => {
    try {
      vlc.playlist.stop();
    } catch (exception) {
            // 暂不处理
    }
    try {
      vlc.playlist.clear();
      vlc.playlist.add(_MRL);
      vlc.playlist.play();
      $(vlc).width(width - 1);
      $(vlc).height((width) * 9 / 16);
    } catch (exception) {
            // 暂不处理
            // initCamera();
    }
  }, 1000);
};

class VlcView extends React.Component {
  state = {
    width: 1250
  }
  componentDidMount() {
    const vlcContainer = document.getElementById('vlc_content');
    const computedStyle = window.getComputedStyle(vlcContainer, '');
    let width = computedStyle.width;
    width = parseInt(width.replace('px', '') - 0, 10);
        // const _MRL = 'rtsp://admin:cf123456@192.168.1.78';
    const _MRL = this.props.vlcSrc;
    this.setState({
      _MRL,
      width
    });
    initCamera(_MRL, width, `vlc_${this.props.id}`);
  }

  componentDidUpdate() {
    const vlcContainer = document.getElementById('vlc_content');
    const computedStyle = window.getComputedStyle(vlcContainer, '');
    let width = computedStyle.width;
    width = parseInt(width.replace('px', '') - 0, 10);
      // const _MRL = 'rtsp://admin:cf123456@192.168.1.78';
    const _MRL = this.props.vlcSrc;
    if (_MRL !== this.state._MRL) {
      this.setState({
        _MRL,
        width
      });
      initCamera(_MRL, width, `vlc_${this.props.id}`);
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    return this.props.vlcSrc !== nextProps.vlcSrc
  }


  render() {
    return (
      <div id="vlc_content" className={styles.vlcContent} >
        <div className={styles.videoStyle}>
          <object
            id={`vlc_${this.props.id}`} type="application/x-vlc-plugin">
            <div style={{width: '100%', height: `${(this.state.width) * 9 / 16}px`, background: 'black', textAlign: 'center'}}>
              <a className={styles.remind} href={`${API_PREFIX}/help/`}>系统未识别您的浏览器播放插件，请在帮助页面提示下进行操作。</a>
            </div>
            <param name="mrl" value={this.props.vlcSrc}/>
            <param name="volume" value="50" />
            <param name="wmode" value="Opaque" />
            <param name="autoplay" value="true" />
            <param name="play" value="true" />
            <param name="quality" value="high" />
            <param name="loop" value="false" />
            <param name="fullscreen" value="true" />
            <param name="Menu" value="false"/>
            <param name="toolbar" value="false" />
          </object>
        </div>
      </div>
    );
  }
}

export default VlcView;
