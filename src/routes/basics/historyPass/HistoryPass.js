/**
 * Created by Ethan on 2018/1/15.
 */
import React from 'react';
import { connect } from 'dva';
import TweenOne from 'rc-tween-one';
import { Input, Button, Radio, Icon, Row, Col, Select, InputNumber, DatePicker, TreeSelect, Form, Pagination } from 'antd';
import MayLayout from '../../../components/common/Layout/MayLayout';
import FaceComparisonCard from './FaceComparisonCard';
import DetailsModal from './DetailsModal';
import AddTargetModal from './AddTargetModal';
import moment from 'moment';
// import Pagination from '../../../components/common/PaginationView/PaginationView';
import { timestampToTime } from '../../../utils/utils';
import styles from './historyPass.less';
import Utils from '../../../iconfont/icon/iconfont.css'
const { RangePicker } = DatePicker;
const { Option } = Select;
const { TreeNode } = TreeSelect;
const TweenOneGroup = TweenOne.TweenOneGroup;

class HistoryPass extends React.Component {
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
      type: 'basics/historyPassList'
    });
    this.props.dispatch({
      type: 'basics/getGroupTrees'
    });
  }
  componentDidMount() { 
    // this.props.dispatch({
    //   type: 'basics/getPassCategoryTree'
    // });
  }

  componentWillUnmount() {
    const historyPass = this.props.basics.historyPass;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPass: {
          ...historyPass,
          getPassListParams: {
            pageSize: 16,
            pageNo: 1,
            orgunitId: '',
            cameraGroupId: '',
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
          },
          facetrackList: []
        }
      }
    });
  }

  onNameChange = e => {
    const historyPass = this.props.basics.historyPass;
    const { getPassListParams } = historyPass;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPass: {
          ...historyPass,
          getPassListParams: {
            ...getPassListParams,
            pageSize: 16,
            pageNo: 1,
            name: e.target.value
          }
        }
      }
    });
  }
  onGenderChange = value => {
    const historyPass = this.props.basics.historyPass;
    const { getPassListParams } = historyPass;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPass: {
          ...historyPass,
          getPassListParams: {
            ...getPassListParams,
            pageSize: 16,
            pageNo: 1,
            gender: value
          }
        }
      }
    });
  }
  onCardChange = e => {
    const historyPass = this.props.basics.historyPass;
    const { getPassListParams } = historyPass;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPass: {
          ...historyPass,
          getPassListParams: {
            ...getPassListParams,
            pageSize: 16,
            pageNo: 1,
            idCard: e.target.value
          }
        }
      }
    });
  }
  // onCameraChange = value => {
  //   const historyPass = this.props.basics.historyPass;
  //   const { getPassListParams } = historyPass;
  //   this.props.dispatch({
  //     type: 'basics/success',
  //     payload: {
  //       historyPass: {
  //         ...historyPass,
  //         getPassListParams: {
  //           ...getPassListParams,
  //           pageSize: 16,
  //           pageNo: 1,
  //           srcId: value
  //         }
  //       }
  //     }
  //   });
  // }
  onCameraChange = (value, label, extra) => {
    const historyPass = this.props.basics.historyPass;
    const { getPassListParams } = historyPass;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPass: {
          ...historyPass,
          getPassListParams: {
            ...getPassListParams,
            pageSize: 16,
            pageNo: 1,
            srcIds: value
            // 摄像头选项置空
          }
        }
      }
    })
  }
  onStartPercentChange = value => {
    const historyPass = this.props.basics.historyPass;
    const { getPassListParams } = historyPass;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPass: {
          ...historyPass,
          getPassListParams: {
            ...getPassListParams,
            pageSize: 16,
            pageNo: 1,
            startPercent: value
          }
        }
      }
    });
  }
  onEndPercentChange = value => {
    const historyPass = this.props.basics.historyPass;
    const { getPassListParams } = historyPass;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPass: {
          ...historyPass,
          getPassListParams: {
            ...getPassListParams,
            pageSize: 16,
            pageNo: 1,
            endPercent: value
          }
        }
      }
    });
  }
  onTimeChange = (data, dateString) => {
    const historyPass = this.props.basics.historyPass;
    const { getPassListParams } = historyPass;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPass: {
          ...historyPass,
          getPassListParams: {
            ...getPassListParams,
            pageSize: 16,
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
    const historyPass = this.props.basics.historyPass;
    const { getPassListParams } = historyPass;
    const age = v.split('-');
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPass: {
          ...historyPass,
          getPassListParams: {
            ...getPassListParams,
            pageSize: 16,
            pageNo: 1,
            ageMin: age.length > 1 ? age[0] - 0 : '',
            ageMax: age.length > 1 ? age[1] - 0 : ''
          }
        }
      }
    });
  }
  onGlassesChange = value => {
    const historyPass = this.props.basics.historyPass;
    const { getPassListParams } = historyPass;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPass: {
          ...historyPass,
          getPassListParams: {
            ...getPassListParams,
            pageSize: 16,
            pageNo: 1,
            isglasses: value
          }
        }
      }
    });
  }
  onMoustacheChange = value => {
    const historyPass = this.props.basics.historyPass;
    const { getPassListParams } = historyPass;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPass: {
          ...historyPass,
          getPassListParams: {
            ...getPassListParams,
            pageSize: 16,
            pageNo: 1,
            ismoustache: value
          }
        }
      }
    });
  }
  onHatChange = value => {
    const historyPass = this.props.basics.historyPass;
    const { getPassListParams } = historyPass;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPass: {
          ...historyPass,
          getPassListParams: {
            ...getPassListParams,
            pageSize: 16,
            pageNo: 1,
            ishat: value
          }
        }
      }
    });
  }
  onSearchOrgunit = id => {

    let value = this.props.basics.historyPass.getPassListParams.orgunitId;
    if (id) {
      value = id - 0;
    }
    const historyPass = this.props.basics.historyPass;
    const { getPassListParams } = historyPass;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPass: {
          ...historyPass,
          getPassListParams: {
            ...getPassListParams,
            pageSize: 16,
            pageNo: 1,
            orgunitId: value
          }
        }
      }
    });
    this.props.dispatch({
      type: 'basics/getPassCategoryTree'
    });

    // let value = id - 0;
    // if (!value) {
    //   value = '';
    // }
    // const historyPass = this.props.basics.historyPass;
    // const { getPassListParams } = historyPass;
    // this.props.dispatch({
    //   type: 'basics/success',
    //   payload: {
    //     historyPass: {
    //       ...historyPass,
    //       getPassListParams: {
    //         ...getPassListParams,
    //         pageSize: 16,
    //         pageNo: 1,
    //         cmOrgunitId: value
    //       }
    //     }
    //   }
    // });
  };

  onSearchClick = () => {
    this.props.dispatch({
      type: 'basics/historyPassList'
    });
  }
  showPassDetail = value => {
    const historyPass = this.props.basics.historyPass;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        detailsModalData: value,
        detailsModal: true,
        historyPass: {
          ...historyPass,
          matchPoiListData: value.matchPoiList,
          judgePersonData: value.judgePerson
        }
      }
    });
  }

  onCancel = () => {
    const bindFacetrack = this.props.basics.bindFacetrack;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        detailsModal: false,
        detailsModalData: {},
        bindFacetrack: {
          facetrackId: '',
          personId: ''
        },
        checkTakeImgs: [],
        originImgs: []
      }
    });
  };
  addTargetModal = () => {
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        addTargetModal: true
      }
    });
  };
  addTargetData = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      form.resetFields();
      this.props.dispatch({
        type: 'basics/addFacetrack'
      });
    });
  };
  saveFormRef = form => {
    this.form = form;
  };
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
  messageToggleClass = value => {
    if (this.props.basics.bindFacetrack && this.props.basics.bindFacetrack.personId) {
      if (this.props.basics.bindFacetrack.personId.indexOf(value.personId) !== -1) {
        return styles.selectesCard;
      }
      return styles.messageCard;
    }
    return styles.messageCard;
  }

  deleteTakeImgs = () => {
    this.props.dispatch({
      type: 'basics/deleteTakeImgs'
    });
  }
  bindFacetrack = value => {
    const bindFacetrack = this.props.basics.bindFacetrack;
    const detailsModalData = this.props.basics.detailsModalData;
    const { code } = detailsModalData;
    if (bindFacetrack.personId.indexOf(value.personId) === -1) {
      this.props.dispatch({
        type: 'basics/success',
        payload: {
          bindFacetrack: {
            facetrackId: code,
            personId: value.personId
          }
        }
      });
    } else {
      this.props.dispatch({
        type: 'basics/success',
        payload: {
          bindFacetrack: {
            ...bindFacetrack,
            personId: ''
          }
        }
      });
    }
  }
  clickBindBtn = () => {
    const bindFacetrack = this.props.basics.bindFacetrack;
    const checkTakeImgs = this.props.basics.checkTakeImgs;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        bindFacetrack: {
          ...bindFacetrack,
          imgNames: checkTakeImgs.join(',')
        }
      }
    });
    setTimeout(() => {
      this.props.dispatch({
        type: 'basics/bindFacetrack'
      });
    }, 300);
  }
  onCancelTargetModal = () => {
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
      type: 'basics/passListTranslate',
      payload: {
        pageNo: page,
        pageSize: pageSize
      }
    });
  }
  renderCameraNode = data => data.map(item => {
    return <TreeNode key={item.id} value={item.srcId}  title={<div><i className={`${Utils.iconfont}  ${Utils.iconShexiangtou} ${Utils.shexiaongtouColor}`}></i>{item.name}</div>} />;
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
  handleSizeChange = (e) => {
    const historyPass = this.props.basics.historyPass;
    const { getPassListParams } = historyPass;
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
        break;
    }
    this.setState({
      beginTime: startData,
      overTime: endData
    })
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPass: {
          ...historyPass,
          getPassListParams: {
            ...getPassListParams,
            pageSize: 16,
            pageNo: 1,
            startTime: startData,
            endTime: endData
          }
        }
      }
    });
  }
  render() {
    const historyPass = this.props.basics.historyPass;
    const categoryTree = this.props.basics.categoryTree;
    var bealCameras;
    if (categoryTree.length > 0) {
      bealCameras = categoryTree[0].cameras.length > 0 ? false : true;
    } else {
      bealCameras = true;
    }
    return (
      <MayLayout location={this.props.location}>
        <div>
          <Row className={styles.searchGroup}>
            <Col span={9} className={styles.condition}>
              <span className={styles.label}>社区</span>
              <TreeSelect
                allowClear
                treeData={this.props.basics && this.props.basics.groupTrees ?
                  this.props.basics.groupTrees : []}
                style={{ width: '16.5rem' }}
                onChange={this.onSearchOrgunit}
                treeDefaultExpandAll
                value={this.props.basics.historyPass.getPassListParams.orgunitId ? `${this.props.basics.historyPass.getPassListParams.orgunitId}` : ''}
                placeholder="请选择社区"
              />
              <span> - </span>

              <TreeSelect
                allowClear
                onChange={this.onCameraChange}
                treeDefaultExpandAll
                multiple={true}
                // treeCheckable={true}
                dropdownMatchSelectWidth={false}
                className={styles.cameraInput}
                style={{ verticalAlign: 'middle', width: '16.5rem' }}
                value={this.props.basics.historyPass.getPassListParams.srcIds ? this.props.basics.historyPass.getPassListParams.srcIds : []}
                placeholder="请选择摄像头"
              >
                <TreeNode value="全部分组" title="全部分组" key="全部分组" disabled={bealCameras}    >
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
              <Input style={{ width: '12.813rem', 'background': 'transparent' }} placeholder="请输入姓名" value={historyPass.getPassListParams.name} onChange={this.onNameChange} />
            </Col>
            <Col span={5} className={styles.condition}>
              <span className={styles.label}>身份证号</span>
              <Input style={{ width: '12.813rem', 'background': 'transparent' }} placeholder="请输入身份证号" value={historyPass.getPassListParams.idCard} onChange={this.onCardChange} />
            </Col>

            <Col span={2} className={styles.condition}>
              <span className={styles.label}>性别</span>
              <Select
                value={historyPass.getPassListParams.gender}
                style={{ width: '5rem' }}
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
              <Select
                style={{ width: '5rem' }}
                value={historyPass.getPassListParams.ageMax ? historyPass.getPassListParams.ageMin + '-' + historyPass.getPassListParams.ageMax : ' '}
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
                value={historyPass.getPassListParams.isglasses}
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
                style={{ width: '9.125rem' }} defaultValue={0} formatter={value => `${value}%`}
                parser={value => value.replace('%', '')} min={0} max={100} onChange={this.onStartPercentChange} />
              <span className={styles.spanWidth}> ~ </span>
              <InputNumber
                style={{ width: '9.125rem' }} defaultValue={100} formatter={value => `${value}%`}
                parser={value => value.replace('%', '')} min={0} max={100} onChange={this.onEndPercentChange} />
            </Col>
            {/* <Col span={3} className={styles.condition}>
              <span className={styles.label}>胡子</span>
              <Select
                value={historyPass.getPassListParams.ismoustache}
                style={{ width: '5rem' }}
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
                value={historyPass.getPassListParams.ishat}
                style={{ width: '5rem' }}
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
          <TweenOneGroup className={styles.list}>
            {this.props.basics && this.props.basics.historyPass && this.props.basics.historyPass.facetrackList ?
              this.props.basics.historyPass.facetrackList.map((value, i) =>
                <FaceComparisonCard
                  data={value}
                  matchData={value.judgePerson ? value.judgePerson : null}
                  key={i}
                  onClick={this.showPassDetail.bind(this, value)} />
              ) : null}
          </TweenOneGroup>
        </div>

        <Pagination
          className={styles.pagination}
          current={this.props.basics.historyPass.facetrackPage.currentPage}
          showQuickJumper
          onChange={this.PaginationChange.bind(this)}
          defaultPageSize={16}
          itemRender={this.itemRender}
          showTotal={total => `共 ${total} 条`}
          total={this.props.basics.historyPass.facetrackPage.total}
        />
        <DetailsModal
          visible={this.props.basics.detailsModal}
          data={this.props.basics.detailsModalData ? this.props.basics.detailsModalData : null}
          checkImgs={this.checkImgs}
          deleteTakeImgs={this.deleteTakeImgs}
          bindFacetrack={this.bindFacetrack}
          clickBindBtn={this.clickBindBtn}
          onCancel={this.onCancel}
          addTarget={this.addTargetModal}
          toggleClass={this.toggleClass}
          messageToggleClass={this.messageToggleClass}
          isNeedTarget={true}

        />
        <AddTargetModal
          ref={this.saveFormRef}
          data={this.props.basics.detailsModalData ? this.props.basics.detailsModalData : null}
          dataSource={this.props.basics.newFacetrack}
          visible={this.props.basics.addTargetModal}
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
          onCancel={this.onCancelTargetModal}
          addTargetData={this.addTargetData}
        />

      </MayLayout>
    );
  }
}

function mapStateToProps({ basics }) {
  return { basics };
}

export default connect(mapStateToProps)(HistoryPass);
