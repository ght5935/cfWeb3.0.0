/**
 * Created by Jason on 2018/1/24.
 */
import React from 'react';
import { connect } from 'dva';
import { Button, Table, Input, Select, InputNumber, Tooltip, TreeSelect, Pagination, Icon, message } from 'antd';

import { POI_PERSON_PAGE_SIZE } from '../../../utils/config';
// import Pagination from '../../../components/common/PaginationView/PaginationView';
import ComfirmModal from '../../../components/common/ConfirmModal/ConfirmModal';
import NewPersonModal from './NewPersonModal';
import NewPersonPictureModal from './NewPersonPictureModal';
import TrajectoryModal from './TrajectoryModal';
import DetailsModal from '../../basics/historyPass/DetailsModal';
import styles from './Target.less';

const { Column } = Table;
const { Option } = Select;
const { TreeNode } = TreeSelect;

class TargetPerson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: '',
      modalTitle: '新建目标',
      selectedListImg: [],
      showClick: false,
      selectedRowKeys: []
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'bussiness/getPoiList'
    });
    this.props.dispatch({
      type: 'bussiness/getAllGroups'
    });
    this.props.dispatch({
      type: 'bussiness/getGroupTree'
    });
  }
  componentWillUnmount() {
    const poiPerson = this.props.bussiness.poiPerson;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          selectedListImg: []
        }
      }
    });
  }
  onNameChange = e => {
    const poiPerson = this.props.bussiness.poiPerson;
    const { getPoiListParams } = poiPerson;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          getPoiListParams: {
            ...getPoiListParams,
            name: e.target.value
          }

        }
      }
    });
  };
  onIdCardChange = e => {
    const poiPerson = this.props.bussiness.poiPerson;
    const { getPoiListParams } = poiPerson;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          getPoiListParams: {
            ...getPoiListParams,
            identityCard: e.target.value
          }

        }
      }
    });
  };
  onSexChange = value => {
    const poiPerson = this.props.bussiness.poiPerson;
    const { getPoiListParams } = poiPerson;
    if (value !== '') {
      value -= 0;
    }
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          getPoiListParams: {
            ...getPoiListParams,
            gender: value
          }

        }
      }
    });
  };
  // onOrgunitsChange = id => {
  //   let value = id - 0;
  //   if (!value) {
  //     value = '';
  //   }
  //   const poiPerson = this.props.bussiness.poiPerson;
  //   const { getPoiListParams } = poiPerson;
  //   this.props.dispatch({
  //     type: 'bussiness/success',
  //     payload: {
  //       poiPerson: {
  //         ...poiPerson,
  //         getPoiListParams: {
  //           ...getPoiListParams,
  //           orgunitId: value
  //         }
  //       }
  //     }
  //   });
  // };
  onGroupChange = (value) => {
    const poiPerson = this.props.bussiness.poiPerson;
    const { getPoiListParams } = poiPerson;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          getPoiListParams: {
            ...getPoiListParams,
            groupId: value,
          }
        }
      }
    });
    this.setState({
      groupIdValue: value,
    })
  }
  onalarmThresholdChange = value => {
    const poiPerson = this.props.bussiness.poiPerson;
    const { getPoiListParams } = poiPerson;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          getPoiListParams: {
            ...getPoiListParams,
            threshold: value
          }

        }
      }
    });
  };
  onSearchBtnClick = () => {
    const poiPerson = this.props.bussiness.poiPerson;
    const { getPoiListParams } = poiPerson;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          getPoiListParams: {
            ...getPoiListParams,
            pageNo: 1,
            pageSize: POI_PERSON_PAGE_SIZE
          }
        }
      }
    });
    this.props.dispatch({
      type: 'bussiness/getPoiList'
    });
  };
  onDeleteSelectPersonBtn = () => {
    if (this.state.selectedRowKeys.length > 0) {
      this.props.dispatch({
        type: 'bussiness/success',
        payload: {
          confirmVisiable: true
        }
      });
      this.setState({
        action: 'delete'
      });
    } else {
      message.error('请先选中目标,再进行删除操作')
    }
  };
  onAddBtnClick = () => {
    const poiPerson = this.props.bussiness.poiPerson;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          addPoiModalVisiable: true
        }
      }
    });
    this.setState({
      action: 'new',
      modalTitle: '新建目标'
    });
  };
  onEditPictureClick = record => {
    const poiPerson = this.props.bussiness.poiPerson;
    let tmpImg = this.state.selectedListImg;
    if (record.imgs == null || record.imgs.length == 0) {
      const tmp = record.uploadImgs ? [...record.uploadImgs] : [];
      tmpImg = [...tmp];
    } else if (record.uploadImgs == null || record.uploadImgs.length == 0) {
      let tmp = [...record.imgs]
      tmpImg = [...tmp];
    } else {
      let tmp = [...record.imgs];
      tmpImg = tmp.concat(record.uploadImgs);
    }
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          isShowModal: true,
          selectedListImg: tmpImg,
          originListImg: tmpImg,
          personId: record.personId
        }
      }
    });
  }
  onEditClick = record => {
    const poiPerson = this.props.bussiness.poiPerson;
    let y = '';
    if (record.groups && record.groups.length == 1) {
      y = record.groups[0].id
    } else {
      record.groups.map(v => {
        if (!v.default) {
          y = v.id
        }
      })
    }
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          addPoiParams: {
            personId: record.personId,
            faceCount: 1,
            originCount: 0,
            img_path_1: record.uploadFiles ? record.uploadFiles[0] : '',
            originImg_path_1: '',
            name: record.name,
            gender: record.gender === '男' ? '1' : '0',
            threshold: record.alarmThreshold,
            groupId: y ? `${record.orgunitList[0].id}-${y}` : '',
            // orgunitId: record.orgunitList ? record.orgunitList[0].id : '',
            identityCard: record.identityCard,
            impTag: record.impTag,
            memo: record.memo,
          },
          addPoiModalVisiable: true,
          imageUrl: record.uploadImgs ? record.uploadImgs[0] : record.imgs[0]
        }
      }
    });
    this.setState({
      action: 'edit',
      modalTitle: '编辑目标'
    });
  };
  onDeleteClick = record => {
    const poiPerson = this.props.bussiness.poiPerson;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        confirmVisiable: true,
        poiPerson: {
          ...poiPerson,
          deletePerson: {
            type: 0,
            personIds: record.personId
          }
        }
      }
    });
    this.setState({
      action: 'delete'
    });
  };
  onConfirmSubmit = () => {
    switch (this.state.action) {
      case 'delete':
        this.props.dispatch({
          type: 'bussiness/deletePoi'
        });
        break;
    }
  };
  onConfirmCancel = () => {
    const poiPerson = this.props.bussiness.poiPerson;
    // TODO
    // 关闭confirm
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          deletePerson: {
            type: 0,
            personIds: ''
          }
        },
        confirmVisiable: false
      }
    });
  };

  renderCameraNode = data => data.map(item => {
    return <TreeNode
      key={`${item.id}-${item.name}`}
      value={`${item.orgunitId}-${item.id}`}
      title={<div><Icon type="team" style={{ paddingRight: 6, color: '#1890ff', fontSize: 18 }} />{item.name}</div>}
    />;
  });
  // 生成树
  renderTreeNode = data => data.map(item => {
    if (item.children) {
      return (
        <TreeNode key={item.id} value={String(item.id)} title={<div><i className={styles.treeNode} />{item.title}</div>} disabled >
          {item.objectList ? this.renderCameraNode(item.objectList) : ''}
          {this.renderTreeNode(item.children)}
        </TreeNode>
      );
    }
    if (item.objectList) {
      return (
        <TreeNode key={`${item.id}-${item.name}`} title={<div><i className={styles.treeNode} />{item.title}</div>} disabled>
          {this.renderCameraNode(item.objectList)}
        </TreeNode>
      );
    }
    return <TreeNode
      key={`${item.id}-${item.value}`}
      title={<div>{item.title}</div>}
      value={`${item.id}-${item.value}`}
      disabled
    />;
  });

  renderTableImg = record => (<div className={styles.tableImgBorder} onClick={this.onEditPictureClick.bind(this, record)}>
    <img
      style={{ width: '100%', height: '100%' }}
      src={record.uploadImgs && record.uploadImgs.length > 0 ? record.uploadImgs[0] : record.imgs ? record.imgs[0] : []} alt="" />
  </div>);
  renderTableOrgunits = record => {
    const Orgunits = [];
    if (record.orgunitList && record.orgunitList.length > 0) {
      record.orgunitList.map(value => Orgunits.push(value.name));
    }
    return (<Tooltip key={record.id} overlayStyle={{ backGroundColor: 'rgba(0,0,0,0.9)' }} title={Orgunits.join(',')}>
      {Orgunits.map(value => <span key={value}>{value}</span>)}
    </Tooltip >);
  };
  renderTableGroups = record => {
    let groupName = '';
    try {
      if (record.groups && record.groups.length == 1) {
        groupName = record.groups[0].name;
      } else {
        record.groups.map(v => {
          if (!v.default) {
            groupName = v.name
          }
        })
      }
    } catch (err) {

    }
    return (<Tooltip key={record.id} overlayStyle={{ backGroundColor: 'rgba(0,0,0,0.9)' }} title={groupName}>
      {<span>{groupName}</span>}
    </Tooltip >);
  };
  renderTableOperate = record => (
    <div>
      <span title="编辑目标" onClick={this.onEditClick.bind(this, record)} className={`${styles.tableBtn} ${styles.tableEdit}`} />
      <span title="删除目标" onClick={this.onDeleteClick.bind(this, record)} className={`${styles.tableBtn} ${styles.tableDelete}`} />
    </div>
  );
  onAClick = (record) => {
    console.log(record);

    const poiPerson = this.props.bussiness.poiPerson;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          matchPersonId: record.personId,
          trajectoryModalVisible: true
        }
      }
    })
    this.props.dispatch({
      type: 'bussiness/matchPerson2Facetrack'
    })
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
      type: 'bussiness/poiPersonPageTranslate',
      payload: {
        pageNo: page,
        pageSize: pageSize
      }
    });
  }
  /**
   *
   * 未修改
   * 
   */
  toggleClass = value => {
    const checkTakeImgs = this.props.bussiness.poiPerson.checkTakeImgs;
    const checkTake = checkTakeImgs || [];
    let imgsName = [];
    imgsName = value.split('fn=');
    if (checkTake.indexOf(imgsName[1]) !== -1) {
      return styles.selectImg;
    }
    return styles.notSelectImg;
  }
  checkImgs = value => {
    const poiPerson = this.props.bussiness.poiPerson;
    const checkTakeImgs = this.props.bussiness.poiPerson.checkTakeImgs;
    const originImgs = this.props.bussiness.poiPerson.originImgs;
    const checkTake = checkTakeImgs || [];

    let imgsName = [];
    imgsName = value.split('fn=');
    if (checkTake.indexOf(imgsName[1]) === -1) {
      checkTake.push(imgsName[1]);
      originImgs.push(value);
    } else {
      const index = checkTake.indexOf(imgsName[1]);
      checkTake.splice(index, 1);
      originImgs.splice(index, 1);
    }
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          checkTakeImgs: checkTake
        }
      }
    });
  }
  onCancel = () => {
    const poiPerson = this.props.bussiness.poiPerson;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          trajectoryModalVisible: true,
          detailFaceModalVisible: false,
        }
      }
    })
  }
  clickBindBtn = () => {
    const poiPerson = this.props.bussiness.poiPerson;
    const bindFacetrack = poiPerson.bindFacetrack;
    const checkTakeImgs = poiPerson.checkTakeImgs;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          bindFacetrack: {
            ...bindFacetrack,
            imgNames: checkTakeImgs.join(','),
            personId: poiPerson.matchPersonId
          }
        }

      }
    });
    setTimeout(() => {
      this.props.dispatch({
        type: 'bussiness/bindFacetrack'
      });
    }, 300);
  }
  render() {
    const { getPoiListParams } = this.props.bussiness.poiPerson;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        const poiPerson = this.props.bussiness.poiPerson;
        const type = 0;// TODO
        this.props.dispatch({
          type: 'bussiness/success',
          payload: {
            poiPerson: {
              ...poiPerson,
              deletePerson: {
                type,
                personIds: selectedRowKeys.toString()
              }
            }
          }
        });
        this.setState({
          selectedRowKeys
        })
      }
    };
    return (
      <div className={styles.content}>
        <div className={styles.searchBar} >
          <label className={styles.selectInput}>
            <span className={styles.label}>姓名：</span>
            <Input
              style={{ width: '10rem', marginRight: '5px' }}
              value={getPoiListParams.name}
              onChange={this.onNameChange}
            />
          </label>
          <label className={styles.selectInput}>
            <span className={styles.label}>身份证号：</span>
            <Input
              style={{ width: '13rem', marginRight: '5px' }}
              value={getPoiListParams.identityCard}
              onChange={this.onIdCardChange}
            />
          </label>
          <label className={styles.selectInput}>
            <span className={styles.label}>性别：</span>
            <Select
              style={{ width: '10rem', marginRight: '5px' }}
              value={`${getPoiListParams.gender}`}
              onChange={this.onSexChange}
            >
              <Option value="">全部</Option>
              <Option value="1">男</Option>
              <Option value="0">女</Option>
            </Select>
          </label>

          <label className={styles.selectInput}>
            <span className={styles.label}>所属分组：</span>
            <TreeSelect
              style={{ width: '10rem', marginRight: '5px', maxHeight: '32px', overflow: 'auto', verticalAlign: 'middle' }}
              allowClear
              treeDefaultExpandAll
              dropdownMatchSelectWidth={false}
              value={getPoiListParams.groupId ? `${this.state.groupIdValue}` : ''}
              onChange={this.onGroupChange}
              placeholder="请选择分组"
              treeCheckStrictly={true}
            >
              {this.renderTreeNode(this.props.bussiness && this.props.bussiness.poiGroup.allGroups ? this.props.bussiness.poiGroup.allGroups : [])}
            </TreeSelect>
          </label>
          <label className={styles.selectInput}>
            <span className={styles.label}>阈值：</span>
            <InputNumber
              min={0}
              max={100}
              style={{ width: '5rem', verticalAlign: 'middle' }}
              value={getPoiListParams.threshold}
              onChange={this.onalarmThresholdChange}
            />
          </label>
          <Button type="primary" style={{ marginLeft: '45px' }} onClick={this.onSearchBtnClick}>查询</Button>
        </div>
        <div className={styles.btnBar}>
          <a className={styles.delete} onClick={this.onDeleteSelectPersonBtn}>
            <i className={styles.deleteIcon} />
            <span>删除选中目标</span>
          </a>
          <Button style={{ float: 'right', width: '125px' }} type="primary" onClick={this.onAddBtnClick}>
            <i className={styles.addIcon} />
            <span>新建目标</span>
          </Button>
        </div>
        <Table
          dataSource={this.props.bussiness.poiPerson.poiPersonList}
          bordered
          pagination={false}
          rowKey={record => record.personId}
          rowSelection={rowSelection}
        >

          <Column
            title="照片"
            render={record => this.renderTableImg(record)}
          />
          <Column
            title="姓名"
            dataIndex="name"
            key="name"
          />
          <Column
            title="身份证号"
            dataIndex="identityCard"
            key="identityCard"
          />
          <Column
            title="性别"
            dataIndex="gender"
            key="gender"
          />
          <Column
            title="户籍"
            dataIndex="household_register"
            key="household_register"
          />
          {/* <Column
            title="所属组织"
            render={record => this.renderTableOrgunits(record)}
              /> */}
          <Column
            title="所属分组"
            render={record => this.renderTableGroups(record)}
          />
          <Column
            title="阈值"
            dataIndex="alarmThreshold"
            key="alarmThreshold"
          />
          <Column
            title="人脸序列"
            render={record => <div>
              <a onClick={this.onAClick.bind(this, record)}>查看</a>
            </div>}
          />
          <Column
            title="操作"
            render={record => this.renderTableOperate(record)}
          />
        </Table>
        {/* <Pagination
          className={styles.pagination}
          page={this.props.bussiness.poiPerson.poiPersonPage}
          pageTranslate={this.pageTranslate ? this.pageTranslate : null}
        /> */}
        <Pagination
          className={styles.pagination}
          current={this.props.bussiness.poiPerson.poiPersonPage.currentPage}
          showQuickJumper
          onChange={this.PaginationChange.bind(this)}
          defaultPageSize={6}
          itemRender={this.itemRender}
          showTotal={total => `共 ${total} 条`}
          total={this.props.bussiness.poiPerson.poiPersonPage.total}
        />
        <ComfirmModal
          visiable={this.props.bussiness.confirmVisiable}
          onSubmit={this.onConfirmSubmit}
          onCancel={this.onConfirmCancel}
        />
        <NewPersonModal action={this.state.action} title={this.state.modalTitle} />

        {/* 目标图片处理弹窗 */}
        <NewPersonPictureModal />
        {/* 目标匹配人脸轨迹弹窗 */}
        <TrajectoryModal />

        <DetailsModal
          visible={this.props.bussiness.poiPerson.detailFaceModalVisible}
          data={this.props.bussiness.poiPerson.trajectoryData ? this.props.bussiness.poiPerson.trajectoryData : null}
          checkImgs={this.checkImgs}
          deleteTakeImgs={this.deleteTakeImgs}
          bindFacetrack={this.bindFacetrack}
          isNeedTarget={false}

          clickBindBtn={this.clickBindBtn}
          onCancel={this.onCancel}
          addTarget={this.addTargetModal}
          toggleClass={this.toggleClass}
          messageToggleClass={this.messageToggleClass}
        />

      </div>
    );
  }
}

function mapStateToProps({ bussiness }) {
  return { bussiness };
}

export default connect(mapStateToProps)(TargetPerson);
