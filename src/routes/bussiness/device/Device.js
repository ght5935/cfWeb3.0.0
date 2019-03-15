/**
 * Created by Jason on 2018/1/16.
 */
import React from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd';
import { CAMERA_CONFIG, POI_GROUP_PAGE_SIZE } from '../../../utils/config';
import styles from './Device.less';
import MayLayout from '../../../components/common/Layout/MayLayout';
import DeviceGroup from './DeviceGroup';
import CameraGroup from './CameraGroup';

const TabPane = Tabs.TabPane;

class Device1 extends React.Component {
  componentWillMount() {
    this.initState();
    // this.props.dispatch({
    //   type: 'bussiness/getGroupNameTree'
    // });
  }
  initState = () => {
    const device = this.props.bussiness.device;
    const poiGroup = this.props.bussiness.poiGroup;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          addCameraModule: false,
          modifyCamera: {
            name: '',
            modelType: '',
            categoryId: '',
            orgunit_id: '',
            ipAddress: '',
            playUrl: '',
            cjdUrl: '',
            cameraUsername: '',
            cameraPassword: '',
            memo: '',
            cjdUuid: '',
            cjdSubid: '',
            config: CAMERA_CONFIG
          },
          camreaGroup: {
            addCamreaGroupParams: {
              name: '',
              // parentId: 1,
              sortNo: 1,
              orgunitId:'',
              memo: '',
            },
            editCamreaGroupParams: {
              id: null,
              name: '',
              // parentId: 1,
              sortNo: 0,
              orgunitId: 1,
              memo: '',
            },
            getCameraGroupListParams: {
              pageSize: 10,
              pageNo: 1,
              name: '',
              orgunitId: '',
            },
            cameraGroupTablePage:{
              total: 0,
              pageSize:10,
              currentPage: 1
            },
            cameraGroupTableList:[],
            ids: null,
            groupNameTree: [],
            modifygroupNameTree: [],
            addCamreaGroupModalVisiable: false
          }
        },
        poiGroup: {
          ...poiGroup,
          getGroupsListParams: {
            pageSize: POI_GROUP_PAGE_SIZE,
            pageNo: 1,
            name: '',
            type: ''
          },
          poiGroupList: [],
          poiGroupPage: {
            pageSize: POI_GROUP_PAGE_SIZE,
            total: 0,
            currentPage: 1
          }
        }
      }
    });
  };
  onTabsClick = v => {
    this.initState();
    switch (v) {
      case 'device':
        this.props.dispatch({
          type: 'bussiness/getPoiList'
        });
        this.props.dispatch({
          type: 'bussiness/getAllGroups'
        });
        this.props.dispatch({
          type: 'bussiness/getCameraList'
        });
        break;
      case 'camera':
        this.props.dispatch({
          type: 'bussiness/getCameraGroupList'
        });
        break;
    }
  };
  render() {
    return (
      <MayLayout location={this.props.location}>
        <div className={styles.container}>
          <Tabs type="card" onTabClick={this.onTabsClick}>
            <TabPane tab="设备" key="device" style={{ height: '100%' }}>
              <DeviceGroup />
            </TabPane>
            <TabPane tab="设备分组" key="camera" style={{ height: '100%' }}>
              <CameraGroup />
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

export default connect(mapStateToProps)(Device1);
