
import React from 'react';
import { connect } from 'dva';
import axios from 'axios';
import { Input, Button, Icon, Row, Col, Select, Table, TreeSelect, message, Switch, Pagination } from 'antd';
import { CAMERA_CONFIG } from '../../../utils/config';
import styles from './Device.less';
import * as Conf from '../../../utils/config';
import AddCameraModule from './AddCameraModule';
import ComfirmModal from '../../../components/common/ConfirmModal/ConfirmModal';
// import Pagination from '../../../components/common/PaginationView/PaginationView';


const { Option, OptGroup } = Select;
const { Column } = Table;
const { TreeNode } = TreeSelect;
class DeviceGroup extends React.Component {
  constructor(props) { 
    super(props);
    this.state = {
      loading: false,
      modalWidth: 530,
      arrowShow: undefined,
      textAreaShow: undefined,
      playTestVisit: false,
      cjdTestVisit: false
    }
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'bussiness/getCameraList'
    });
    this.props.dispatch({
      type: 'bussiness/getGroupTree'
    });
  }
  componentWillUnmount() {
    const device = this.props.bussiness.device;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          getCameraParams: {
            pageSize: 10,
            pageNo: 1,
            name: '',
            id: '',
            orgunitId: '',
            ip_address: '',
            flag: ''
          }
        }
      }
    });
  }
  onAddBtnClick = () => {
    this.setState({
      action: 'newDevice'
    });
    const device = this.props.bussiness.device;
    const { modifyCamera, camreaGroup } = device;
   
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          addCameraModule: true,
          modifyCamera: {
            ...modifyCamera,
            name: '',
            modelType: '',
            orgunit_id: '',
            ipAddress: '',
            playUrl: '',
            cjdUrl: '',
            cameraUsername: '',
            cameraPassword: '',
            memo: '',
            cjdUuid: '',
            cjdSubid: '',
            categoryId: '',
          },
          camreaGroup: {
            ...camreaGroup,
            modifygroupNameTree: []
          }

        }
      }
    });
    this.props.dispatch({
      type: 'bussiness/getcameradefaultconfig'
    })
  }
  onAddModalCancel = () => {
    const device = this.props.bussiness.device;
    const { camreaGroup } = device;
    this.setState({
      modalWidth: 530,
      arrowShow: undefined,
      textAreaShow: undefined
    })
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          addCameraModule: false,
          // modifyCamera: {
          //   name: '',
          //   modelType: '',
          //   orgunit_id: '',
          //   ipAddress: '',
          //   playUrl: '',
          //   cjdUrl: '',
          //   cameraUsername: '',
          //   cameraPassword: '',
          //   memo: '',
          //   cjdUuid: '',
          //   cjdSubid: '',
          //   config: '',
          //   categoryId: ''
          // },
          // camreaGroup:{
          //   ...camreaGroup,
          //   modifygroupNameTree: []
          // }
        }
      }
    });
  }
  onAddSubmit = () => {
    switch (this.state.action) {
      case 'newDevice':
        this.props.dispatch({
          type: 'bussiness/addCamera'
        });
        break;
      case 'editDevice':
        this.props.dispatch({
          type: 'bussiness/modifyCamrea'
        });
        break;
      default:
        break;
    }
  }
  onSearchId = e => {
    const device = this.props.bussiness.device;
    const { getCameraParams } = device;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          getCameraParams: {
            ...getCameraParams,
            pageSize: 10,
            pageNo: 1,
            id: e.target.value
          }
        }
      }
    });
  }
  onSearchName = e => {
    const device = this.props.bussiness.device;
    const { getCameraParams } = device;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          getCameraParams: {
            ...getCameraParams,
            pageSize: 10,
            pageNo: 1,
            name: e.target.value
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
    const device = this.props.bussiness.device;
    const { getCameraParams } = device;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          getCameraParams: {
            ...getCameraParams,
            pageSize: 10,
            pageNo: 1,
            orgunitId: value,
            groupId: ''
          }
        }
      }
    });
    this.props.dispatch({
      type: 'bussiness/getGroupNameTree'
    });
  };
  onSelectGroupChange = (value) => {
    const device = this.props.bussiness.device;
    const { getCameraParams } = device;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          getCameraParams: {
            ...getCameraParams,
            groupId: value
          }
        }
      }
    });
  };

  onSearchIpAds = e => {
    const device = this.props.bussiness.device;
    const { getCameraParams } = device;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          getCameraParams: {
            ...getCameraParams,
            pageSize: 10,
            pageNo: 1,
            ip_address: e.target.value
          }
        }
      }
    });
  };
  onSelectFlagChange = (value) => {
    const device = this.props.bussiness.device;
    const { getCameraParams } = device;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          getCameraParams: {
            ...getCameraParams,
            flag: value
          }
        }
      }
    });
  };
  onSearchClick = () => {
    this.props.dispatch({
      type: 'bussiness/getCameraList'
    });
  }
  onEditClick = record => {
    this.setState({
      action: 'editDevice'
    });
    const device = this.props.bussiness.device;
    const { modifyCamera } = device;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          addCameraModule: true,
          modifyCamera: {
            ...modifyCamera,
            srcId: record.srcId,
            name: record.name,
            modelType: record.modelType,
            orgunit_id: record.orgunitId,
            ipAddress: record.ipAddress,
            playUrl: record.playUrl,
            cjdUrl: record.cjdUrl,
            cameraUsername: record.cameraUsername,
            cameraPassword: record.cameraPassword,
            memo: record.memo,
            cjdUuid: record.cjdUuid,
            cjdSubid: record.cjdSubid,
            config: record.config,
            categoryId: record.categoryId - 0,
          }
        }
      }
    });
    this.props.dispatch({
      type: 'bussiness/modifyGroupNameTree'
    });
  }
  onOneDeleteClick = record => {
    const device = this.props.bussiness.device;
    const { deleteCamrea } = device;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        confirmVisiable: true,
        device: {
          ...device,
          deleteCamrea: {
            srcId: record.srcId
          }
        }
      }
    });
  };
  tableOperation = record => (
    <div>
      <span title="编辑设备" onClick={this.onEditClick.bind(this, record)} className={`${styles.tableBtn} ${styles.tableEdit}`} />
      <span title="删除设备" onClick={this.onOneDeleteClick.bind(this, record)} className={`${styles.tableBtn} ${styles.tableDelete}`} />
    </div>
  );
  onPingClick = record => {
    this.setState({
      loading: true,
      pingId: record.id
    });
    axios.get(`${Conf.API_PREFIX}/appnode/ping.do`, { params: { ip: record.ipAddress } })
      .then(res => {
        if (res.data.result === '正常') {
          message.success(`摄像头${res.data.result}`);
        } else {
          if (res.data.message === "无效的 ip")
            message.error(`${res.data.message}`);
          else {
            message.error('摄像头异常');
          }
        }

        this.setState({
          loading: false
        });
      });
  }
  flagChange = record => {
    if (record.id === this.state.pingId) {
      return (<div>
        {this.state.loading ? <Icon type="loading" /> : <a title="查看服务器状态" onClick={this.onPingClick.bind(this, record)} >查看</a>}
      </div>);
    }
    return (<div>
      <a title="查看服务器状态" onClick={this.onPingClick.bind(this, record)} >查看</a>
    </div>);
  }
  pageTranslate = value => {
    // this.props.dispatch({
    //   type: 'bussiness/cameraListTranslate',
    //   payload: {
    //     pageNo: value.pageNo,
    //     pageSize: value.pageSize
    //   }
    // });
  };
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
      type: 'bussiness/cameraListTranslate',
      payload: {
        pageNo: page,
        pageSize: pageSize
      }
    });
  }
  cameraNameChange = value => {
    const device = this.props.bussiness.device;
    const { modifyCamera } = device;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          modifyCamera: {
            ...modifyCamera,
            name: value
          }
        }
      }
    });
  };

  brandChange = value => {
    const device = this.props.bussiness.device;
    const { modifyCamera } = device;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          modifyCamera: {
            ...modifyCamera,
            modelType: value
          }
        }
      }
    });
  }
  ipChange = value => {
    const device = this.props.bussiness.device;
    const { modifyCamera } = device;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          modifyCamera: {
            ...modifyCamera,
            ipAddress: value
          }
        }
      }
    });
  }
  manageCameraNameChange = value => {
    const device = this.props.bussiness.device;
    const { modifyCamera } = device;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          modifyCamera: {
            ...modifyCamera,
            cameraUsername: value
          }
        }
      }
    });
  }
  manageCameraPswChange = value => {
    const device = this.props.bussiness.device;
    const { modifyCamera } = device;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          modifyCamera: {
            ...modifyCamera,
            cameraPassword: value
          }
        }
      }
    });
  }
  playURLChange = value => {
    const device = this.props.bussiness.device;
    const { modifyCamera } = device;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          modifyCamera: {
            ...modifyCamera,
            playUrl: value
          }
        }
      }
    });
  }
  cjdURLChange = value => {
    const device = this.props.bussiness.device;
    const { modifyCamera } = device;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          modifyCamera: {
            ...modifyCamera,
            cjdUrl: value
          }
        }
      }
    });
  }
  cjdUuIdChange = value => {
    const device = this.props.bussiness.device;
    const { modifyCamera } = device;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          modifyCamera: {
            ...modifyCamera,
            cjdUuid: value
          }
        }
      }
    });
  }
  cjdSubIdChange = value => {
    const device = this.props.bussiness.device;
    const { modifyCamera } = device;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          modifyCamera: {
            ...modifyCamera,
            cjdSubid: value
          }
        }
      }
    });
  }
  configChange = value => {
    const device = this.props.bussiness.device;
    const { modifyCamera } = device;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          modifyCamera: {
            ...modifyCamera,
            config: value
          }
        }
      }
    });
  }
  orgunitIdChange = value => {
    if (value == undefined){
      value = ''
    }
    const device = this.props.bussiness.device;
    const { modifyCamera } = device;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          modifyCamera: {
            ...modifyCamera,
            orgunit_id: value,
            categoryId: '',
          }
        }
      }
    });
    this.props.dispatch({
      type: 'bussiness/modifyGroupNameTree'
    });
  }
  onComfirmSubmit = () => {
    this.props.dispatch({
      type: 'bussiness/deleteCamrea'
    });
  };
  onComfirmCancel = () => {
    const device = this.props.bussiness.device;
    const { deleteCamrea } = device;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        confirmVisiable: false,
        device: {
          ...device,
          deleteCamrea: {
            srcId: ''
          }
        }
      }
    });
  };
  switchOnChange = (record) => {
    let that = this;
    let onChange = function (checked) {
      that.changeStatus(record.srcId);
    };

    return onChange;

  };
  changeStatus = (srcId) => {
    this.props.dispatch({
      type: 'bussiness/changeStatus',
      payload: { srcId }
    });
  };
  onGroupChange = (value) => {
    const device = this.props.bussiness.device;
    const { modifyCamera } = device;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          modifyCamera: {
            ...modifyCamera,
            // groupId: value,
            categoryId: value - 0,
          }
        }
      }
    });
  }
  changeModalWidth = () => {
    this.setState({
      modalWidth: 860,
      arrowShow: 'arrowShow',
      textAreaShow: 'textAreaShow'
    })
  }

  changePlayTestVisiable = (visible) => {
    this.setState({
      playTestVisit: visible
    })
  }
  changeCjdTestVisiable = (visible) => {
    this.setState({
      cjdTestVisit: visible
    })
  }
  render() {
    const { device } = this.props.bussiness;
    const { camreaGroup } = device;
    return (
      <div className={styles.content}>
        <Row className={styles.searchGroup}>
          {/* <Col span={3} className={styles.condition}>
            <span className={styles.label}>摄像头编号</span>
            <Input
              onChange={this.onSearchId}
              style={{width: '50%'}}/>
          </Col> */}
          <Col span={4} className={styles.condition}>
            <label className={styles.label}>摄像头名称：</label>
            <Input
              onChange={this.onSearchName}
              style={{ width: '50%' }} />
          </Col>
          <Col span={4} className={styles.condition}>
            <label className={styles.label}>所属组织：</label>
            <TreeSelect
              allowClear
              treeData={this.props.bussiness && this.props.bussiness.groupTree ?
                this.props.bussiness.groupTree : []}
              // className={styles.input}
              style={{ width: '50%' }}
              dropdownMatchSelectWidth={false}
              onChange={this.onSearchOrgunit}
              treeDefaultExpandAll
            />
          </Col>
          <Col span={4} className={styles.condition}>
            <label className={styles.label}>分组名称：</label>
            <Select
              style={{ width: '50%' }}
              onChange={this.onSelectGroupChange}
              value={camreaGroup.groupNameTree && camreaGroup.groupNameTree.length > 0 ? `${device.getCameraParams.groupId}` : ''}
            >
              <Option value=''>全部</Option>
              {camreaGroup.groupNameTree && camreaGroup.groupNameTree.length > 0 ?
                camreaGroup.groupNameTree.map((value, i) =>
                  <Option
                    key={i}
                    value={`${value.id}`}>{value.name}</Option>
                ) : null}
            </Select>
          </Col>
          <Col span={4} className={styles.condition}>
            <label className={styles.label}>ip地址：</label>
            <Input
              onChange={this.onSearchIpAds}
              style={{ width: '50%' }}
            />
          </Col>
          <Col span={4} className={styles.condition}>
            <label className={styles.label}>采集状态：</label>
            <Select
              style={{ width: '50%' }}
              onChange={this.onSelectFlagChange}
            >
              <Option value=''>全部</Option>
              <Option value={1}>开</Option>
              <Option value={0}>关</Option>
              {/*{this.renderSelectOptions()}*/}
            </Select>
          </Col>
          <Button type="primary"
            onClick={this.onSearchClick}
          >查询</Button>
        </Row>
        <div className={styles.btnGroup}>
          <Button style={{ width: '125px' }} className={styles.delete} type="primary"
            onClick={this.onAddBtnClick}
          >
            <i className={styles.addIcon} />
            <span>新建摄像头</span>
          </Button>
          {/* <Button type="primary" className={styles.delete}>
            <i className={styles.importIcon} />
            导入
          </Button>
          <Button type="primary" className={styles.delete}>
            <i className={styles.exportIcon} />
            导出
          </Button> */}

        </div>
        <div className={styles.list}>
          <Table
            dataSource={this.props.bussiness.device && this.props.bussiness.device.cameraTableList ?
              this.props.bussiness.device.cameraTableList : []}
            pagination={false}
            bordered
            rowKey={record => record.id}
          >
            {/* <Column
              title="摄像头编号"
              width="110px"
              dataIndex="id"
              key="id"/> */}
            <Column
              title="摄像头名称"
              dataIndex="name"
              key="name" />
            <Column
              title="所属组织"
              dataIndex="orgunitName"
              key="orgunitName" />
            <Column
              title="分组名称"
              dataIndex="categoryName"
              key="categoryName" />
            {/* <Column
              title="播放流地址"
              dataIndex="playUrl"
              width="400px"
              key="playUrl"
            /> */}
            <Column
              title="IP地址"
              dataIndex="ipAddress"
              key="ipAddress" />
            <Column
              title="采集流地址"
              dataIndex="cjdUrl"
              width="600px"
              key="cjdUrl" />

            <Column
              title="状态"
              render={this.flagChange}
            />
            <Column
              title="采集"
              render={(record) => <Switch onChange={this.switchOnChange(record)} checked={!!record.flag}
                checkedChildren={'开'}
                unCheckedChildren={'关'} />}
            />
            <Column
              title="备注"
              dataIndex="memo"
              key="memo" />
            <Column
              title="操作"
              render={this.tableOperation}
            />
          </Table>
          <AddCameraModule
            modalWidth={this.state.modalWidth}
            visiable={this.props.bussiness.device.addCameraModule}
            dataSource={this.props.bussiness.device.modifyCamera}
            groupTree={this.props.bussiness && this.props.bussiness.groupTree ?
              this.props.bussiness.groupTree : []}
            onAddModalCancel={this.onAddModalCancel}
            cameraNameChange={this.cameraNameChange}
            brandChange={this.brandChange}
            ipChange={this.ipChange}
            manageCameraNameChange={this.manageCameraNameChange}
            manageCameraPswChange={this.manageCameraPswChange}
            playURLChange={this.playURLChange}
            cjdURLChange={this.cjdURLChange}
            cjdUuIdChange={this.cjdUuIdChange}
            cjdSubIdChange={this.cjdSubIdChange}
            configChange={this.configChange}
            orgunitIdChange={this.orgunitIdChange}
            selectGroupChange={this.onGroupChange}
            modifygroupNameTree={this.props.bussiness.device.camreaGroup.modifygroupNameTree || []}
            onSubmit={this.onAddSubmit}
            changeModalWidth={this.changeModalWidth}
            arrowShow={this.state.arrowShow}
            textAreaShow={this.state.textAreaShow}
            changePlayTestVisiable={this.changePlayTestVisiable}
            changeCjdTestVisiable={this.changeCjdTestVisiable}
            playTestVisit={this.state.playTestVisit}
            cjdTestVisit={this.state.cjdTestVisit}
          />

        </div>
        {/* <Pagination
          className={styles.pagination}
          page={this.props.bussiness.device.cameraTablePage}
          pageTranslate={this.pageTranslate ? this.pageTranslate : null}
        /> */}
        <Pagination
          className={styles.pagination}
          current={this.props.bussiness.device.cameraTablePage.currentPage}
          showQuickJumper
          onChange={this.PaginationChange.bind(this)}
          defaultPageSize={10}
          itemRender={this.itemRender}
          showTotal={total => `共 ${total} 条`}
          total={this.props.bussiness.device.cameraTablePage.total}
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

export default connect(mapStateToProps)(DeviceGroup);
