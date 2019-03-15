/**
 * Created by Jason on 2018/1/16.
 */
import React from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd';


import { POI_PERSON_PAGE_SIZE, POI_GROUP_PAGE_SIZE } from '../../../utils/config';
import styles from './Target.less';
import MayLayout from '../../../components/common/Layout/MayLayout';
import TargetPerson from './TargetPerson';
import TargetGroup from './TargetGroup';

const TabPane = Tabs.TabPane;

class Target extends React.Component {
  componentWillMount() {
    this.initState();
  }
  initState = () => {
    const poiPerson = this.props.bussiness.poiPerson;
    const poiGroup = this.props.bussiness.poiGroup;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          getPoiListParams: {
            pageSize: POI_PERSON_PAGE_SIZE,
            pageNo: 1,
            name: '',
            gender: '',
            identityCard: '',
            orgunitId: '',
            groupId: '',
            threshold: ''
          },
          poiPersonList: [],
          poiPersonPage: {
            pageSize: POI_PERSON_PAGE_SIZE,
            total: 0,
            currentPage: 1
          }
        },
        poiGroup: {
          ...poiGroup,
          getGroupsListParams: {
            pageSize: POI_GROUP_PAGE_SIZE,
            pageNo: 1,
            name: '',
            type: '',
            orgunitId: ''
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
    const poiPerson = this.props.bussiness.poiPerson;
    switch (v) {
      case 'person':
        this.props.dispatch({
          type: 'bussiness/getPoiList'
        });
        this.props.dispatch({
          type: 'bussiness/getAllGroups'
        });
        break;
      case 'group':
        this.props.dispatch({
          type: 'bussiness/getGroupsList'
        });
        break;
    }
  };
  render() {
    return (
      <MayLayout location={this.props.location}>
        <div className={styles.container}>
          <Tabs type="card" onTabClick={this.onTabsClick}>
            <TabPane tab="目标人员管理" key="person" style={{ height: '100%' }}>
              <TargetPerson />
            </TabPane>
            <TabPane tab="目标分组管理" key="group" style={{ height: '100%' }}>
              <TargetGroup />
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

export default connect(mapStateToProps)(Target);
