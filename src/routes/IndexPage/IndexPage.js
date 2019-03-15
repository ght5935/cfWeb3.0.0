/**
 * Created by Jason on 2018/2/5.
 */
import React from 'react';
import { connect } from 'dva';

import {routerRedux} from 'dva/router';


import NavigationPage from '../navigation/IndexPage';

import UserCfg from '../system/userConfig/UserConfig';
import RoleCfg from '../system/roleConfig/RoleConfig';
import GroupCfg from '../system/groupConfig/GroupConfig';
import PowerCfg from '../system/powerConfig/PowerConfig';

import RealMonitor from '../basics/realMonitor/RealMonitor';
import HistoryPass from '../basics/historyPass/HistoryPass';
import HistoryPolice from '../basics/historyPolice/HistoryPolice';
import RealPolice from '../basics/realPolice/RealPolice';

import Device from '../bussiness/device/Device';
import Target from '../bussiness/targetManage/Target';
import Rule from '../bussiness/rule/Rule';

class IndexPage extends React.Component {
  componentWillMount() {
    this.props.dispatch({
      type: 'index/getIshomeModuleByRid'
    });
  }
  renderInitModule = () => {
    if (this.props.index.initModule) {
      switch (this.props.index.initModule.url) {
        case 'realMonitoring':
          return <RealMonitor location={this.props.location} initHash={'realMonitoring'}/>;
          break;
        case 'realPolice':
          return <RealPolice location={this.props.location} initHash={'realPolice'}/>;
          break;
        case 'historyPass':
          return <HistoryPass location={this.props.location} initHash={'historyPass'}/>;
          break;
        case 'historyPolice':
          return <HistoryPolice location={this.props.location} initHash={'historyPolice'}/>;
          break;
        case 'userCfg':
          return <UserCfg location={this.props.location} initHash={'userCfg'}/>;
          break;
        case 'roleCfg':
          return <RoleCfg location={this.props.location} initHash={'roleCfg'}/>;
          break;
        case 'groupCfg':
          return <GroupCfg location={this.props.location} initHash={'groupCfg'}/>;
          break;
        case 'powerCfg':
          return <PowerCfg location={this.props.location} initHash={'powerCfg'}/>;
          break;
        case 'device':
          return <Device location={this.props.location} initHash={'device'}/>;
          break;
        case 'target':
          return <Target location={this.props.location} initHash={'target'}/>;
          break;
        case 'rule':
          return <Rule location={this.props.location} initHash={'rule'}/>;
          break;
        default:
          return <NavigationPage location={this.props.location} initHash={'/'}/>;

      }
    }
  };

  render() {
    return (
      <div style={{height: '100%', width: '100%', position: 'relative'}}>
         { this.renderInitModule() }
      </div>
    );
  }
}

function mapStateToProps({ index }) {
  return { index };
}

export default connect(mapStateToProps)(IndexPage);
