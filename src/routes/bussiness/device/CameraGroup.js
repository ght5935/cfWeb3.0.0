/**
 * Created by Jason on 2018/1/24.
 */
/**
 * Created by Jason on 2018/1/16.
 */
import React from 'react';
import { connect } from 'dva';
import { Button, Table, Input, Select, TreeSelect, Row, Col, Pagination } from 'antd';

import { GROUP_TYPE, POI_GROUP_PAGE_SIZE } from '../../../utils/config';
// import Pagination from '../../../components/common/PaginationView/PaginationView';
import ComfirmModal from '../../../components/common/ConfirmModal/ConfirmModal';
import styles from './CameraGroup.less';
import NewCameraGroupModal from './NewCameraGroupModal';
const { Column } = Table;
const { TreeNode } = TreeSelect;
const Option = Select.Option;

class CameraGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: '',
      modalTitle: '新建分组'
    };
  }
  onGroupChange = id => {
    let value = id - 0;
    if (!value) {
      value = '';
    }
    const { device } = this.props.bussiness;
    const { camreaGroup } = device;
    const { getCameraGroupListParams } = camreaGroup;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          camreaGroup: {
            ...camreaGroup,
            getCameraGroupListParams: {
              ...getCameraGroupListParams,
              orgunitId: value,
            },
          }
        }
      }
    });
  };
  onSearchBtnClick = () => {
    const { device } = this.props.bussiness;
    const { camreaGroup } = device;
    const { getCameraGroupListParams } = camreaGroup;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          camreaGroup: {
            ...camreaGroup,
            getCameraGroupListParams: {
              ...getCameraGroupListParams,
              pageNo: 1,
              pageSize: POI_GROUP_PAGE_SIZE
            }
          }
        }
      }
    });
    this.props.dispatch({
      type: 'bussiness/getCameraGroupList'
    });
  };
  onGroupNameChange = e => {
    const { device } = this.props.bussiness;
    const { camreaGroup } = device;
    const { getCameraGroupListParams } = camreaGroup;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          camreaGroup: {
            ...camreaGroup,
            getCameraGroupListParams: {
              ...getCameraGroupListParams,
              name: e.target.value
            }
          }
        }
      }
    });
  };
  onAddBtnClick = () => {
    const { device } = this.props.bussiness;
    const { camreaGroup } = device;
    this.setState({
      action: 'new',
      modalTitle: '新建分组'
    });
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          camreaGroup: {
            ...camreaGroup,
            addCamreaGroupModalVisiable: true
          }
        }
      }
    });

  };
  onEditClick = record => {
    const { device } = this.props.bussiness;
    const { camreaGroup } = device;
    const { addCamreaGroupParams } = camreaGroup;
    this.setState({
      action: 'edit',
      modalTitle: '编辑分组'
    });
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          camreaGroup: {
            ...camreaGroup,
            action: 'edit',
            addCamreaGroupParams: {
              ...addCamreaGroupParams,
              orgunitId: record.orgunitId,
              id: record.id,
              name: record.name,
              memo: record.memo,
            },
            addCamreaGroupModalVisiable: true
          }
        }
      }
    })
  };
  onDeleteClick = record => {
    const { device } = this.props.bussiness;
    const { camreaGroup } = device;
    this.setState({
      action: 'delete'
    });
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          camreaGroup: {
            ...camreaGroup,
            ids: record.id
          }
        },
        confirmVisiable2: true
      }
    });
  };
  onConfirmSubmit = () => {
    switch (this.state.action) {
      case 'delete':
        this.props.dispatch({
          type: 'bussiness/deleteCamreaGroup'
        });
        break;
    }
  };
  onConfirmCancel = () => {
    const { device } = this.props.bussiness;
    const { camreaGroup } = device;
    // TODO
    // 关闭confirm
    switch (this.state.action) {
      case 'delete':
        this.props.dispatch({
          type: 'bussiness/success',
          payload: {
            device: {
              ...device,
              camreaGroup: {
                ...camreaGroup,
                ids: '',
              }
            },
            confirmVisiable2: false
          }
        });
        break;
      case 'edit':
        this.props.dispatch({
          type: 'bussiness/success',
          payload: {
            device: {
              ...device,
              camreaGroup: {
                ...camreaGroup,
              }
            },
            confirmVisiable2: false
          }
        });
    }
  };
  onDeleteSelectGroupBtn = () => {
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        confirmVisiable2: true
      }
    });
    this.setState({
      action: 'delete'
    });
  };
  // pageTranslate = value => {
  //   this.props.dispatch({
  //     type: 'bussiness/camreaGroupPageTranslate',
  //     payload: {
  //       pageNo: value.pageNo,
  //       pageSize: value.pageSize
  //     }
  //   });
  // };
 
