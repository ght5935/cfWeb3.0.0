/**
 * Created by Ethan on 2018/2/28.
 */
import React from 'react';
import { connect } from 'dva';
import { Input, Row, Col, TreeSelect, Select, Button, DatePicker, Table, Pagination } from 'antd';
import MayLayout from '../../../components/common/Layout/MayLayout';
// import Pagination from '../../../components/common/PaginationView/PaginationView';
import styles from './LogRecord.less';

const { RangePicker } = DatePicker;
const { Column } = Table;
const { Option, OptGroup } = Select;
class LogRecord extends React.Component {

  componentDidMount() {
    this.props.dispatch({
      type: 'personal/logList'
    });
    this.props.dispatch({
      type: 'personal/getGroupTree'
    });
    this.props.dispatch({
      type: 'personal/getAllRoles'
    });
    this.props.dispatch({
      type: 'personal/getAllModule'
    });
  }
  componentWillUnmount() {
    const logRecord = this.props.personal.logRecord;
    const { getLogListParams } = logRecord;
    this.props.dispatch({
      type: 'personal/success',
      payload: {
        logRecord: {
          ...logRecord,
          getLogListParams: {
            ...getLogListParams,
            pageSize: 15,
            pageNo: 1,
            userName: '',
            modelId: '',
            orgunitId: '',
            roleId: '',
            startTime: '',
            endTime: ''
          }
        }
      }
    });
  }
  // pageTranslate = value => {
  //   this.props.dispatch({
  //     type: 'personal/logListTranslate',
  //     payload: {
  //       pageNo: value.pageNo,
  //       pageSize: value.pageSize
  //     }
  //   });
  // };
  itemRender(current, type, originalElement) {
    if (type === 'prev') {
      return <a style={{ color: '#02abe3' }}>上一页</a>;
    } else if (type === 'next') {
      return <a style={{ color: '#02abe3' }}>下一页</a>;
    }
    return originalElement;
  }
  PaginationChange(page, pageSize) {
    this.props.dispatch({
      type: 'personal/logListTranslate',
      payload: {
        pageNo: page,
        pageSize: pageSize
      }
    });
  }
  onNameChange = e => {
    const logRecord = this.props.personal.logRecord;
    const { getLogListParams } = logRecord;
    this.props.dispatch({
      type: 'personal/success',
      payload: {
        logRecord: {
          ...logRecord,
          getLogListParams: {
            ...getLogListParams,
            pageSize: 15,
            pageNo: 1,
            userName: e.target.value
          }
        }
      }
    });
  }
  onTimeChange = (data, dateString) => {
    const logRecord = this.props.personal.logRecord;
    const { getLogListParams } = logRecord;
    this.props.dispatch({
      type: 'personal/success',
      payload: {
        logRecord: {
          ...logRecord,
          getLogListParams: {
            ...getLogListParams,
            pageSize: 15,
            pageNo: 1,
            startTime: dateString[0],
            endTime: dateString[1]
          }
        }
      }
    });
  }
  onSearchOrgunit = id => {
    let value = id - 0;
    if (!value) {
      value = '';
    }
    const logRecord = this.props.personal.logRecord;
    const { getLogListParams } = logRecord;
    this.props.dispatch({
      type: 'personal/success',
      payload: {
        logRecord: {
          ...logRecord,
          getLogListParams: {
            ...getLogListParams,
            pageSize: 16,
            pageNo: 1,
            orgunitId: value
          }
        }
      }
    });
  };
  onSelectRoleChange = value => {
    const logRecord = this.props.personal.logRecord;
    const { getLogListParams } = logRecord;
    this.props.dispatch({
      type: 'personal/success',
      payload: {
        logRecord: {
          ...logRecord,
          getLogListParams: {
            ...getLogListParams,
            pageSize: 16,
            pageNo: 1,
            roleId: value
          }
        }
      }
    });
  };
  onOperationChange = value => {
    const logRecord = this.props.personal.logRecord;
    const { getLogListParams } = logRecord;
    this.props.dispatch({
      type: 'personal/success',
      payload: {
        logRecord: {
          ...logRecord,
          getLogListParams: {
            ...getLogListParams,
            pageSize: 16,
            pageNo: 1,
            modelId: value
          }
        }
      }
    });
  }
  renderSelectOptions = () => {
    let op = '';
    if (this.props.personal && this.props.personal.roleList.length > 0) {
      op = this.props.personal.roleList.map(value => (
        <Option value={value.id} key={value.id}>{value.name}</Option>
      ));
    }
    return op;
  };
  renderOperation = () => {
    let op = '';
    if (this.props.personal && this.props.personal.moduleList.length > 0) {
      op = this.props.personal.moduleList.map(value => (
        <OptGroup label={value.moduleName} key={value.moduleId} />
      ));
    }
    return op;
  }
  onSearchClick = () => {
    this.props.dispatch({
      type: 'personal/logList'
    });
  };
  render() {
    return (
      <MayLayout location={this.props.location}>
        <div className={styles.wrap}>
          <div className={styles.title}>日志记录</div>
          <Row className={styles.searchGroup}>
            <Col span={3} className={styles.condition}>
              <span className={styles.label}>用户名</span>
              <Input
                onChange={this.onNameChange}
                style={{ width: '50%' }} />
            </Col>
            <Col span={7} className={styles.condition}>
              <span className={styles.label}>操作时间</span>
              <RangePicker
                showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: '70%' }}
                onChange={this.onTimeChange}
              />
            </Col>
            <Col span={4} className={styles.condition}>
              <span className={styles.label}>所属组织</span>
              <TreeSelect
                allowClear
                treeData={this.props.personal && this.props.personal.groupTree ?
                  this.props.personal.groupTree : []}
                style={{ width: '50%' }}
                onChange={this.onSearchOrgunit}
                treeDefaultExpandAll
                placeholder="请选择组织"
                dropdownMatchSelectWidth={false}
              />
            </Col>

