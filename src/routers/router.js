import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from '../routes/IndexPage/IndexPage';
import NavigationPage from '../routes/navigation/IndexPage';

import UserCfg from '../routes/system/userConfig/UserConfig';
import RoleCfg from '../routes/system/roleConfig/RoleConfig';
import GroupCfg from '../routes/system/groupConfig/GroupConfig';
import PowerCfg from '../routes/system/powerConfig/PowerConfig';

import RealMonitor from '../routes/basics/realMonitor/RealMonitor';
import HistoryPass from '../routes/basics/historyPass/HistoryPass';
import HistoryPolice from '../routes/basics/historyPolice/HistoryPolice';
import RealPolice from '../routes/basics/realPolice/RealPolice';

import Device from '../routes/bussiness/device/Device';
import Target from '../routes/bussiness/targetManage/Target';
import Rule from '../routes/bussiness/rule/Rule';
import Server from '../routes/bussiness/server/Server';

import ImgRetrieve from '../routes/expand/imgRetrieval/ImgRetrieve';
import PersonMap from '../routes/expand/imgRetrieval/PersonMap';
import FaceCollection from '../routes/expand/faceCollection/FaceCollection';
import Statistics from '../routes/expand/statistics/Statistics';
import StaticAlarm from '../routes/expand/statistics/AlarmDetails';

import DatumEdit from '../routes/personal/datumEdit/DatumEdit';
import LogRecord from '../routes/personal/logRecord/LogRecord';


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <div style={{height: '100%'}}>
        <Route exact path="/" component={IndexPage}/>
        <Route exact path="/nav" component={NavigationPage}/>

        {/* 系统管理 */}
        <Route exact path="/userCfg" component={UserCfg}/>
        <Route exact path="/roleCfg" component={RoleCfg}/>
        <Route exact path="/groupCfg" component={GroupCfg}/>
        <Route exact path="/powerCfg" component={PowerCfg}/>
        {/* 基础功能 TODO*/}
        <Route exact path="/realMonitoring" component={RealMonitor}/>
        <Route exact path="/historyPass" component={HistoryPass}/>
        <Route exact path="/historyPolice" component={HistoryPolice}/>
        <Route exact path="/realPolice" component={RealPolice}/>
        {/* 扩展功能 TODO*/}
        <Route exact path="/imgRetrieve" component={ImgRetrieve}/>
        <Route exact path="/imgRetrieve/map" component={PersonMap}/>
        <Route exact path="/faceCollection" component={FaceCollection}/>
        <Route exact path="/statistics" component={Statistics}/>
        <Route exact path="/statistics/alarmHistory/:type" component={StaticAlarm}/>
        {/* 业务配置 */}
        <Route exact path="/device" component={Device}/>
        <Route exact path="/target" component={Target}/>
        <Route exact path="/rule" component={Rule}/>
        <Route exact path="/server" component={Server}/>
        {/* 个人中心 TODO*/}
        <Route exact path="/personalEdit" component={DatumEdit}/>
        <Route exact path="/logRecord" component={LogRecord}/>
      </div>

    </Router>
  );
}

export default RouterConfig;
