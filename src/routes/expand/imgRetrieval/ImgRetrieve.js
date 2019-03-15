/**
 * Created by Jason on 2018/1/16.
 */
import React from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd';
import moment from 'moment';

import { POI_PERSON_PAGE_SIZE, POI_GROUP_PAGE_SIZE } from '../../../utils/config';
import styles from './ImgRetrieve.less';
import MayLayout from '../../../components/common/Layout/MayLayout';
import TargetPerson from './TargetPerson';
import TargetGroup from './TargetGroup';
import IndexPage from './IndexPage'
const TabPane = Tabs.TabPane;

class ImgRetrieve extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputPersonValue: 60,
      inputGroupValue: 60,
      originImg: '',
      originUpImg: '',
      fileList: [],
      originImgGroup: '',
      fileListGroup: []
    }
  }
  initState = () => {
    const { faceToPoi, poiToFace } = this.props.expand;
    this.props.dispatch({
      type: 'expand/gitALLCamreaList'
    })
    this.props.dispatch({
      type: 'expand/success',
      payload: {
        faceToPoi: {
          ...faceToPoi,
          createFtParams: {
            faceCount: 1,
            img_path_1: '',
            srcIds: [],
            type: 0
          },
          ftToFtParams: {
            size: 0,
            srcIds: [],
            threshold: 60,
            startTime: moment().hour(-24).format('YYYY-MM-DD HH:mm:ss'),
            endTime: moment().format('YYYY-MM-DD HH:mm:ss')
          },
          matchFtParams: {
            transId: '',
            appkey: '',
            faceId: '',
            appurl: ''
          },
          matchFaceList: []
        },
        poiToFace: {
          ...poiToFace,
          createFtParams: {
            faceCount: 1,
            img_path_1: '',
            srcIds: '',
            type: 1
          },
          ftToPoiParams: {
            alarmThreshold: 60,
            groupIds: ''
          },
          matchPoiParams: {
            transId: '',
            appkey: '',
            faceId: '',
            appurl: '',
          },
          matchPersonList: [],
          targetGroups: []
        },
      }
    });
  };
  componentWillMount() {
    this.initState();
  }
  changeInputValue = (v) => {
    this.setState({
      inputPersonValue: v
    })
  }
  changePerson = (o, i) => {
    this.setState({
      originImg: o,
      fileList: i
    })
  }
  changeGroupValue = (v) => {
    this.setState({
      inputGroupValue: v,
    })
  }
  changeGroup = (o, i) => {

    this.setState({
      originImgGroup: o.imageUrl,
      originUpImg: o.originUpImg,
      fileListGroup: i
    })
  }
  onTabsClick = v => {
    this.initState();
    switch (v) {
      case 'person':
        this.setState({
          inputGroupValue: 60,
          originImgGroup: '',
          fileListGroup: []
        })
        this.props.dispatch({
          type: 'expand/getPoiList'
        });
        this.props.dispatch({
          type: 'expand/getGroupTrees'
        });
        this.props.dispatch({
          type: 'expand/getCategoryTree'
        });
        break;
      case 'group':
        this.setState({
          inputPersonValue: 60,
          originImg: '',
          fileList: []
        })
        this.props.dispatch({
          type: 'expand/getGroupsList'
        });
        this.props.dispatch({
          type: 'expand/getTargetGroups'
        });
        break;
      case 'compare':
        this.setState({
          inputGroupValue: 60,
          originImgGroup: '',
          fileListGroup: [],
          inputPersonValue: 60,
          originImg: '',
          fileList: []
        })
    }
  };
  render() {
    return (
      <MayLayout location={this.props.location}>
        <div className={styles.container}>
          <Tabs type="card" onTabClick={this.onTabsClick}>
            <TabPane tab="抓拍库搜索" key="person" style={{ height: '100%' }}>
              <TargetPerson
                onChangePersonValue={this.changeInputValue}
                inputPersonValue={this.state.inputPersonValue}
                onPersonPicture={this.changePerson}
                fileList={this.state.fileList}
                originImg={this.state.originImg}
              />
            </TabPane>
            <TabPane tab="目标库搜索" key="group" style={{ height: '100%' }} >
              <TargetGroup
                onChangeGroupValue={this.changeGroupValue}
                inputGroupValue={this.state.inputGroupValue}
                onGroupPicture={this.changeGroup}
                fileList={this.state.fileListGroup}
                originShowImg={this.state.originImgGroup}
                originUpImg={this.state.originUpImg}
              />
            </TabPane>
            <TabPane tab="一比一" key="compare" style={{ height: '100%' }} >
              <IndexPage />
            </TabPane>
          </Tabs>
        </div>
      </MayLayout>
    );
  }
}

function mapStateToProps({ expand}) {
  return { expand};
}

export default connect(mapStateToProps)(ImgRetrieve);