//控制分页 上下页
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
      type: 'bussiness/camreaGroupPageTranslate',
      payload: {
        pageNo: page,
        pageSize: pageSize
      }
    });
  }
  renderTableOperate = record => (
    <div>
      <span title="编辑分组" onClick={this.onEditClick.bind(this, record)} className={`${styles.tableBtn} ${styles.tableEdit}`} />
      <span title="删除分组" onClick={this.onDeleteClick.bind(this, record)} className={`${styles.tableBtn} ${styles.tableDelete}`} />
    </div>
  );


  render() {
    const { device } = this.props.bussiness;
    const { camreaGroup } = device;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.props.dispatch({
          type: 'bussiness/success',
          payload: {
            device: {
              ...device,
              camreaGroup: {
                ...camreaGroup,
                ids:  selectedRowKeys.toString()
              }
            }
          }
        });
      }
    };
    return (
      <div className={styles.content}>
        <Row className={styles.searchGroup}>
        <Col span={4} className={styles.condition}>
            <span className={styles.label}>分组名称：</span>
            <Input
              style={{
                width: '50%',

              }}
              // value={camreaGroup.getCameraGroupListParams.name}
              onChange={this.onGroupNameChange}
            />

          </Col>
          <Col span={4} className={styles.condition}>
            <span className={styles.label}>所属组织：</span>
            <TreeSelect
              style={{ width: '50%' }}
              allowClear
              onChange={this.onGroupChange}
              dropdownMatchSelectWidth={false}
              // value={camreaGroup.getCameraGroupListParams.orgunitId}
              treeData={this.props.bussiness && this.props.bussiness.groupTree ?
                this.props.bussiness.groupTree : []}
                treeDefaultExpandAll
            />
          </Col>
          <Button type="primary" style={{ marginLeft: '45px' }} onClick={this.onSearchBtnClick}>查询</Button>
        </Row>
        <div className={styles.btnBar}>
          <a className={styles.delete} onClick={this.onDeleteSelectGroupBtn}>
            <i className={styles.deleteIcon} />
            <span>删除选中分组</span>
          </a>
          <Button style={{ float: 'right', width: '125px' }} type="primary" onClick={this.onAddBtnClick}>
            <i className={styles.addIcon} />
            <span>新建分组</span>
          </Button>
        </div>
        <Table
          dataSource={device.camreaGroup.cameraGroupTableList}
          bordered
          pagination={false}
          rowKey={record => record.id}
          rowSelection={rowSelection}
        >
          {/* <Column
            title="序号"
            dataIndex="id"
            key="id"
          /> */}
          <Column
            title="分组名称"
            dataIndex="name"
            key="name"
          />
          <Column
            title="所属组织"
            dataIndex="orgunitName"
            key="orgunitName"
          />
          <Column
            title="设备数量"
            dataIndex="cameraCount"
            key="poiCount"
          />
          <Column
            title="备注"
            dataIndex="memo"
            key="memo"
          />
          <Column
            title="操作"
            render={record => this.renderTableOperate(record)}
          />
        </Table>
        {/* <Pagination
          className={styles.pagination}
          page={this.props.bussiness.device.camreaGroup.cameraGroupTablePage}
          pageTranslate={this.pageTranslate ? this.pageTranslate : null}
        /> */}
        <Pagination
          className={styles.pagination}
          current={camreaGroup.cameraGroupTablePage.currentPage}
          showQuickJumper
          onChange={this.PaginationChange.bind(this)}
          defaultPageSize={10}
          itemRender={this.itemRender}
          showTotal={total => `共 ${total} 条`}
          total={camreaGroup.cameraGroupTablePage.total}
        />
        <NewCameraGroupModal action={this.state.action} title={this.state.modalTitle} />
        <ComfirmModal
          visiable={this.props.bussiness.confirmVisiable2}
          onSubmit={this.onConfirmSubmit}
          onCancel={this.onConfirmCancel}
        />
      </div>
    );
  }
}

function mapStateToProps({ bussiness }) {
  return { bussiness };
}

export default connect(mapStateToProps)(CameraGroup);
