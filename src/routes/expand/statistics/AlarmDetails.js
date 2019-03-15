/**
 * Created by Jason on 2018/3/29.
 */

import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import pathToRegexp from 'path-to-regexp';
import { Table, Spin, Row, Col, Input, Button, Radio, DatePicker, Select } from 'antd';
import styles from './Statistics.less';
import MayLayout from '../../../components/common/Layout/MayLayout';
import Pagination from '../../../components/common/PaginationView/PaginationView';
import AlarmCard from './AlarmCard';

const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
const { Option } = Select;


class AlarmDetails extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const path = pathToRegexp('/statistics/alarmHistory/:foo?').exec(this.props.location.pathname);
    const groupId = path[1];
    const staticData = this.props.expand.staticData;
    const {getAlarmListParams} = staticData;
    this.props.dispatch({
      type: 'expand/success',
      payload: {
        staticData: {
          ...staticData,
          getAlarmListParams: {
            ...getAlarmListParams,
            groupId,
            pageSize: 20,
            pageNo: 1,
            name: '',
            idCard: '',
            startTime: '',
            endTime: '',
            gender: ''
          }
        }
      }
    });
    this.props.dispatch({
      type: 'expand/getInitAlarmList'
    });
  }
  onNameChange = e => {
    const staticData = this.props.expand.staticData;
    const {getAlarmListParams} = staticData;
    this.props.dispatch({
      type: 'expand/success',
      payload: {
        staticData: {
          ...staticData,
          getAlarmListParams: {
            ...getAlarmListParams,
            name: e.target.value
          }
        }
      }
    });
  };
  onIdCardChange = e => {
    const staticData = this.props.expand.staticData;
    const {getAlarmListParams} = staticData;
    this.props.dispatch({
      type: 'expand/success',
      payload: {
        staticData: {
          ...staticData,
          getAlarmListParams: {
            ...getAlarmListParams,
            idCard: e.target.value
          }
        }
      }
    });
  };
  onGenderChange = v => {
    const staticData = this.props.expand.staticData;
    const {getAlarmListParams} = staticData;
    this.props.dispatch({
      type: 'expand/success',
      payload: {
        staticData: {
          ...staticData,
          getAlarmListParams: {
            ...getAlarmListParams,
            gender: v.target.value
          }
        }
      }
    });
  };
  onRangeDateChange = (date, dateString) => {
    let startTime = '';
    let endTime = '';
    if(date.length !== 0){
      startTime = moment(date[1]).format('YYYY-MM-DD HH:mm:ss');
      endTime = moment(date[0]).format('YYYY-MM-DD HH:mm:ss');
    }
    const staticData = this.props.expand.staticData;
    const {getAlarmListParams} = staticData;
    
    this.props.dispatch({
      type: 'expand/success',
      payload: {
        staticData: {
          ...staticData,
          getAlarmListParams: {
            ...getAlarmListParams,
            startTime,
            endTime
          }
        }
      }
    });
  };
  onTypeChange = v => {
    const staticData = this.props.expand.staticData;
    const {getAlarmListParams} = staticData;
    this.props.dispatch({
      type: 'expand/success',
      payload: {
        staticData: {
          ...staticData,
          getAlarmListParams: {
            ...getAlarmListParams,
            groupId: v
          }
        }
      }
    });
  };

  onSearchClick = () => {
    const staticData = this.props.expand.staticData;
    const {getAlarmListParams} = staticData;
    this.props.dispatch({
      type: 'expand/success',
      payload: {
        staticData: {
          ...staticData,
          getAlarmListParams: {
            ...getAlarmListParams,
            pageNo: 1
          },
          alarmList: []
        }
      }
    });
    this.props.dispatch({
      type: 'expand/getInitAlarmList'
    });
  };
  pageTranslate = value => {
    const staticData = this.props.expand.staticData;
    this.props.dispatch({
      type: 'expand/success',
      payload: {
        staticData: {
          ...staticData,
          alarmList: []
        }
      }
    });
    this.props.dispatch({
      type: 'expand/alarmListTranslate',
      payload: {
        pageNo: value.pageNo,
        pageSize: value.pageSize
      }
    });
  };
  render() {
    return (
      <MayLayout location={this.props.location}>
        <div className={styles.container}>
          <Row className={styles.searchBar}>
            <Col span={4} className={styles.condition}>
              <span className={styles.label}>姓名</span>
              <Input onChange={this.onNameChange} style={{width: '60%'}}/>
            </Col>
            <Col span={4} className={styles.condition}>
              <span className={styles.label}>身份证号</span>
              <Input onChange={this.onIdCardChange} value={this.props.expand.staticData.getAlarmListParams.idCard} style={{width: '60%'}}/>
            </Col>
            <Col span={5} className={styles.condition}>
              <span className={styles.label} >性别</span>
              <RadioGroup style={{width: '60%', color: '#fff'}} value={this.props.expand.staticData.getAlarmListParams.gender} onChange={this.onGenderChange}>
                <Radio className={styles.radio} value="">全部</Radio>
                <Radio className={styles.radio} value="1">男</Radio>
                <Radio className={styles.radio} value="0">女</Radio>
              </RadioGroup>

            </Col>
            <Col span={6} className={styles.condition}>
              <span className={styles.label}>报警时间</span>
              <RangePicker format="YYYY-MM-DD HH:mm:ss" showTime onChange={this.onRangeDateChange} style={{width: '60%'}}/>
            </Col>
            <Col span={3} className={styles.condition}>
              <span className={styles.label}>报警类型</span>
              <Select onChange={this.onTypeChange} value={this.props.expand.staticData.getAlarmListParams.groupId - 0} style={{width: '50%'}}>
                <Option value={-1}>其他人员</Option>
                <Option value={2}>业主</Option>
                <Option value={3}>工作人员</Option>
                <Option value={4}>访客</Option>
                <Option value={5}>黑名单</Option>
                <Option value={1}>默认分组</Option>
              </Select>
            </Col>
            <Col span={2} className={styles.condition}>
              <Button type="primary" onClick={this.onSearchClick}>查询</Button>
            </Col>
          </Row>
          <div className={styles.list}>
            <Spin spinning={this.props.loading.global} className={styles.spinning}/>
            {this.props.expand.staticData.alarmList && this.props.expand.staticData.alarmList.length > 0 ?
                    this.props.expand.staticData.alarmList.map(v => <AlarmCard key={v.id} data={v}/>) : ''}
          </div>
          <Pagination
            className={styles.pagination}
            page={this.props.expand.staticData.listPage}
            pageTranslate={this.pageTranslate ? this.pageTranslate : null}
          />
        </div>
      </MayLayout>
    );
  }
}

function mapStateToProps({ expand, loading }) {
  return { expand, loading };
}

export default connect(mapStateToProps)(AlarmDetails);
