/**
 * Created by Ethan on 2018/1/10.
 */
import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import pathToRegexp from 'path-to-regexp';

import styles from './header.less';
import Header from './Header';
import { API_PREFIX } from '../../../utils/config';

class MayLayout extends React.Component {

  // componentWillMount() {
  //   this.props.dispatch({
  //     type: 'navigation/getSubModule'
  //   });
  // }

  navItemClass = link => {
    const initUrl = this.props.index.initModule ? this.props.index.initModule.url : '';
    const match = pathToRegexp('/:foo?/:bar?/:name?/:type?').exec(this.props.location.pathname);
    if (match && match[1]) {
      if (match[1] == link) {
        return `${styles.mask} ${styles.maskActive}`;
      }
      return styles.mask;
    }
    if (initUrl == link) {
      return `${styles.mask} ${styles.maskActive}`;
    }
    return styles.mask;
  };
  //   navIconIsClick = (link, value) => {
  //   const match = pathToRegexp('/:foo?/:bar?').exec(this.props.location.pathname);
  //   if (match && match[1]) {
  //     if (match[1] == link) {
  //       return `${API_PREFIX}${value.checked_icon}`;
  //     }
  //     return `${API_PREFIX}${value.no_checked_icon}`;
  //   }
  // };
  navIconClass = link => {
    const initUrl = this.props.index.initModule ? this.props.index.initModule.url : '';
    const match = pathToRegexp('/:foo?/:bar?/:name?/:type?').exec(this.props.location.pathname);


    if (match && match[1]) {
      if (match[1] == link) {
        switch (link) {
          case 'realMonitoring':
            return `${styles.navIcon} ${styles.realMonitoring_icon_active}`;
            break;
          case 'realPolice':
            return `${styles.navIcon} ${styles.realPolice_icon_active}`;
            break;
          case 'historyPolice':
            return `${styles.navIcon} ${styles.historyPolice_icon_active}`;
            break;
          case 'historyPass':
            return `${styles.navIcon} ${styles.historyPass_icon_active}`;
            break;
          case 'imgRetrieve':
            return `${styles.navIcon} ${styles.imgRetrieve_icon_active}`;
            break;
          case 'faceCollection':
            return `${styles.navIcon} ${styles.faceCollection_icon_active}`;
            break;
          case 'statistics':
            return `${styles.navIcon} ${styles.statistics_icon_active}`;
            break;
          case 'target':
            return `${styles.navIcon} ${styles.target_icon_active}`;
            break;
          case 'rule':
            return `${styles.navIcon} ${styles.rule_icon_active}`;
            break;
          case 'userCfg':
            return `${styles.navIcon} ${styles.userCfg_icon_active}`;
            break;
          case 'roleCfg':
            return `${styles.navIcon} ${styles.roleCfg_icon_active}`;
            break;
          case 'groupCfg':
            return `${styles.navIcon} ${styles.groupCfg_icon_active}`;
            break;
          case 'device':
            return `${styles.navIcon} ${styles.device_icon_active}`;
            break;
          case 'powerCfg':
            return `${styles.navIcon} ${styles.powerCfg_icon_active}`;
            break;
          case 'personalEdit':
            return `${styles.navIcon} ${styles.personalEdit_icon_active}`;
            break;
          case 'logRecord':
            return `${styles.navIcon} ${styles.logRecord_icon_active}`;
            break;
          case 'server':
            return `${styles.navIcon} ${styles.server_icon_active}`;
            break;

        }
      }
      switch (link) {
        case 'realMonitoring':
          return `${styles.navIcon} ${styles.realMonitoring_icon}`;
          break;
        case 'realPolice':
          return `${styles.navIcon} ${styles.realPolice_icon}`;
          break;
        case 'historyPolice':
          return `${styles.navIcon} ${styles.historyPolice_icon}`;
          break;
        case 'historyPass':
          return `${styles.navIcon} ${styles.historyPass_icon}`;
          break;
        case 'imgRetrieve':
          return `${styles.navIcon} ${styles.imgRetrieve_icon}`;
          break;
        case 'faceCollection':
          return `${styles.navIcon} ${styles.faceCollection_icon}`;
          break;
        case 'statistics':
          return `${styles.navIcon} ${styles.statistics_icon}`;
          break;
        case 'target':
          return `${styles.navIcon} ${styles.target_icon}`;
          break;
        case 'rule':
          return `${styles.navIcon} ${styles.rule_icon}`;
          break;
        case 'userCfg':
          return `${styles.navIcon} ${styles.userCfg_icon}`;
          break;
        case 'roleCfg':
          return `${styles.navIcon} ${styles.roleCfg_icon}`;
          break;
        case 'groupCfg':
          return `${styles.navIcon} ${styles.groupCfg_icon}`;
          break;
        case 'device':
          return `${styles.navIcon} ${styles.device_icon}`;
          break;
        case 'powerCfg':
          return `${styles.navIcon} ${styles.powerCfg_icon}`;
          break;
        case 'personalEdit':
          return `${styles.navIcon} ${styles.personalEdit_icon}`;
          break;
        case 'logRecord':
          return `${styles.navIcon} ${styles.logRecord_icon}`;
          break;
        case 'server':
          return `${styles.navIcon} ${styles.server_icon}`;
          break;

      }
    } else {
      if (initUrl == link) {
        switch (link) {
          case 'realMonitoring':
            return `${styles.navIcon} ${styles.realMonitoring_icon_active}`;
            break;
          case 'realPolice':
            return `${styles.navIcon} ${styles.realPolice_icon_active}`;
            break;
          case 'historyPolice':
            return `${styles.navIcon} ${styles.historyPolice_icon_active}`;
            break;
          case 'historyPass':
            return `${styles.navIcon} ${styles.historyPass_icon_active}`;
            break;
          case 'imgRetrieve':
            return `${styles.navIcon} ${styles.imgRetrieve_icon_active}`;
            break;
          case 'faceCollection':
            return `${styles.navIcon} ${styles.faceCollection_icon_active}`;
            break;
          case 'statistics':
            return `${styles.navIcon} ${styles.statistics_icon_active}`;
            break;
          case 'target':
            return `${styles.navIcon} ${styles.target_icon_active}`;
            break;
          case 'rule':
            return `${styles.navIcon} ${styles.rule_icon_active}`;
            break;
          case 'userCfg':
            return `${styles.navIcon} ${styles.userCfg_icon_active}`;
            break;
          case 'roleCfg':
            return `${styles.navIcon} ${styles.roleCfg_icon_active}`;
            break;
          case 'groupCfg':
            return `${styles.navIcon} ${styles.groupCfg_icon_active}`;
            break;
          case 'device':
            return `${styles.navIcon} ${styles.device_icon_active}`;
            break;
          case 'powerCfg':
            return `${styles.navIcon} ${styles.powerCfg_icon_active}`;
            break;
          case 'personalEdit':
            return `${styles.navIcon} ${styles.personalEdit_icon_active}`;
            break;
          case 'logRecord':
            return `${styles.navIcon} ${styles.logRecord_icon_active}`;
            break;
          case 'server':
            return `${styles.navIcon} ${styles.server_icon_active}`;
            break;

        }
      }
      switch (link) {
        case 'realMonitoring':
          return `${styles.navIcon} ${styles.realMonitoring_icon}`;
          break;
        case 'realPolice':
          return `${styles.navIcon} ${styles.realPolice_icon}`;
          break;
        case 'historyPolice':
          return `${styles.navIcon} ${styles.historyPolice_icon}`;
          break;
        case 'historyPass':
          return `${styles.navIcon} ${styles.historyPass_icon}`;
          break;
        case 'imgRetrieve':
          return `${styles.navIcon} ${styles.imgRetrieve_icon}`;
          break;
        case 'faceCollection':
          return `${styles.navIcon} ${styles.faceCollection_icon}`;
          break;
        case 'statistics':
          return `${styles.navIcon} ${styles.statistics_icon}`;
          break;
        case 'target':
          return `${styles.navIcon} ${styles.target_icon}`;
          break;
        case 'rule':
          return `${styles.navIcon} ${styles.rule_icon}`;
          break;
        case 'userCfg':
          return `${styles.navIcon} ${styles.userCfg_icon}`;
          break;
        case 'roleCfg':
          return `${styles.navIcon} ${styles.roleCfg_icon}`;
          break;
        case 'groupCfg':
          return `${styles.navIcon} ${styles.groupCfg_icon}`;
          break;
        case 'device':
          return `${styles.navIcon} ${styles.device_icon}`;
          break;
        case 'powerCfg':
          return `${styles.navIcon} ${styles.powerCfg_icon}`;
          break;
        case 'personalEdit':
          return `${styles.navIcon} ${styles.personalEdit_icon}`;
          break;
        case 'logRecord':
          return `${styles.navIcon} ${styles.logRecord_icon}`;
          break;
        case 'server':
          return `${styles.navIcon} ${styles.server_icon}`;
          break;

      }
    }
  };
  pageReload = url => {
    if (`/${url}` === this.props.location.pathname) {
      window.location.reload();
    }
    return false;
  }
  renderNavItem = () => {
    if (this.props.navigation.navItem && this.props.navigation.navItem.length > 0) {
      return this.props.navigation.navItem.map((value, i) =>{
        if(i < 9){
          return (<li className={styles.navItem} key={value.moduleId} onClick={this.pageReload.bind(this, value.url)}>
          <Link className={styles.navLink} to={`/${value.url}`}>
            <div className={this.navItemClass(value.url)}>
              <div className={this.navIconClass(value.url)}/>
              {/* <img className={styles.navIcon} src={this.navIconIsClick(value.url, value)} alt=""/>*/}
              <div className={styles.text}>{ value.moduleName }</div>
            </div>
          </Link>
        </li>)
        };
      });
    }
    return false;
  };

  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <div className={styles.maylayoutContainer}>
          <Header />
          <div className={styles.wrap}>
            <ul>
              <li className={styles.navItem}>
                <Link className={styles.navLink} to="/nav">
                  <div className={this.navItemClass('/nav')}>
                    <div className={`${styles.navIcon} ${styles.nav_icon}`} />
                    <div className={styles.text}>导航页面</div>
                  </div>
                </Link>
              </li>
              { this.renderNavItem() }
              {/* <li className={styles.navItem}>
                <Link className={styles.navLink} onClick={() => window.toCar()} to="/nav">
                  <div className={this.navItemClass('/nav')}>
                    <div className={`${styles.navIcon} ${styles.car_icon}`} />
                    <div className={styles.text}>车辆识别</div>
                  </div>
                </Link>
              </li> */}
              {
                this.props.navigation.navItem && this.props.navigation.navItem.length > 6 ? 
                <li className={styles.navItem}>
                <Link className={styles.navLink} to="/nav">
                  <div className={this.navItemClass('/nav')}>
                    <div className={`${styles.text} ${styles.more}`}>更多>></div>
                  </div>
                </Link>
              </li> : ''
              }
            </ul>
          </div>
          <div className={styles.child}>
            {this.props.children}
          </div>
        </div>
      </LocaleProvider>

    );
  }
}

function mapStateToProps({ navigation, index }) {
  return { navigation, index };
}

export default connect(mapStateToProps)(MayLayout);
