/**
 * Created by Jason on 2018/2/26.
 */
import React from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import TweenOne from 'rc-tween-one';
import Utils from '../../../iconfont/icon/iconfont.css'
import { Button, Upload, Icon, message, Progress, Spin, DatePicker, InputNumber, TreeSelect, Col, Row } from 'antd';
import styles from './ImgRetrieve.less';
import { API_PREFIX } from '../../../utils/config';
import TakeImgDetail from './TakeImgDetail';
import TimeLine from '../../../components/common/TimeLine/TimeLine'

const Dragger = Upload.Dragger;
const { RangePicker } = DatePicker;
const { TreeNode } = TreeSelect;
const TweenOneGroup = TweenOne.TweenOneGroup;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
class TargetPerson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowMap: false
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.fileList && nextProps.fileList.length > 0 && nextProps.fileList !== this.props.fileList) {
      const faceToPoi = this.props.expand.faceToPoi;
      const { createFtParams } = faceToPoi;
      this.props.dispatch({
        type: 'expand/success',
        payload: {
          faceToPoi: {
            ...faceToPoi,
            createFtParams: {
              ...createFtParams,
              img_path_1: nextProps.fileList[0].path
            }
          }
        }
      });
    }
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'expand/getGroupTrees'
    })
    this.props.dispatch({
      type: 'expand/getCategoryTree'
    });
  }
  onSearchClick = () => {
    const faceToPoi = this.props.expand.faceToPoi;
    this.props.dispatch({
      type: 'expand/success',
      payload: {
        faceToPoi: {
          ...faceToPoi,
          ftProcess: false,
          matchFaceList: []
        }
      }
    })
    this.props.dispatch({
      type: 'expand/createFaceTrack'
    });
  }
  onSelectImg = path => {
    const faceToPoi = this.props.expand.faceToPoi;
    const { createFtParams } = faceToPoi;
    this.props.dispatch({
      type: 'expand/success',
      payload: {
        faceToPoi: {
          ...faceToPoi,
          createFtParams: {
            ...createFtParams,
            img_path_1: path
          }
        }
      }
    });
  };
  onCardClick = v => {
    const faceToPoi = this.props.expand.faceToPoi;
    this.props.dispatch({
      type: 'expand/success',
      payload: {
        faceToPoi: {
          ...faceToPoi,
          takeImgData: v,
          takeImgModal: true
        }
      }
    })
  }
  onSrcChange = v => {
    const faceToPoi = this.props.expand.faceToPoi;
    const { ftToFtParams, createFtParams } = faceToPoi;
    this.props.dispatch({
      type: 'expand/success',
      payload: {
        faceToPoi: {
          ...faceToPoi,
          createFtParams: {
            ...createFtParams,
            srcIds: v
          },
          ftToFtParams: {
            ...ftToFtParams,
            srcIds: v
          }
        }
      }
    });
  }
  onSearchOrgunit = id => {
    let value = this.props.expand.faceToPoi.orgunitId;
    if (id) {
      value = id - 0;
    }
    const expand = this.props.expand;
    const { faceToPoi } = expand;
    this.props.dispatch({
      type: 'expand/success',
      payload: {
        faceToPoi: {
          ...faceToPoi,
          orgunitId: value
        }
      }
    });
    this.props.dispatch({
      type: 'expand/getCategoryTree'
    });
  };
  onCameraChange = (value) => {
    const expand = this.props.expand;
    const { faceToPoi } = expand;
    const { ftToFtParams } = faceToPoi;
    this.props.dispatch({
      type: 'expand/success',
      payload: {
        faceToPoi: {
          ...faceToPoi,
          ftToFtParams: {
            ...ftToFtParams,
            srcIds: value,
            // 摄像头选项置空
          }
        }
      }
    })
  }
  renderCameraNode = data => data.map(item => {
    return <TreeNode key={item.name} value={item.srcId} selectable={false} title={<div><i className={`${Utils.iconfont}  ${Utils.iconShexiangtou} ${Utils.shexiaongtouColor}`}></i>{item.name}</div>} />;
  });
  // 生成树
  renderTreeNode = data => data.map(item => {
    if (item.children) {
      return (
        <TreeNode key={item.cameraCategory.id} value={String(item.cameraCategory.id)} title={<div>{item.cameraCategory.name}</div>}>
          {item.cameras ? this.renderCameraNode(item.cameras) : ''}
          {this.renderTreeNode(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode
      key={item.cameraCategory.id}
      value={String(item.cameraCategory.id)}
      title={<div>{item.cameraCategory.name}</div>}
      disabled={item.cameras.length > 0 ? false : true}
    >
      {item.cameras ? this.renderCameraNode(item.cameras) : ''}
    </TreeNode>
  });
  onThresholdChange = v => {
    this.props.onChangePersonValue(v);
    if (v == undefined)
      v = ''
    const faceToPoi = this.props.expand.faceToPoi;
    const { ftToFtParams } = faceToPoi;
    this.props.dispatch({
      type: 'expand/success',
      payload: {
        faceToPoi: {
          ...faceToPoi,
          ftToFtParams: {
            ...ftToFtParams,
            threshold: v
          }
        }
      }
    });
  }
  onTimeChange = (date, dateStr) => {
    let startTime = '';
    let endTime = '';
    if (date.length !== 0) {
      startTime = moment(date[0]).format('YYYY-MM-DD HH:mm:ss');
      endTime = moment(date[1]).format('YYYY-MM-DD HH:mm:ss');
    }
    const faceToPoi = this.props.expand.faceToPoi;
    const { ftToFtParams } = faceToPoi;
    this.props.dispatch({
      type: 'expand/success',
      payload: {
        faceToPoi: {
          ...faceToPoi,
          ftToFtParams: {
            ...ftToFtParams,
            startTime,
            endTime
          }
        }
      }
    });
  };
  onCancelTakeImgDetail = () => {
    const faceToPoi = this.props.expand.faceToPoi;
    this.props.dispatch({
      type: 'expand/success',
      payload: {
        faceToPoi: {
          ...faceToPoi,
          takeImgModal: false,
          takeImgData: {}
        }
      }
    });
  }

  cssIsSelected = path => {
    if (path === this.props.expand.faceToPoi.createFtParams.img_path_1) {
      return `${styles.imgToBeSelected} ${styles.imgSelected}`;
    }
    return styles.imgToBeSelected;
  };
  renderImgContainer = () => (<div>
    <div className={styles.imgContainer}>
      <div style={{ width: `${this.props.fileList.length * 120}px`, display: 'flex' }}>
        {this.renderSelectImg(this.props.fileList)}
      </div>
    </div>
  </div>);
  renderSelectImg = fileList => {
    let img = '';
    img = fileList.map(value => (<div
      className={this.cssIsSelected(value.path)}
      key={value.path}
      onClick={this.onSelectImg.bind(this, value.path)}>
      <img src={value.url} alt="" />
    </div>
    ));
    return img;
  };
  onMapClick = () => {
    this.setState({
      isShowMap: true
    })
  }

  render() {
    const _this = this;
    const props = {
      name: 'image_1',
      action: `${API_PREFIX}/poi/uploadFace.do`,
      listType: false,
      onChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
        }
        if (status === 'done') {
          getBase64(info.file.originFileObj, imageUrl => {
            // _this.setState({
            //   originImg: imageUrl
            // });
            _this.props.onPersonPicture(imageUrl, info.file.response.result.dst)
          });
          // _this.setState({
          //   fileList: info.file.response.result.dst
          // });
          // message.success(`${info.file.name} 上传成功.`);
          let a = info.fileList[0]
          if (a.response.status !== 0) {
            message.error(a.response.message)
          }
        } else if (status === 'error') {
          message.error(`${info.file.name} 上传失败.`);
        }
      }
    };
    return (
      <div className={styles.content}>
        <div className={styles.headerBar}>
          <div className={styles.right}>
            <div className={styles.title}>筛选条件</div>
            <Row style={{ margin: '30px 0' }}>
              <Col span={16} >
                <label className={styles.label}>社区：</label>
                <TreeSelect
                  allowClear
                  treeData={this.props.expand && this.props.expand.groupTrees ?
                    this.props.expand.groupTrees : []}
                  style={{ width: '13rem', fontSize: '0.875rem' }}
                  onChange={this.onSearchOrgunit}
                  treeDefaultExpandAll
                  value={this.props.expand.faceToPoi.orgunitId ? `${this.props.expand.faceToPoi.orgunitId}` : ''}
                  placeholder="请选择社区"
                />

                <span style={{ margin: '0 10px', color: '#fff' }}> - </span>
                <TreeSelect
                  allowClear
                  onChange={this.onCameraChange}
                  treeDefaultExpandAll
                  dropdownMatchSelectWidth={false}
                  treeCheckable={true}
                  style={{ width: '13rem', fontSize: '0.875rem', maxHeight: '32px', overflow: 'auto', verticalAlign: 'middle' }}
                  value={this.props.expand.faceToPoi.ftToFtParams.srcIds ? this.props.expand.faceToPoi.ftToFtParams.srcIds : []}
                  placeholder="请选择摄像头"
                >
                  <TreeNode value="全部分组" title="全部分组" key="全部分组" >
                    {this.renderTreeNode(this.props.expand && this.props.expand.categoryTree ? this.props.expand.categoryTree : [])}
                  </TreeNode>
                </TreeSelect>
              </Col>
              <Col span={8}>
                <label className={styles.label}>相似度：</label>
                <InputNumber
                  type="text"
                  min={0}
                  max={100}
                  onChange={this.onThresholdChange}
                  value={this.props.inputPersonValue}
                />
                <span style={{ color: '#fff' }}> %</span>
              </Col>
            </Row>
            <Row>
              <Col span={16}>
                <label className={styles.label}>日期：</label>
                <RangePicker
                  style={{ width: '28rem' }}
                  defaultValue={[moment(moment().hour(-24), 'YYYY-MM-DD HH:mm:ss'), moment(moment(), 'YYYY-MM-DD HH:mm:ss')]}
                  showTime
                  format={"YYYY-MM-DD HH:mm:ss"}
                  onChange={this.onTimeChange}
                />
              </Col>
              <Col span={8}>
                <label className={styles.label} />
                <Button type="primary" onClick={this.onSearchClick}>开始检索</Button>
              </Col>
            </Row>
          </div>
          <div className={styles.left}>
            <div className={styles.title}>图片选择</div>
            <div className={styles.uploadArea}>
              <div className={styles.upload}>
                <Dragger {...props}>
                  <div className={styles.dragger}>
                    <p className="ant-upload-drag-icon">
                      <Icon type="upload" />
                    </p>
                    <p className="ant-upload-text">上传图片</p>
                  </div>
                </Dragger>
              </div>
              {/* <div className={styles.uploadImg}>
                <img
                  className={styles.originImg}
                  // src={this.state.originImg}
                  src={this.props.originImg}
                  alt="" />
              </div> */}
            </div>
            <div className={styles.imgSelect}>
              <div className={styles.selectText}>请选择需要检索的人脸</div>
              <div className={styles.selectImgAera}>
                {this.props.fileList && this.props.fileList.length > 0 ? this.renderImgContainer() : null}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.result}>
          <div className={styles.title}>
            <span>检索结果</span>
            {/* <Link to="/imgRetrieve/map" className={styles.mapBtn}>生成人员轨迹</Link> */}
            <a onClick={this.onMapClick} className={styles.mapBtn}>生成人员轨迹</a>

          </div>
          <div className={styles.cardWapper}>
            <Spin key="demo2" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} spinning={this.props.loading.global} indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />
            {this.state.isShowMap ?
              this.props.expand.faceToPoi.matchFaceList && this.props.expand.faceToPoi.matchFaceList.length > 0 ? <TimeLine data={this.props.expand.faceToPoi.matchFaceList}/> : ''
              :
              <TweenOneGroup enter={[{ translateY: -5, opacity: 0 }, { translateY: 0, opacity: 1 }]} className={styles.list} >
                {this.props.expand.faceToPoi.matchFaceList && this.props.expand.faceToPoi.matchFaceList.length > 0 ? this.props.expand.faceToPoi.matchFaceList.map((v, idx) => (
                  <div className={styles.card} key={idx}>
                    <div className={styles.cardContent} onClick={this.onCardClick.bind(this, v)}>
                      <div className={styles.cardTop}>
                        <p><img src={v.imgs[0]} alt="" /></p>
                        <p className={styles.text}>
                          <span>{v.age < 20 ? '少年' : v.age < 30 ? '青年' : v.age < 50 ? '中年' : '老年'}</span>
                          <span>{v.moustache ? '/有胡子' : ''}</span>
                          <span>{v.hat ? '/戴帽子' : ''}</span>
                        </p>
                        <p className={styles.text}>
                          <span title={v.cameraName}>{v.cameraName}</span>
                        </p>
                        <p className={styles.text} title={v.captureTime}>{v.captureTime}</p>
                      </div>
                      <div className={styles.cardBottom}>
                        <Progress percent={parseFloat((v.percent * 100).toFixed(2))} size="small" />
                      </div>
                    </div>
                  </div>
                )) : ''}
              </TweenOneGroup>}

          </div>
        </div>
        <TakeImgDetail
          visiable={this.props.expand.faceToPoi.takeImgModal}
          data={this.props.expand.faceToPoi.takeImgData ? this.props.expand.faceToPoi.takeImgData : null}
          onCancel={this.onCancelTakeImgDetail}
        />
      </div>
    );
  }
}

function mapStateToProps({ expand, loading }) {
  return { expand, loading };
}

export default connect(mapStateToProps)(TargetPerson);