            <Col span={4} className={styles.condition}>
              <span className={styles.label}>所属角色</span>
              <Select
                style={{
                  width: '50%'
                }}
                onChange={this.onSelectRoleChange}
              >
                <Option value="">全部</Option>
                {this.renderSelectOptions()}
              </Select>
            </Col>
            <Col span={4} className={styles.condition}>
              <span className={styles.label}>操作模块</span>
              <Select
                style={{
                  width: '50%'
                }}
                onChange={this.onOperationChange}
              >
                <Option value="">全部</Option>
                {this.props.personal && this.props.personal.moduleList.length > 0 ?
                  this.props.personal.moduleList.map(value =>
                    <OptGroup label={value.moduleName} key={value.moduleId}>
                      {value.moduleList && value.moduleList.length > 0 ?
                        value.moduleList.map(item =>
                          <Option
                            value={item.moduleId}
                            key={item.moduleId}>{item.moduleName}
                          </Option>
                        ) : ''}
                    </OptGroup>)
                  : ''}
              </Select>
            </Col>

            <Button
              type="primary"
              onClick={this.onSearchClick}
            >查询</Button>
          </Row>
          <div className={styles.btnGroup}>
            <Button
              style={{ width: '80px' }} className={styles.delete} type="primary"
            // onClick={this.onAddBtnClick}
            >
              <i className={styles.addIcon} />
              <span>导出</span>
            </Button>
          </div>
          <div className={styles.list}>
            <Table
              dataSource={this.props.personal && this.props.personal.logRecord && this.props.personal.logRecord.logList ?
                this.props.personal.logRecord.logList : []}
              pagination={false}
              bordered
              rowKey={record => record.id}
            >
              <Column
                title="用户名"
                dataIndex="userName"
                key="userName" />
              <Column
                title="所属角色"
                dataIndex="roleName"
                key="roleName" />
              <Column
                title="所属组织"
                dataIndex="orgunitName"
                key="orgunitName" />
              <Column
                title="操作时间"
                dataIndex="gmt_create"
                key="gmt_create" />
              <Column
                title="操作模块"
                dataIndex="modelName"
                key="modelName" />
              <Column
                title="操作动作"
                dataIndex="action"
                key="action" />
              <Column
                title="登陆ip"
                dataIndex="ip"
                key="ip" />
            </Table>

            {/* <Pagination
              className={styles.pagination}
              page={this.props.personal.logRecord.logPage}
              pageTranslate={this.pageTranslate ? this.pageTranslate : null}
            /> */}
            <Pagination
              className={styles.pagination}
              current={this.props.personal.logRecord.logPage.currentPage}
              showQuickJumper
              onChange={this.PaginationChange.bind(this)}
              defaultPageSize={15}
              itemRender={this.itemRender}
              showTotal={total => `共 ${total} 条`}
              total={this.props.personal.logRecord.logPage.total}
            />
          </div>
        </div>
      </MayLayout>
    );
  }
}

function mapStateToProps({ personal }) {
  return { personal };
}

export default connect(mapStateToProps)(LogRecord);
