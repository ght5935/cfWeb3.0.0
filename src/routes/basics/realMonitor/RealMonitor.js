/**
 * Created by Ethan on 2018/1/15.
 */
import React from 'react';
import { connect } from 'dva';
import { Input, Icon, Tree, notification, Tooltip } from 'antd';

import MayLayout from '../../../components/common/Layout/MayLayout';
import VlcView from '../../../components/vlc/VlcView';
import AlarmFaceCard from './AlarmFaceCard';
import DetailsModal from './DetailsModal';
import AddTargetModal from '../historyPass/AddTargetModal';
import styles from './realMonitor.less';
import cui from '../../../assets/cui.jpeg';
import { takeImgFromWorker } from '../../../utils/utils';
import Utils from '../../../iconfont/icon/iconfont.css'

const { TreeNode } = Tree;
class RealMonitor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      expandedKeys: [], // 组织树展开节点集合
      allowedDrop: false,
      toggleSrc: '',
      draggable: true,
      VLC: ['', '', '', ''],

      toggleSrcName: '',
      flag: 1,
      iconClassChange: '',
      vlcClassChange: '',
      screenSize: 1,
      swip: 0, // 初始化位移 70px
      leftArrowShow: false,
      rightArrowShow: false,
      width: 0
    };
  }

  componentWillMount() {
    this.props.dispatch({
      type: 'basics/getGroupTrees'
    });
    this.props.dispatch({
      type: 'basics/gitALLCamreaList'
    });
    const regVLC = new RegExp('(^| )VLC=([^;]*)(;|$)');
    const regSrcNames = new RegExp('(^| )srcNames=([^;]*)(;|$)');
    let VLC = document.cookie.match(regVLC);
    let srcNames = document.cookie.match(regSrcNames);
    if (VLC && VLC[2]) {
      VLC = VLC[2];
      VLC = VLC.split(',');
      srcNames = srcNames[2];
      srcNames = srcNames.split(',');
      this.props.dispatch({
        type: 'basics_rt/success',
        payload: {
          VLC,
          srcNames
        }
      });
    }
  }
  componentDidMount() {
    setTimeout(() => {
      const data = this.props.basics.dataList;
      const expandedKeys = data.map(v => {
        if (typeof v.key === 'number') {
          return `${v.key}`
        }
        return null
      }).filter((item, i, self) => item && self.indexOf(item) === i);
      this.setState({
        expandedKeys
      })
    }, 1000)

  }
  onExpand = expandedKeys => {
    this.setState({
      expandedKeys
    })
  };
  // 组织树Input输入
  onCameraSelectChange = e => {
    const value = e.target.value !== '' ? e.target.value.trim() : null; // 输入数据去空格
    let expandedKeys = this.props.basics.dataList.map(item => {
      if (value && item.title.indexOf(value) > -1) {
        return `${item.parent}`;
      }
      return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);

    const expanded = expandedKeys.map(v => {
      return this.findAllParents(v)
    })
    expandedKeys = expandedKeys.concat(expanded);
    if (expandedKeys.length === 0) {
      expandedKeys = this.props.basics.dataList.map(v => {
        if (typeof v.key === 'number') {
          return `${v.key}`
        }
        return null
      }).filter((item, i, self) => item && item !== 'null' && self.indexOf(item) === i);
    }
    this.setState({
      expandedKeys,
      searchValue: value || '',
    });
  };
  findAllParents = (v) => {
    let keys;
    this.props.basics.dataList.map(i => {
      if (i.key == v) {
        keys = `${i.parent}`
      }
    });
    return keys
  }
  // 清空 .treeSelect 值
  onEmitEmpty = () => {
    this.treeSelect.focus();
    this.setState({ searchValue: '', expandedKeys: [] });
  };
  onDragState = (e, n) => {
    const eventkey = n.props.eventKey.split('|');
    this.setState({
      toggleSrc: eventkey[0],
      toggleSrcName: eventkey[1],
      allowedDrop: true
    });
  };

  onDropOnVideo = index => {
    if (this.state.allowedDrop) {
      const VLC = this.props.basics_rt.VLC;
      const srcNames = this.props.basics_rt.srcNames;
      if (Number(this.state.toggleSrc)) {
        notification.error({
          placement: 'bottomRight',
          bottom: 50,
          duration: 3,
          message: '请拖入摄像头！'
        });
        this.setState({
          allowedDrop: false
        });
        return false;
      }
      VLC[index] = this.state.toggleSrc;// 视频存入 redux 中
      srcNames[index] = this.state.toggleSrcName;
      this.setState({
        DropItem: index,
        allowedDrop: false
      });
      this.props.dispatch({
        type: 'basics_rt/success',
        payload: {
          VLC,
          srcNames
        }
      });
      // 视频存入 cookie 中

      const date = new Date();
      date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
      document.cookie = `VLC=${VLC};expires=${date.toGMTString()} `;
      document.cookie = `srcNames=${srcNames};expires=${date.toGMTString()} `;
    }
  };

  onVlcTogIconClick = flag => {
    if (flag === 1) {
      let changeFlag = flag;
      changeFlag++;
      this.setState({
        flag: changeFlag,
        vlcClassChange: styles.vlcActive,
        iconClassChange: styles.iconActive
      });
    } else {
      let changeFlag = flag;
      changeFlag--;
      this.setState({
        flag: changeFlag,
        vlcClassChange: '',
        iconClassChange: ''

      });
    }
  };
  onScreenTogIconClick = size => {
    size === 1 ? this.setState({ screenSize: 4 }) : this.setState({ screenSize: 1 });
  };
  onArrowLeftClick = () => {
    let swip = this.state.swip + 215 * 8 + 30;
    if (swip >= 0) {
      swip = 0;
      this.setState({
        leftArrowShow: false
      });
    }
    this.setState({
      swip
    });
  }
  onArrowRightClick = () => {
    this.setState({
      swip: this.state.swip - 215 * 8 - 30
    });
  }

  onTitleClick = id => {
    const expandedKeys = this.state.expandedKeys;
    if (expandedKeys.indexOf(`${id}`) === -1) {
      expandedKeys.push(`${id}`);
    } else {
      const i = expandedKeys.indexOf(`${id}`);
      expandedKeys.splice(i, 1);
    }
    this.setState({
      expandedKeys
    });
  }
  onVLCclose = index => {
    const VLC = this.props.basics_rt.VLC;
    const srcNames = this.props.basics_rt.srcNames;
    VLC[index] = '';
    srcNames[index] = '无视频';
    this.props.dispatch({
      type: 'basics_rt/success',
      payload: {
        VLC,
        srcNames
      }
    });
    const date = new Date();
    date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
    document.cookie = `VLC=${VLC};expires=${date.toGMTString()} `;
    document.cookie = `srcNames=${srcNames};expires=${date.toGMTString()} `;
  }

  getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some(item => item.cameraCategory.id === key)) {
          parentKey = `${node.cameraCategory.id}`;
        } else if (this.getParentKey(key, node.children)) {
          parentKey = this.getParentKey(key, node.children);
        }
      }
      if (node.cameras) {
        if (node.cameras.some(item => item.id === key)) {
          parentKey = `${node.cameraCategory.id}`;
        } else if (this.getParentKey(key, node.cameras)) {
          parentKey = this.getParentKey(key, node.cameras);
        }
      }
    }
    return parentKey;
  };

  parentClassName = id => {
    if (this.state.expandedKeys.indexOf(`${id}`) === -1) {
      return styles.treeNode;
    }
    return styles.treeNode_open;
  };
  // 生成树
  renderTreeNode = data => data.map(item => {
    const index = item.cameraCategory.name.indexOf(this.state.searchValue);
    const beforeStr = item.cameraCategory.name.substr(0, index);
    const afterStr = item.cameraCategory.name.substr(index + this.state.searchValue.length);
    const title = index > -1 ? (
      <span>
        {beforeStr}
        <span style={{ color: '#f50' }}>{this.state.searchValue}</span>
        {afterStr}
      </span>
    ) : <span>{item.cameraCategory.name}</span>;
    if (item.children) {
      return (
        <TreeNode defaultExpandAll key={item.cameraCategory.id} selectable={false} title={<Tooltip title={title}><div onClick={this.onTitleClick.bind(this, item.cameraCategory.id)}><i className={this.parentClassName(item.cameraCategory.id)} />{title}</div></Tooltip>}>
          {item.cameras ? this.renderCameraNode(item.cameras) : ''}
          {this.renderTreeNode(item.children)}
        </TreeNode>
      );
    }
    if (item.cameras) {
      return (
        <TreeNode
          key={item.cameraCategory.id}
          selectable={false}
          title={<Tooltip title={title}><div onClick={this.onTitleClick.bind(this, item.cameraCategory.id)}>
            <i className={this.parentClassName(item.cameraCategory.id)} />{title}</div></Tooltip>}>
          {this.renderCameraNode(item.cameras)}
        </TreeNode>
      );
    }
    return <TreeNode
      key={item.id}
      selectable={false}
      title={<Tooltip title={title}><div onClick={this.onTitleClick.bind(this, item.cameraCategory.id)}><i className={styles.treeNode} />{title}</div> </Tooltip>}
    />

  });


  renderCameraNode = data => data.map(item => {
    const index = item.name.indexOf(this.state.searchValue);
    const beforeStr = item.name.substr(0, index);
    const afterStr = item.name.substr(index + this.state.searchValue.length);
    const title = index > -1 ? (
      <span>
        {beforeStr}
        <span style={{ color: '#f50' }}>{this.state.searchValue}</span>
        {afterStr}
      </span>
    ) : <span>{item.name}</span>;
    return <TreeNode key={`${item.playUrl}|${item.name}`} selectable={false} title={<Tooltip title={title}><div><i className={`${Utils.iconfont}  ${Utils.iconShexiangtou} ${Utils.shexiaongtouColor}`}></i>{title}</div></Tooltip>} />;
  });
  renderVideos = size => {
    const videos = [];
    if (size === 1) {
      return (<div key={0} className={styles.video_one} onMouseEnter={this.onDropOnVideo.bind(this, 0)}>
        <div className={styles.video_title} >
          <div className={styles.vlcName}> {this.props.basics_rt.srcNames[0]}</div>
          <div className={styles.closeIcon}>
            <Icon className={styles.close} style={{ cursor: 'pointer' }} onClick={this.onVLCclose.bind(this, 0)} title="关闭视频" type="close" />
          </div>
        </div>
        <div className={`${styles.videoList} ${styles.dropVideo}`}>
          {this.props.basics_rt.VLC[0] ? <VlcView vlcSrc={this.props.basics_rt.VLC[0]} id={1} /> : ''}
        </div>
      </div>);
    }
    for (let i = 0; i < size; i++) {
      videos.push(<div key={i} className={styles.video_four} onMouseEnter={this.onDropOnVideo.bind(this, i)}>
        <div className={styles.video_title} >
          <div className={styles.vlcName}> {this.props.basics_rt.srcNames[i]}</div>
          <div className={styles.closeIcon}>
            <Icon className={styles.close} onClick={this.onVLCclose.bind(this, i)} title="关闭视频" type="close" />
          </div>
        </div>
        <div className={`${styles.videoList} ${styles.dropVideo}`}>
          {this.props.basics_rt.VLC[i] ? <VlcView vlcSrc={this.props.basics_rt.VLC[i]} id={i + 1} /> : ''}
        </div>
      </div>);
    }
    return videos;
  };


  swipStyle = () => {
    const width = this.props.basics_rt.faceList.length * 215 + 50;
    return { width: `${width}px`, position: 'absolute', left: `${this.state.swip}px`, transition: '.3s' };
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
  onCameraChange = value => {
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
            srcId: value
          }
        }
      }
    });
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
  }
  onAgeChange = e => {
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
            age: e.target.value
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
    let value = id - 0;
    if (!value) {
      value = '';
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
            cmOrgunitId: value
          }
        }
      }
    });
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
          matchPoiListData: [value.mostPerson],
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
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        addTargetModal: false
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
  renderCurrentPic = currentPic => {
    if (currentPic == undefined || currentPic.length == 0) {
      return []
    } else {
      let pic = (<div style={{ height: '100%' }}>
        <div className={styles.currentTakePic}>
          <div className={styles.currentLeft}>
            <div className={styles.currentTakePicImg}>
              <img src={takeImgFromWorker(currentPic) || currentPic.imgs[0]} alt="" />
              {/* <img src={cui} alt="" /> */}
            </div>
          </div>
          <div className={styles.currentRight}>
            <table className={styles.currentPicTitle}>
              <tbody>
                <tr>
                  <th className={styles.textLabel}>姓名：</th>
                  <th className={styles.textLeft}>{currentPic.judgePerson == null ? '未知' : currentPic.judgePerson.name}</th>
                </tr>
                <tr>
                  <th className={styles.textLabel}>性别：</th>
                  <th className={styles.textLeft}>{currentPic.judgePerson == null ? currentPic.gender == 0 ? '女' : '男' : currentPic.judgePerson.gender}</th>
                </tr>
                <tr>
                  <th className={styles.textLabel}>年龄：</th>
                  <th className={styles.textLeft}>{currentPic.age}</th>
                </tr>
                <tr>
                  <th className={styles.textLabel}>特征：</th>
                  <th className={styles.textLeft}>{currentPic.glasses == 1 ? '戴眼镜' : currentPic.glasses == 2 ? '没戴眼镜' : '未知'}</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={styles.capTakePic}>
          <img className={styles.capPicImg} src={currentPic.snapImg} alt="" />
          <div className={styles.capTakePicTitle}>
            <span style={{ float: 'left' }}>{currentPic.srcName}</span>
            <span style={{ float: 'right' }}>{currentPic.captureTime}</span>
          </div>
        </div>
      </div>)
      return pic
    }

  }
  render() {
    const currentList = this.props.basics_rt.currentList;
    return (
      <MayLayout location={this.props.location}>
        {/* 右边固定， 左边自适应布局， 故视频播放区和通过人脸区DOM结构反写 */}
        <div className={`${styles.cameraList} ${this.state.vlcClassChange}`}>
          <div className={styles.cameraSearch}>
            <Input
              className={styles.treeSelect}
              placeholder="输入关键字或编号"
              onChange={this.onCameraSelectChange}
              value={this.state.searchValue}
              prefix={<Icon type="search" className={styles.searchPrefix} />}
              suffix={this.state.searchValue ? <Icon
                type="close-circle"
                onClick={this.onEmitEmpty}
                className={styles.searchSuffix}
              /> : null}
              ref={node => (this.treeSelect = node)}
            />
          </div>
          <div className={styles.cameraTree}>
            <Tree
              onExpand={this.onExpand}
              expandedKeys={this.state.expandedKeys}
              draggable={this.state.draggable}
              autoExpandParent={false}
              onDragStart={({ event, node }) => { this.onDragState(event, node); }}
            >
              {this.renderTreeNode(this.props.basics.groupTree)}
            </Tree>
          </div>
          <iframe
            src="about:blank" frameBorder="0" filter="progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=1)"
            className={styles.cameraListIframe} />

        </div>

        <div className={styles.contentRight}>
          <div className={styles.videoContain}>
            <div
              className={styles.icon}
            >

              <div
                className={`${styles.vlcTogIcon} ${this.state.iconClassChange} ${this.state.flag === 2 ? styles.iconMoveRight : ''}`}
                onClick={this.onVlcTogIconClick.bind(this, this.state.flag)}
                title="点击切换视频">
              </div>
              <iframe
                src="about:blank" frameBorder="0" filter="progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=1)"
                className={`${styles.iconIframe} ${this.state.flag === 2 ? styles.iconMoveRight : ''}`} />
            </div>
            <div
              className={`${styles.toggleScreenIcon} ${this.state.screenSize === 1 ? styles.one2four : styles.four2one}`}
              onClick={this.onScreenTogIconClick.bind(this, this.state.screenSize)}
            />

            {this.renderVideos(this.state.screenSize)}
          </div>
          <div className={styles.faceContain}>
            <div className={styles.faceTitle}>当前抓拍</div>
            <div className={styles.faceContent}>
              {/* {this.props.basics_rt.passList ? this.props.basics_rt.passList.map(value => <AlarmFaceCard key={value.id} dataSource={value}/>) : ''} */}
              {this.props.basics_rt.currentList ? this.renderCurrentPic(currentList) : []}
            </div>
          </div>
        </div>
        <div className={styles.contentLeft}>
          <div className={styles.alarmList}>
            <div className={styles.alarmListTitle}>最新抓拍</div>
            <div className={styles.leftAllow}>
              <span className={styles.allowLeft} style={{ display: this.state.swip === 0 ? 'none' : 'inline-block' }} onClick={this.onArrowLeftClick} >
                {/* <span className={styles.badge}>+10</span>*/}
              </span>
            </div>
            <div className={styles.alarmContair} >
              <div className={styles.swipItem} style={this.swipStyle()} >
                {this.props.basics_rt.faceList ? this.props.basics_rt.faceList.map(value =>
                  <AlarmFaceCard
                    key={value.id}
                    active={styles.cardAlarm}
                    allGroups={this.props.basics && this.props.basics.allGroups ?
                      this.props.basics.allGroups : []}
                    onClick={this.showPassDetail.bind(this, value)}
                    dataSource={value} />
                ) : ''}
              </div>
            </div>
            <div className={styles.rigthAllow}>
              <span
                className={styles.allowRight}
                style={{ display: this.props.basics_rt.faceList.length * 215 + this.state.swip < 215 * 8 ? 'none' : 'inline-block' }}
                onClick={this.onArrowRightClick} />
            </div>
          </div>
        </div>

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

        />
        <AddTargetModal
          ref={this.saveFormRef}
          dataSource={this.props.basics.newFacetrack}
          data={this.props.basics.detailsModalData ? this.props.basics.detailsModalData : null}
          visible={this.props.basics.addTargetModal}
          // treeData={this.props.basics && this.props.basics.groupTree ?
          //   this.props.basics.groupTree : []}
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

function mapStateToProps({ basics_rt, system, basics }) {
  return { basics_rt, system, basics };
}

export default connect(mapStateToProps)(RealMonitor);
