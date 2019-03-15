/**
 * Created by Ethan on 2018/1/10.
 */
import React from 'react';
import { connect } from 'dva';
import { Select, Button, Table, Input, Form, TreeSelect, Icon, message, Pagination } from 'antd';
import axios from 'axios';
import * as Conf from '../../../utils/config';
import MayLayout from '../../../components/common/Layout/MayLayout';
import ComfirmModal from '../../../components/common/ConfirmModal/ConfirmModal';
import CollectModal from './CollectModal';
import DetailCameraModal from './DetailCameraModal';
import styles from './roleConfig.less';

const Option = Select.Option;
const { Column } = Table;

class Collect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: '',
      modalTitle: '新增采集端',
    };
  };
  componentDidMount() {
    this.props.dispatch({
      type: 'bussiness/getGroupTree'
    });
    this.props.dispatch({
      type: 'bussiness/getCollectList'
    });
    this.props.dispatch({
      type: 'bussiness/getAppnodeList'
    });
  }
  onSelectBlurChange = e => {
    const collectGroup = this.props.bussiness.collectGroup;
    const { searchCollectParams } = collectGroup;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        collectGroup: {
          ...collectGroup,
          searchCollectParams: {
            ...searchCollectParams,
            pageSize: 10,
            pageNo: 1,
            id_name_ip: e.target.value
          }
        }
      }
    });
  }
  onSelectOrgunit = value => {
    const collectGroup = this.props.bussiness.collectGroup;
    const { searchCollectParams } = collectGroup;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        collectGroup: {
          ...collectGroup,
          searchCollectParams: {
            ...searchCollectParams,
            pageSize: 10,
            pageNo: 1,
            orgunit: value ? value - 0 : ''
          }
        }
      }
    });
  }
  onSearchClick = () => {
    this.props.dispatch({
      type: 'bussiness/getCollectList'
    });
  };
  onAddBtnClick = () => {
    const collectGroup = this.props.bussiness.collectGroup;
    this.setState({
      action: 'newRole',
      modalTitle: '新增采集端',
    });
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        collectGroup: {
          ...collectGroup,
          addModalVisiable: true
        }
      }
    });
  };

  onIpChange = val => {
    const collectGroup = this.props.bussiness.collectGroup;
    const { addCollectParams } = collectGroup;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        collectGroup: {
          ...collectGroup,
          addCollectParams: {
            ...addCollectParams,
            ipAddress: val
          }
        }
      }
    });
  };
  onNameChange = val => {
    const collectGroup = this.props.bussiness.collectGroup;
    const { addCollectParams } = collectGroup;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        collectGroup: {
          ...collectGroup,
          addCollectParams: {
            ...addCollectParams,
            name: val
          }
        }
      }
    });
  };
  onValidChange = val => {
    const collectGroup = this.props.bussiness.collectGroup;
    const { addCollectParams } = collectGroup;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        collectGroup: {
          ...collectGroup,
          addCollectParams: {
            ...addCollectParams,
            validstring: val
          }
        }
      }
    });
  };
  onOrgunitIdChange = val => {
    const collectGroup = this.props.bussiness.collectGroup;
    const { addCollectParams } = collectGroup;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        collectGroup: {
          ...collectGroup,
          addCollectParams: {
            ...addCollectParams,
            orgunitId: val - 0
          }
        }
      }
    });
  }
  onMemoChange = val => {
    const collectGroup = this.props.bussiness.collectGroup;
    const { addCollectParams } = collectGroup;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        collectGroup: {
          ...collectGroup,
          addCollectParams: {
            ...addCollectParams,
            memo: val,
          }
        }
      }
    });
  };
  onAppnodeChange = val => {
    const collectGroup = this.props.bussiness.collectGroup;
    const { addCollectParams } = collectGroup;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        collectGroup: {
          ...collectGroup,
          addCollectParams: {
            ...addCollectParams,
            appId: val,
          }
        }
      }
    });
  };
  onAddClick = () => {
    const form = this.form;
    switch (this.state.action) {
      case 'newRole':
        form.validateFields((err, values) => {
          if (err) {
            return;
          }
          form.resetFields();
          this.props.dispatch({
            type: 'bussiness/addCollect'
          });
        });
        break;
      case 'editRole':
        form.validateFields((err, values) => {
          if (err) {
            return;
          }
          form.resetFields();
          this.props.dispatch({
            type: 'bussiness/modifyCollect'
          });
        });
        break;
      default:
        break;
    }
  };

  onCancel = () => {
    const collectGroup = this.props.bussiness.collectGroup;
    const form = this.form;
    form.resetFields();
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        collectGroup: {
          ...collectGroup,
          addCollectParams: {
            name: '',
            ipAddress: '',
            validstring: '',
            orgunitId: '',
            memo: '',
            appId: ''
          },
          addModalVisiable: false
        }
      }
    });
  }
  onCheckClick = record => {
    const server = this.props.bussiness.server;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        server: {
          ...server,
          searchCameraParam: {
            id: record.id
          },
          DetailCameraVisiable: true
        }

      }
    });
    this.props.dispatch({
      type: 'bussiness/getSrc'
    });
  };
  onEditClick = record => {
    this.setState({
      action: 'editRole',
      modalTitle: '编辑采集端',
    });
    const collectGroup = this.props.bussiness.collectGroup;
    const { addCollectParams } = collectGroup;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        collectGroup: {
          ...collectGroup,
          addModalVisiable: true,
          addCollectParams: {
            ...addCollectParams,
            id: record.id,
            name: record.name,
            ipAddress: record.url,
            validstring: record.validstring,
            appId: record.appId,
            orgunitId: record.orgName
          }
        }
      }

    });
  };
  onDeleteClick = record => {
    const collectGroup = this.props.bussiness.collectGroup;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        confirmVisiable: true,
        collectGroup: {
          ...collectGroup,
          deleteCollectParams: {
            id: record.id
          }
        }
      }
    });
  }
  onComfirmSubmit = () => {
    this.props.dispatch({
      type: 'bussiness/deleteCollect'
    });
  };
  onComfirmCancel = () => {
    const collectGroup = this.props.bussiness.collectGroup;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        confirmVisiable: false,
        collectGroup: {
          ...collectGroup,
          deleteCollectParams: {
            id: ''
          }
        }
      }
    });
  };
  onPingClick = record => {
    this.setState({
      loading: true,
      pingId: record.id
    });
    axios.get(`${Conf.API_PREFIX}/appnode/ping.do`, { params: { ip: record.url } })
      .then(res => {
        if (res.data.result === '正常') {
          message.success(`服务器${res.data.result}`);
        } else {
          message.error(`服务器${res.data.result}`);
        }

        this.setState({
          loading: false
        });
      });
  }
  onSrcIdChange = value => {
    const server = this.props.bussiness.server;
    const { cameraList } = server;
    let config = '';
    cameraList.map(item => {
      if (item.id == value) {
        config = item.config;
      }
    });
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        server: {
          ...server,
          modifyCameraParams: {
            id: value,
            config
          }

        }
      }
    });
  };
  onTextAreaChange = value => {
    const server = this.props.bussiness.server;
    const { modifyCameraParams } = this.props.bussiness.server;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        server: {
          ...server,
          modifyCameraParams: {
            ...modifyCameraParams,
            config: value
          }

        }
      }
    });
  }
  onDetailCameraSubmit = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.props.dispatch({
        type: 'bussiness/modifyCamera'
      });
      form.resetFields();
    });
  }
  onDetailCameraCancel = () => {
    const server = this.props.bussiness.server;
    const form = this.form;
    form.resetFields();
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        server: {
          ...server,
          modifyCameraParams: {
            id: '',
            config: ''
          },
          cameraList: [],
          DetailCameraVisiable: false
        }
      }
    });
  }

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
      type: 'bussiness/collectListTranslate',
      payload: {
        pageNo: page,
        pageSize: pageSize
      }
    });
  }

  tableOperation = record => (
    <div>
      <span title="查看摄像头" onClick={this.onCheckClick.bind(this, record)} className={`${styles.tableBtn} ${styles.tableCheck}`} />
      <span title="编辑采集端" onClick={this.onEditClick.bind(this, record)} className={`${styles.tableBtn} ${styles.tableEdit}`} />
      <span title="删除采集端" onClick={this.onDeleteClick.bind(this, record)} className={`${styles.tableBtn} ${styles.tableDelete}`} />
    </div>
  );
  renderSelectOptions = () => {
    let op = '';
    if (this.props.system.roleCfg && this.props.system.roleCfg.roleList) {
      if (this.props.system.roleCfg.roleList.length > 0) {
        op = this.props.system.roleCfg.roleList.map(value => (
          <Option value={value.id} key={value.id}>{value.name}</Option>
        ));
      }
    }
    return op;
  };
  renderPing = record => {
    if (record.id === this.state.pingId) {
      return (<div>
        {this.state.loading ? <Icon type="loading" /> : <a title="查看服务器状态" onClick={this.onPingClick.bind(this, record)} >查看</a>}
      </div>);
    }
    return (<div>
      <a title="查看服务器状态" onClick={this.onPingClick.bind(this, record)} >查看</a>
    </div>);
  }
  saveFormRef = form => {
    this.form = form;
  };
  render() {
    const collectGroup = this.props.bussiness.collectGroup;
    const searchCollectParams = collectGroup.searchCollectParams;
    return (
      <div>
        <div className={styles.content}>
          <div className={styles.searchBar}>
            <label className={styles.selectInput}>
              <span className={styles.label}>采集端编号/名称/IP地址：</span>
              <Input
                style={{
                  width: '10%',
                  marginRight: '45px'
                }}
                value={searchCollectParams.id_name_ip}
                onChange={this.onSelectBlurChange}
              />

            </label>
            <label className={styles.selectInput}>
              <span className={styles.label}>所属组织：</span>
              <TreeSelect
                style={{
                  width: '10%',
                  marginRight: '45px'
                }}
                dropdownMatchSelectWidth={false}
                allowClear
                value={`${searchCollectParams.orgunit ? searchCollectParams.orgunit : ''}`}
                onChange={this.onSelectOrgunit}
                treeData={this.props.bussiness.groupTree}
                treeDefaultExpandAll
              />
            </label>
            {/* <label className={styles.selectInput}>
              <span className={styles.label}>所属识别端：</span>
              <Select
                style={{
                  width: '10%',
                  marginRight: '45px'
                }}
                placeholder="请选择"
                onChange={this.onSelectAppnode}
                value={`${searchCollectParams.appId ? searchCollectParams.appId : ''}`}
              >
                {this.props.bussiness.appnodeList ? this.props.bussiness.appnodeList.map(v => <Option value={v.appId} key={v.appId} >>{v.name}</Option>) : []}
              </Select>
            </label> */}
            <Button type="primary" onClick={this.onSearchClick}>查询</Button>
          </div>
          <div className={`${styles.newRoleWapper} ${styles.clearfix}`}>
            <Button type="primary" className={styles.newRoleBtn} onClick={this.onAddBtnClick}><i className={styles.addIcon} />新增采集端</Button>
          </div>
          <div>
            <Table
              dataSource={this.props.bussiness.collectGroup && this.props.bussiness.collectGroup.collectList ?
                this.props.bussiness.collectGroup.collectList : []}
              pagination={false}
              bordered
              rowKey={record => record.id}
            >
              <Column
                title="序号"
                dataIndex="id"
                key="id" />
              <Column
                title="采集端名称"
                dataIndex="name"
                key="name" />
              <Column
                title="节点"
                dataIndex="nodeId"
                key="nodeId" />
              <Column
                title="标识串"
                dataIndex="validstring"
                key="validstring" />
              <Column
                title="所属识别端"
                dataIndex="appName"
                key="appName" />
              <Column
                title="所属组织"
                dataIndex="orgName"
                key="orgName" />
              <Column
                title="IP地址"
                dataIndex="url"
                key="url" />
              <Column
                title="状态"
                render={this.renderPing}
              />
              <Column
                title="摄像头数量"
                dataIndex="cameraSize"
                key="cameraSize" />
              <Column
                title="备注"
                dataIndex="memo"
                key="memo" />
              <Column
                title="操作"
                render={this.tableOperation}
              />
            </Table>
          </div>

          <Pagination
            className={styles.pagination}
            current={this.props.bussiness.collectGroup.collectPage.currentPage}
            showQuickJumper
            onChange={this.PaginationChange.bind(this)}
            defaultPageSize={10}
            itemRender={this.itemRender}
            showTotal={total => `共 ${total} 条`}
            total={this.props.bussiness.collectGroup.collectPage.total}
          />
        </div>
        <CollectModal
          action={this.state.action}
          visiable={this.props.bussiness.collectGroup.addModalVisiable}
          onCancel={this.onCancel}
          ref={this.saveFormRef}
          dataSource={this.props.bussiness.collectGroup.addCollectParams}
          appnodeAllList={this.props.bussiness.appnodeList}
          groupTree={this.props.bussiness.groupTree}
          onSubmit={this.onAddClick}
          validStrChange={this.onValidChange}
          nameChange={this.onNameChange}
          orgunitIdChange={this.onOrgunitIdChange}
          IpChange={this.onIpChange}
          modalTitle={this.state.modalTitle}
          memoChange={this.onMemoChange}
          appnodeChange={this.onAppnodeChange}
        />
        <DetailCameraModal
          visiable={this.props.bussiness.server.DetailCameraVisiable}
          dataSource={this.props.bussiness.server.modifyCameraParams}
          ref1={this.saveFormRef}
          cameraList={this.props.bussiness.server.cameraList}
          onSubmit={this.onDetailCameraSubmit}
          onSrcIdChange={this.onSrcIdChange}
          onTextAreaChange={this.onTextAreaChange}
          onCancel={this.onDetailCameraCancel}
        />

        <ComfirmModal
          visiable={this.props.bussiness.confirmVisiable}
          onSubmit={this.onComfirmSubmit}
          onCancel={this.onComfirmCancel}
        />
      </div>
    );
  }
}

function mapStateToProps({ bussiness }) {
  return { bussiness };
}

export default connect(mapStateToProps)(Collect);

