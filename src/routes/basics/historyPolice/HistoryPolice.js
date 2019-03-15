/**
 * Created by Ethan on 2018/1/15.
 */
import React from 'react';
import { connect } from 'dva';
import { Input, Button, Radio, Icon, Row, Col, Select, TreeSelect, InputNumber, DatePicker, Form, Pagination } from 'antd';
import MayLayout from '../../../components/common/Layout/MayLayout';
import styles from './historyPolice.less';
import FaceCardContent from './FaceCardContent';
import AlarmDetailsModal from '../historyPolice/AlarmDetailsModal';
import AddTargetModal from '../historyPass/AddTargetModal';
import TakeImgDetail from './TakeImgDetail';
import moment from 'moment';
// import Pagination from '../../../components/common/PaginationView/PaginationView';
import { timestampToTime } from '../../../utils/utils';
import Utils from '../../../iconfont/icon/iconfont.css'
const { RangePicker } = DatePicker;
const { TreeNode } = TreeSelect;
const { Option } = Select;

class HistoryPolice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sizeDate: 'all',
      beginTime: '',
      overTime: ''
    };
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'basics/getAlarmList'
    });
    this.props.dispatch({
      type: 'basics/getGroupTrees'
    });
  }

  componentWillUnmount() {
    const historyPolice = this.props.basics.historyPolice;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPolice: {
          ...historyPolice,
          getAlarmListParams: {
            pageSize: 10,
            pageNo: 1,
            orgunitId: '',
            srcIds: [],
            startTime: '',
            endTime: '',
            startPercent: 0,
            endPercent: 100,
            name: '',
            idCard: '',
            gender: '',
            age: '',
            isglasses: '',
            ismoustache: '',
            ishat: ''
          }
        }
      }
    });
  }

  toggleClass = value => {
    const checkTakeImgs = this.props.basics.checkTakeImgs;
    const checkTake = checkTakeImgs || [];
    let imgsName = [];
    imgsName = value.split('fn=');
    if (checkTake.indexOf(imgsName[1]) !== -1) {
      return styles.selectImg;
    }
    return styles.notSelectImg;
  }

  onNameChange = e => {
    const historyPolice = this.props.basics.historyPolice;
    const { getAlarmListParams } = historyPolice;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPolice: {
          ...historyPolice,
          getAlarmListParams: {
            ...getAlarmListParams,
            pageSize: 10,
            pageNo: 1,
            name: e.target.value
          }
        }
      }
    });
  }
  onGenderChange = value => {
    const historyPolice = this.props.basics.historyPolice;
    const { getAlarmListParams } = historyPolice;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPolice: {
          ...historyPolice,
          getAlarmListParams: {
            ...getAlarmListParams,
            pageSize: 10,
            pageNo: 1,
            gender: value
          }
        }
      }
    });
  }
  onCardChange = e => {
    const historyPolice = this.props.basics.historyPolice;
    const { getAlarmListParams } = historyPolice;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPolice: {
          ...historyPolice,
          getAlarmListParams: {
            ...getAlarmListParams,
            pageSize: 10,
            pageNo: 1,
            idCard: e.target.value
          }
        }
      }
    });
  }
  onCameraGroupChange = (value, e) => {
    const historyPolice = this.props.basics.historyPolice;
    const categoryTree = this.props.basics.categoryTree;
    const { getAlarmListParams } = historyPolice;

    //  获取点击分组之后摄像头列表
    let camreaAll = [];
    e.map(v => {
      if (categoryTree[v.key - 0].cameras) {
        camreaAll = camreaAll.concat(categoryTree[v.key - 0].cameras)
      }
    });
    let srcIds = '';
    camreaAll.map(v => {
      srcIds += v.srcId + ','
    });
    srcIds = srcIds.substring(0, srcIds.length - 1);

    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPolice: {
          ...historyPolice,
          getAlarmListParams: {
            ...getAlarmListParams,
            pageSize: 10,
            pageNo: 1,
            srcIds
            // 摄像头选项置空
          }
        },
        camreaAll
      }
    });
  };
  onCameraChange = (value) => {
    const historyPolice = this.props.basics.historyPolice;
    const { getAlarmListParams } = historyPolice;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPolice: {
          ...historyPolice,
          getAlarmListParams: {
            ...getAlarmListParams,
            pageSize: 10,
            pageNo: 1,
            srcIds: value,
            // 摄像头选项置空
          }
        }
      }
    })
  }
  onStartPercentChange = value => {
    const historyPolice = this.props.basics.historyPolice;
    const { getAlarmListParams } = historyPolice;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPolice: {
          ...historyPolice,
          getAlarmListParams: {
            ...getAlarmListParams,
            pageSize: 10,
            pageNo: 1,
            startPercent: value
          }
        }
      }
    });
  }
  onEndPercentChange = value => {
    const historyPolice = this.props.basics.historyPolice;
    const { getAlarmListParams } = historyPolice;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPolice: {
          ...historyPolice,
          getAlarmListParams: {
            ...getAlarmListParams,
            pageSize: 10,
            pageNo: 1,
            endPercent: value
          }
        }
      }
    });
  }
  onTimeChange = (data, dateString) => {
    const historyPolice = this.props.basics.historyPolice;
    const { getAlarmListParams } = historyPolice;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPolice: {
          ...historyPolice,
          getAlarmListParams: {
            ...getAlarmListParams,
            pageSize: 10,
            pageNo: 1,
            startTime: dateString[0],
            endTime: dateString[1]
          }
        }
      }
    });
    this.setState({
      sizeDate: 'none',
      beginTime: dateString[0],
      overTime: dateString[1]
    })
    if (data && data.length == 0) {
      this.setState({
        sizeDate: 'all',
      })
    }
  }
  onAgeChange = v => {
    const historyPolice = this.props.basics.historyPolice;
    const { getAlarmListParams } = historyPolice;
    const age = v.split('-');
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPolice: {
          ...historyPolice,
          getAlarmListParams: {
            ...getAlarmListParams,
            pageSize: 10,
            pageNo: 1,
            ageMin: age.length > 1 ? age[0] - 0 : '',
            ageMax: age.length > 1 ? age[1] - 0 : ''
          }
        }
      }
    });
  }
  onGlassesChange = value => {
    const historyPolice = this.props.basics.historyPolice;
    const { getAlarmListParams } = historyPolice;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPolice: {
          ...historyPolice,
          getAlarmListParams: {
            ...getAlarmListParams,
            pageSize: 10,
            pageNo: 1,
            isglasses: value
          }
        }
      }
    });
  }
  onMoustacheChange = value => {
    const historyPolice = this.props.basics.historyPolice;
    const { getAlarmListParams } = historyPolice;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPolice: {
          ...historyPolice,
          getAlarmListParams: {
            ...getAlarmListParams,
            pageSize: 10,
            pageNo: 1,
            ismoustache: value
          }
        }
      }
    });
  }
  onHatChange = value => {
    const historyPolice = this.props.basics.historyPolice;
    const { getAlarmListParams } = historyPolice;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPolice: {
          ...historyPolice,
          getAlarmListParams: {
            ...getAlarmListParams,
            pageSize: 10,
            pageNo: 1,
            ishat: value
          }
        }
      }
    });
  }
  onSearchOrgunit = id => {
    let value = this.props.basics.historyPolice.getAlarmListParams.orgunitId;
    if (id) {
      value = id - 0;
    }
    const historyPolice = this.props.basics.historyPolice;
    const { getAlarmListParams } = historyPolice;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPolice: {
          ...historyPolice,
          getAlarmListParams: {
            ...getAlarmListParams,
            pageSize: 10,
            pageNo: 1,
            orgunitId: value
          }
        }
      }
    });
    this.props.dispatch({
      type: 'basics/getCategoryTree'
    });
  };

  onSearchClick = () => {
    // const historyPolice = this.props.basics.historyPolice;
    // const { getAlarmListParams } = historyPolice;
    // this.props.dispatch({
    //   type:'basics/success',
    //   payload:{
    //     historyPolice: {
    //       ...historyPolice,
    //       getAlarmListParams: {
    //         ...getAlarmListParams,
    //         pageSize:10,
    //         pageNo:1
    //       }
    //     }
    //   }
    // })
    this.props.dispatch({
      type: 'basics/getAlarmList'
    });
    // this.PaginationChange(1,10);s
  };

  showPoliceTakeImg = value => {
    const historyPolice = this.props.basics.historyPolice;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPolice: {
          ...historyPolice,
          takeImgData: value,
          takeImgModal: true
        }
      }
    });
  }
  onCancelTakeImgDetail = () => {
    const historyPolice = this.props.basics.historyPolice;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPolice: {
          ...historyPolice,
          takeImgModal: false,
          takeImgData: {}

        }
      }
    });
  }
  onCancel = () => {
    const checkTakeImgs = this.props.basics.checkTakeImgs;
    const originImgs = this.props.basics.originImgs;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        detailsModal: false,
        checkTakeImgs: [],
        originImgs: []
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
    this.refs.resetTop.scrollTop = 0;
    this.props.dispatch({
      type: 'basics/alarmListTranslate',
      payload: {
        pageNo: page,
        pageSize: pageSize
      }
    });
  }
  checkImgs = value => {
    const checkTakeImgs = this.props.basics.checkTakeImgs;
    const originImgs = this.props.basics.originImgs;
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
      type: 'basics/success',
      payload: {
        checkTakeImgs: checkTake
      }
    });
  }
  deleteTakeImgs = () => {
    this.props.dispatch({
      type: 'basics/deleteTakeImgs'
    });
  }
  showPoliceDetail = (value, data) => {
    const historyPolice = this.props.basics.historyPolice;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPolice: {
          ...historyPolice,
          personData: value,
          takeImgData: data
        },
        detailsModalData: data,
        detailsModal: true
      }
    });
  }
  bindFacetrack = () => {
    const historyPolice = this.props.basics.historyPolice;
    const bindFacetrack = this.props.basics.bindFacetrack;
    const { personData } = historyPolice;
    const { takeImgData } = historyPolice;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        bindFacetrack: {
          facetrackId: takeImgData.code,
          personId: personData.personId
        }
      }
    });
  }
  addTargetModal = () => {
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        addTargetModal: true
      }
    });
  }
  addTargetData = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.props.dispatch({
        type: 'basics/addFacetrack'
      });
    });
  }
  saveFormRef = form => {
    this.form = form;
  };
  clickBindBtn = () => {
    // 绑定facetrack
    const historyPolice = this.props.basics.historyPolice;
    const bindFacetrack = this.props.basics.bindFacetrack;
    const checkTakeImgs = this.props.basics.checkTakeImgs;
    const { personData } = historyPolice;
    const { takeImgData } = historyPolice;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        bindFacetrack: {
          imgNames: checkTakeImgs.join(','),
          facetrackId: takeImgData.code,
          personId: personData.personId
        }
      }
    });
    setTimeout(() => {
      this.props.dispatch({
        type: 'basics/bindFacetrack'
      });
    }, 300);
  };
  onCancelTargetModal = () => {
    const checkTakeImgs = this.props.basics.checkTakeImgs;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        addTargetModal: false,
        checkTakeImgs: []
      }
    });
  }
  onCancelAddTargetModal = () => {
    const newFacetrack = this.props.basics.newFacetrack;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        addTargetModal: false,
        newFacetrack: {
          facetrackId: '',
          name: '',
          gender: '',
          threshold: '',
          groupId: '',
          orgunitId: '',
          identityCard: ''
        }
      }
    });
  }
  nameChange = value => {
    const newFacetrack = this.props.basics.newFacetrack;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        newFacetrack: {
          ...newFacetrack,
          name: value
        }
      }
    });
  }
  idcardChange = value => {
    const newFacetrack = this.props.basics.newFacetrack;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        newFacetrack: {
          ...newFacetrack,
          identityCard: value
        }
      }
    });
  }
  groupChange = value => {
    const newFacetrack = this.props.basics.newFacetrack;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        newFacetrack: {
          ...newFacetrack,
          groupId: value
        }
      }
    });
  }
  genderChange = value => {
    const int = value - 0;
    const newFacetrack = this.props.basics.newFacetrack;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        newFacetrack: {
          ...newFacetrack,
          gender: int
        }
      }
    });
  }
  nativeplaceChange = value => {
    const newFacetrack = this.props.basics.newFacetrack;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        newFacetrack: {
          ...newFacetrack,
          household_register: value
        }
      }
    });
  }
  thresholdChange = value => {
    const newFacetrack = this.props.basics.newFacetrack;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        newFacetrack: {
          ...newFacetrack,
          threshold: value
        }
      }
    });
  }
  orgunitChange = id => {
    let value = id - 0;
    if (!value) {
      value = '';
    }
    const newFacetrack = this.props.basics.newFacetrack;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        newFacetrack: {
          ...newFacetrack,
          orgunitId: value,
          groupId: ''
        }
      }
    });

    this.form.resetFields('groupId');
    this.props.dispatch({
      type: 'basics/getAllGroups'
    });
  }
  // onTitleClick = item => {
  //   this.setState({
  //     camreaValue: item.title
  //   })
  // };
  // onNameClick = item => {
  //   const historyPolice = this.props.basics.historyPolice;
  //   const { getAlarmListParams } = historyPolice;
  //   this.props.dispatch({
  //     type: 'basics/success',
  //     payload: {
  //       historyPolice: {
  //         ...historyPolice,
  //         getAlarmListParams: {
  //           ...getAlarmListParams,
  //           pageSize: 10,
  //           pageNo: 1,
  //           srcId: item.srcId
  //         }
  //       }
  //     }
  //   });
  //   this.setState({
  //     camreaValue: item.name
  //   })
  // }
  renderCameraNode = data => data.map(item => {
    return <TreeNode key={item.name} value={item.srcId} title={<div><i className={`${Utils.iconfont}  ${Utils.iconShexiangtou} ${Utils.shexiaongtouColor}`}></i>{item.name}</div>} />;
  });
  // 生成树
  renderTreeNode = data => data.map(item => {
    if (item.children) {
      return (
        <TreeNode disabled={item.cameras.length > 0 ? false : true} selectable={false} key={item.cameraCategory.id} value={String(item.cameraCategory.id)} title={<div>{item.cameraCategory.name}</div>}>
          {item.cameras ? this.renderCameraNode(item.cameras) : ''}
          {this.renderTreeNode(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode disabled={item.cameras.length > 0 ? false : true} selectable={false} key={item.cameraCategory.id} value={String(item.cameraCategory.id)} title={<div>{item.cameraCategory.name}</div>}>
      {item.cameras ? this.renderCameraNode(item.cameras) : ''}
    </TreeNode>
  });
  // renderCameraTree = (data) => {
  //   let treeNode = [];
  //   data.map(v => {
  //     if(v.children){
  //       this.renderCameraTree(v.children);
  //     }
  //   });
  //   return treeNode;
  // }

  handleSizeChange = (e) => {
    const historyPolice = this.props.basics.historyPolice;
    const { getAlarmListParams } = historyPolice;

    let timestamp = Math.round(new Date() / 1000)
    let startData;
    let endData = timestampToTime(timestamp);
    this.setState({ sizeDate: e.target.value });
    switch (e.target.value) {
      case 'oneD':
        startData = timestampToTime(timestamp - 24 * 60 * 60)
        break;
      case 'threeD':
        startData = timestampToTime(timestamp - 24 * 60 * 60 * 3)
        break;
      case 'oneM':
        startData = timestampToTime(timestamp - 24 * 60 * 60 * 30)
        break;
      case 'threeM':
        startData = timestampToTime(timestamp - 24 * 60 * 60 * 30 * 3)
        break;
      case 'halfY':
        startData = timestampToTime(timestamp - 24 * 60 * 60 * 30 * 6)
        break;
      case 'all':
        startData = ''
        endData = ''
        break;
    }
    this.setState({
      beginTime: startData,
      overTime: endData
    })
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPolice: {
          ...historyPolice,
          getAlarmListParams: {
            ...getAlarmListParams,
            pageSize: 10,
            pageNo: 1,
            startTime: startData,
            endTime: endData
          }
        }
      }
    });
  }

  render() {
    const historyPolice = this.props.basics.historyPolice;
    const categoryTree = this.props.basics.categoryTree;
    var bealCameras;
    if (categoryTree.length > 0) {
      bealCameras = categoryTree[0].cameras.length > 0 ? false : true;
    } else {
      bealCameras = true;
    }
    return (
      <MayLayout location={this.props.location}>
        <div >
          <Row className={styles.searchGroup}>
            <Col span={9} className={styles.condition}>
              <span className={styles.label}>社区</span>
              <TreeSelect
                allowClear
                treeData={this.props.basics && this.props.basics.groupTrees ?
                  this.props.basics.groupTrees : []}
                style={{ width: '16.5rem', fontSize: '0.875rem' }}
                onChange={this.onSearchOrgunit}
                treeDefaultExpandAll
                value={this.props.basics.historyPolice.getAlarmListParams.orgunitId ? `${this.props.basics.historyPolice.getAlarmListParams.orgunitId}` : ''}
                placeholder="请选择社区"
              />
              <span> - </span>

              <TreeSelect
                allowClear
                onChange={this.onCameraChange}
                treeDefaultExpandAll
                dropdownMatchSelectWidth={false}
                multiple={true}
                // treeCheckable={true}
                className={styles.cameraInput}
                style={{ width: '16.5rem', verticalAlign: 'middle' }}
                value={this.props.basics.historyPolice.getAlarmListParams.srcIds ? this.props.basics.historyPolice.getAlarmListParams.srcIds : []}
                placeholder="请选择摄像头"
              >
                <TreeNode value="全部分组" title="全部分组" key="全部分组" disabled={bealCameras}>
                  {this.renderTreeNode(this.props.basics && this.props.basics.categoryTree ? this.props.basics.categoryTree : [])}
                </TreeNode>
              </TreeSelect>
            </Col>
            <Col span={7} className={styles.condition}>
              <span className={styles.label}>日期</span>
              <RangePicker
                showTime
                allowClear
                format="YYYY-MM-DD HH:mm:ss"
                style={{ width: '24.4rem', 'background': 'transparent' }}
                onChange={this.onTimeChange}
                value={this.state.sizeDate !== 'all' ? [moment(this.state.beginTime, 'YYYY-MM-DD HH:mm:ss'), moment(this.state.overTime, 'YYYY-MM-DD HH:mm:ss')] : null}
              />
            </Col>

            <Col span={8} className={styles.condition}>
              <Radio.Group value={this.state.sizeDate} onChange={this.handleSizeChange} style={{ fontSize: '0.875rem' }}>
                <Radio.Button value="oneD" style={{ width: '5rem' }} >一天内</Radio.Button>
                <Radio.Button value="threeD" style={{ width: '5rem' }}>三天内</Radio.Button>
                <Radio.Button value="oneM" style={{ width: '5rem' }}>一月内</Radio.Button>
                <Radio.Button value="threeM" style={{ width: '5rem' }}>三月内</Radio.Button>
                <Radio.Button value="halfY" style={{ width: '5rem' }}>半年内</Radio.Button>
                <Radio.Button value="all" style={{ width: '5rem' }}>全部</Radio.Button>
              </Radio.Group>
            </Col>

            <Col span={4} className={styles.condition}>
              <span className={styles.label}>姓名</span>
              <Input style={{ width: '12.812rem', fontSize: '0.875rem', 'background': 'transparent' }} placeholder="请输入姓名" value={historyPolice.getAlarmListParams.name} onChange={this.onNameChange} />
            </Col>
            <Col span={5} className={styles.condition}>
              <span className={styles.label}>身份证号</span>
              <Input style={{ width: '12.812rem', fontSize: '0.875rem', 'background': 'transparent' }} placeholder="请输入身份证号" value={historyPolice.getAlarmListParams.idCard} onChange={this.onCardChange} />
            </Col>


            <Col span={2} className={styles.condition}>
              <span className={styles.label}>性别</span>
              <Select
                value={historyPolice.getAlarmListParams.gender}
                style={{ width: '5rem', fontSize: '0.875rem' }}
                onChange={this.onGenderChange}
              >
                {/*  0女,    1 男   */}
                <Option value="">全部</Option>
                <Option value="0">女</Option>
                <Option value="1">男</Option>
              </Select>
            </Col>
            <Col span={2} className={styles.condition}>
              <span className={styles.label}>年龄</span>
              {/* <Input style={{width: 80}} onChange={this.onAgeChange}/> */}
              <Select
                style={{ width: '5rem' }}
                value={historyPolice.getAlarmListParams.ageMax ? historyPolice.getAlarmListParams.ageMin + '-' + historyPolice.getAlarmListParams.ageMax : ' '}
                onChange={this.onAgeChange}
              >
                <Option value=" ">全部</Option>
                <Option value="0-20">少年</Option>
                <Option value="20-30">青年</Option>
                <Option value="30-50">中年</Option>
                <Option value="50-100">老年</Option>
              </Select>
            </Col>

            <Col span={3} className={styles.condition}>
              <span className={styles.label}>眼镜</span>
              <Select
                value={historyPolice.getAlarmListParams.isglasses}
                style={{ width: '5rem' }}
                onChange={this.onGlassesChange}
              >
                <Option value="">全部</Option>
                <Option value="1">有</Option>
                <Option value="2">无</Option>
              </Select>
            </Col>
            <Col span={5} className={`${styles.condition} ${styles.conditionMid}`}>
              <span className={styles.label} style={{ marginLeft: 0 }}>阈值</span>
              <InputNumber
                style={{ width: '9.125rem', fontSize: '0.875rem' }} defaultValue={0} formatter={value => `${value}%`}
                parser={value => value.replace('%', '')} min={0} max={100} onChange={this.onStartPercentChange} />
              <span className={styles.spanWidth}> ~ </span>
              <InputNumber
                style={{ width: '9.125rem' }} defaultValue={100} formatter={value => `${value}%`}
                parser={value => value.replace('%', '')} min={0} max={100} onChange={this.onEndPercentChange} />
            </Col>
            {/* <Col span={3} className={styles.condition}>
              <span className={styles.label}>胡子</span>
              <Select
                value={historyPolice.getAlarmListParams.ismoustache}
                style={{ width: '5rem', fontSize: '0.8rem' }}
                onChange={this.onMoustacheChange}
              >
                <Option value="">全部</Option>
                <Option value="1">有</Option>
                <Option value="2">无</Option>
              </Select>
            </Col>
            <Col span={3} className={styles.condition}>
              <span className={styles.label}>帽子</span>
              <Select
                value={historyPolice.getAlarmListParams.ishat}
                style={{ width: '5rem', fontSize: '0.875rem' }}
                onChange={this.onHatChange}
              >
                <Option value="">全部</Option>
                <Option value="1">有</Option>
                <Option value="2">无</Option>
              </Select>
            </Col> */}
            <Col span={1} className={styles.condition} style={{ marginLeft: 28 }}>
              <Button type="primary" onClick={this.onSearchClick}>查询</Button>
            </Col>
          </Row>
          <Row className={styles.wrap}>
            <div style={{ height: '35px' }}>
              <div style={{ display: 'flex' }}>
                {/* <div style={{width: 227, float: 'left'}}>
                  <div className={styles.modalHeader}>
                    <span className={styles.modalHeaderTitle}>抓拍照片</span>
                  </div>
                </div>
                <div style={{width: '87%', float: 'left'}}>
                  <div className={styles.modalHeader}>
                    <span className={styles.modalHeaderTitle}>对比照片</span>
                  </div>
                </div> */}
                <div style={{ width: '260px', borderRight: '1px solid #005c7b' }}>
                  <div className={styles.modalHeader}>
                    <span className={styles.modalHeaderTitle}>抓拍照片</span>
                  </div>
                </div>
                <div style={{ width: '100%' }}>
                  <div className={styles.modalHeader}>
                    <span className={styles.modalHeaderTitle}>对比照片</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 遍历渲染 */}
            <div className={styles.cardContent} ref="resetTop" >
              {this.props.basics && this.props.basics.historyPolice && this.props.basics.historyPolice.alarmList ?
                this.props.basics.historyPolice.alarmList.map((value, i) => <FaceCardContent
                  faceTrackData={value}
                  // alarmParson={value.alarmPerson ? value.alarmPerson : ''}
                  // matchData={value.matchPoiList && value.matchPoiList.length > 0 ? value.matchPoiList : []}
                  index={i}
                  key={i}
                  onClickCapt={this.showPoliceTakeImg.bind(this, value)}
                  onClickComp={this.showPoliceDetail}
                  historyPoliceValue={this.props.basics.historyPolice}
                />
                ) : null}
            </div>
          </Row>

        </div>
        <Pagination
          className={styles.pagination}
          current={this.props.basics.historyPolice.alarmPage.currentPage}
          showQuickJumper
          onChange={this.PaginationChange.bind(this)}
          itemRender={this.itemRender}
          showTotal={total => `共 ${total} 条`}
          total={this.props.basics.historyPolice.alarmPage.total}
        />
        <AlarmDetailsModal
          visible={this.props.basics.detailsModal}
          faceTrackData={this.props.basics.historyPolice.takeImgData ? this.props.basics.historyPolice.takeImgData : null}
          personData={this.props.basics.historyPolice.personData ? this.props.basics.historyPolice.personData : null}
          onCancel={this.onCancel}
          toggleClass={this.toggleClass}
          clickBindBtn={this.clickBindBtn}
          checkImgs={this.checkImgs}
          deleteTakeImgs={this.deleteTakeImgs}
          bindFacetrack={this.bindFacetrack}
          addTarget={this.addTargetModal}
        />
        <AddTargetModal
          ref={this.saveFormRef}
          visible={this.props.basics.addTargetModal}
          onCancel={this.onCancelAddTargetModal}
          data={this.props.basics.detailsModalData ? this.props.basics.detailsModalData : null}
          dataSource={this.props.basics.newFacetrack}
          treeData={this.props.basics && this.props.basics.groupTrees ?
            this.props.basics.groupTrees : []}
          groupList={this.props.basics && this.props.basics.allGroups ?
            this.props.basics.allGroups : []}
          nameChange={this.nameChange}
          idcardChange={this.idcardChange}
          groupChange={this.groupChange}
          genderChange={this.genderChange}
          nativeplaceChange={this.nativeplaceChange}
          thresholdChange={this.thresholdChange}
          orgunitChange={this.orgunitChange}
          addTargetData={this.addTargetData}
        />
        <TakeImgDetail
          visiable={this.props.basics.historyPolice.takeImgModal}
          data={this.props.basics.historyPolice.takeImgData ? this.props.basics.historyPolice.takeImgData : null}
          onCancel={this.onCancelTakeImgDetail}
        //  historyPoliceValue={this.props.basics.historyPolice}
        />
      </MayLayout>
    );
  }
}

function mapStateToProps({ basics }) {
  return { basics };
}

export default connect(mapStateToProps)(HistoryPolice);
