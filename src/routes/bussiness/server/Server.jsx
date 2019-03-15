/**
 * Created by Jason on 2018/1/16.
 */
import React from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd';
import styles from './server.less';
import MayLayout from '../../../components/common/Layout/MayLayout';
import Collect from './Collect';
import Recognize from './Recognize';

const TabPane = Tabs.TabPane;

class Server extends React.Component {
  componentWillMount() {
    this.initState();
  }
  initState = () => {
    const device = this.props.bussiness.device;
    const poiGroup = this.props.bussiness.poiGroup;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        server: {
          searchParams: {
            pageSize: 10, // TODO
            pageNo: 1,
            id_name_ip: '',
            orgunit: ''
          },
          tableList: [],
          page: {
            total: 0,
            pageSize: 10,
            currentPage: 1
          },
          addParams: {
            name: '',
            ipAddress: '',
            appconfig: '',
            orgunitId: '',
            memo: '',
          },
          deleteParams: {
            id: ''
          },
          addRecognizeModalVisiable: false,
          searchCameraParam: {
            id: ''
          },
          cameraList: [],
          modifyCameraParams: {
            id: '',
            config: ''
          },
          DetailCameraVisiable: false
        },
        appnodeList: [],
        collectGroup: {
          addModalVisiable: false,
          searchCollectParams: {
            pageSize: 10, // TODO
            pageNo: 1,
            id_name_ip: '',
            orgunit: ''
          },
          collectList: [],
          collectPage: {
            total: 0,
            pageSize: 10,
            currentPage: 1
          },
          addCollectParams: {
            name: '',
            ipAddress: '',
            orgunitId: '',
            memo: '',
            appId: '',
          },
          deleteCollectParams: {
            id: ''
          },
        }
      }
    });
  };
  onTabsClick = v => {
    this.initState();
    switch (v) {
      case 'collect':
        this.props.dispatch({
          type: 'bussiness/getGroupTree'
        });
        this.props.dispatch({
          type: 'bussiness/getCollectList'
        });
        this.props.dispatch({
          type: 'bussiness/getAppnodeList'
        });
        break;
      case 'recognize':
        this.props.dispatch({
          type: 'bussiness/getGroupTree'
        });
        this.props.dispatch({
          type: 'bussiness/getRecognizeList'
        });
        break;
    }
  };
  render() {
    return (
      <MayLayout location={this.props.location}>
        <div className={styles.container}>
          <Tabs type="card" onTabClick={this.onTabsClick}>
            <TabPane tab="采集端" key="collect" style={{ height: '100%' }}>
              <Collect />
            </TabPane>
            <TabPane tab="识别端" key="recognize" style={{ height: '100%' }}>
              <Recognize />
            </TabPane>
          </Tabs>
        </div>
      </MayLayout>
    );
  }
}

function mapStateToProps({ bussiness }) {
  return { bussiness };
}

export default connect(mapStateToProps)(Server);
