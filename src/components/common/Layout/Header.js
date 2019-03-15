/**
 * Created by Jason on 2018/1/11.
 */

import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import axios from 'axios';

import { Link} from 'dva/router';
import styles from './header.less';
import {API_PREFIX} from '../../../utils/config';

class Header extends React.Component {
  state = {
    user: true
  }
    loginOut = () => {
      // axios.get('http://192.168.1.84:8090/cfMosqueManage/logout.do')
      // .then(res => {
      // });
      window.location.href = `${API_PREFIX}`
    }
  render() {
    return (
      <div className={styles.header}>
        <div className={styles.state}>
          <div className={styles.logo} />
          {/*<div className={styles.registration} style={{display: this.props.navigation.stateShow ? 'inline-block' : 'none'}}>本寺已注册人数为：*/}
              {/*<span>66</span>*/}
          {/*</div>*/}
          <span className={styles.flowState} style={{display: this.props.navigation.stateShow ? 'inline-block' : 'none'}}>
            <span className={styles.stateItem}>
              <p className={styles.stateCount}>{this.props.basics_rt.stat.todayFace}</p>
              <p>今日抓拍</p>
            </span>
            <span className={styles.stateItem}>
              <p className={styles.stateCount}>{this.props.basics_rt.stat.todayAlarm}</p>
              <p>今日报警</p>
            </span>
            <span className={styles.stateItem}>
              <p className={styles.stateCount}>{this.props.basics_rt.stat.totalFace}</p>
              <p>累计抓拍</p>
            </span>
            <span className={styles.stateItem}>
              <p className={styles.stateCount}>{this.props.basics_rt.stat.totalAlarm}</p>
              <p>累计报警</p>
            </span>
          </span>
        </div>
        <div className={styles.user} style={{display: this.state.user ? 'block' : 'none', transition: '.3s'}} onMouseEnter={() => this.setState({user: false})}>
          {/* 用户中心需要抽成 有状态组件 TODO */}
          <Icon type="user" className={styles.userIcon}/>
          <span className={styles.userName}>{this.props.navigation.userMsg.name}</span>
        </div>
        <div className={styles.user} onClick={this.loginOut} style={{display: this.state.user ? 'none' : 'block', transition: '.3s'}} onMouseLeave={() => this.setState({user: true})}>
          <Icon type="poweroff" className={styles.powerOff} title="退出" />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ navigation, basics_rt }) {
  return { navigation, basics_rt };
}

export default connect(mapStateToProps)(Header);
