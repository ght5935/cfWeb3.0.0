/**
 * Created by Jason on 2018/2/26.
 */
import React from 'react';
import { connect } from 'dva';
import TweenOne from 'rc-tween-one';
import { Button, Upload, Icon, message, Card, Progress, Spin, InputNumber, TreeSelect } from 'antd';
import styles from './ImgRetrieve.less';
import { API_PREFIX } from '../../../utils/config';
import TargetGroupImgDetail from './TargeGroupImgDetail';

const Dragger = Upload.Dragger;
const { TreeNode } = TreeSelect;
const TweenOneGroup = TweenOne.TweenOneGroup;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
function removeRepeat(arr, item) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === item) {
      arr.splice(i, 1);
    }
  }
  return arr;
}
class TargetGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      originUpImg: ''
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.fileList && nextProps.fileList.length > 0 && nextProps.fileList !== this.props.fileList) {
      const poiToFace = this.props.expand.poiToFace;
      const { createFtParams } = poiToFace;
      this.props.dispatch({
        type: 'expand/success',
        payload: {
          poiToFace: {
            ...poiToFace,
            createFtParams: {
              ...createFtParams,
              img_path_1: nextProps.fileList[0].path
            }
          }
        }
      })
    }
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'expand/getTargetGroups'
    });
  }
  addPicture = () => {
    this.props.dispatch({
      type: 'expand/addPicture'
    })
  }

  toggleClass = value => {
    const checkTake = this.props.expand.poiToFace.selectImg;
    if (checkTake.indexOf(value.path) !== -1) {
      return styles.selectedImg
    }
    return styles.notSelectedImg;

  }
  bindFacetrack = value => {
    const poiToFace = this.props.expand.poiToFace;
    const { originUpImg, selectImg } = this.props.expand.poiToFace;
    if (selectImg.length == 0) {
      selectImg.push(value.path);
      originUpImg.push(value.displayItem.path);
    } else {
      if (selectImg.indexOf(value.path) == -1) {
        selectImg.push(value.path);
        originUpImg.push(value.displayItem.path)
      } else {
        removeRepeat(selectImg, value.path);
        removeRepeat(originUpImg, value.displayItem.path);
      }
    }
    this.props.dispatch({
      type: 'expand/success',
      payload: {
        poiToFace: {
          ...poiToFace,
          selectImg: selectImg,
          originUpImg
        }
      }
    })
  }
  onCardClick = v => {
    const poiToFace = this.props.expand.poiToFace;
    this.props.dispatch({
      type: 'expand/success',
      payload: {
        poiToFace: {
          ...poiToFace,
          showTakeImg: v,
          isShowVisible: true,
          faceList: this.props.fileList,
          personId: v.personId
        }
      }
    })
  }
  onCancelShowTakeImg = () => {
    const poiToFace = this.props.expand.poiToFace;
    this.props.dispatch({
      type: 'expand/success',
      payload: {
        poiToFace: {
          ...poiToFace,
          showTakeImg: {},
          isShowVisible: false,
          selectImg: []
        }
      }
    })
  }
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

  onGroupChange = (value) => {
    const poiToFace = this.props.expand.poiToFace;
    const { ftToPoiParams } = poiToFace;
    this.props.dispatch({
      type: 'expand/success',
      payload: {
        poiToFace: {
          ...poiToFace,
          ftToPoiParams: {
            ...ftToPoiParams,
            groupIds: value,
          }
        }
      }
    });
    this.setState({
      groupIdValue: value
    })
  }
  onThresholdChange = v => {
    this.props.onChangeGroupValue(v);
    const poiToFace = this.props.expand.poiToFace;
    const { ftToPoiParams } = poiToFace;
    this.props.dispatch({
      type: 'expand/success',
      payload: {
        poiToFace: {
          ...poiToFace,
          ftToPoiParams: {
            ...ftToPoiParams,
            alarmThreshold: v
          }
        }
      }
    });
  }
  onSearchClick = () => {
    const poiToFace = this.props.expand.poiToFace;
    this.props.dispatch({
      type: 'expand/success',
      payload: {
        poiToFace: {
          ...poiToFace,
          poiProcess: false
        }
      }
    })
    this.props.dispatch({
      type: 'expand/createFaceTrack2'
    });
  }
  onSelectImg = path => {
    const poiToFace = this.props.expand.poiToFace;
    const { createFtParams } = poiToFace;
    this.props.dispatch({
      type: 'expand/success',
      payload: {
        poiToFace: {
          ...poiToFace,
          createFtParams: {
            ...createFtParams,
            img_path_1: path
          }
        }
      }
    });
  };

  cssIsSelected = path => {
    if (path === this.props.expand.poiToFace.createFtParams.img_path_1) {
      return `${styles.imgToBeSelected} ${styles.imgSelected}`;
    }
    return styles.imgToBeSelected;
  };
  renderImgContainer = () => (<div>
    <div className={styles.imgContainer}>
      <div style={{ width: `${this.props.fileList.length * 85}px` }}>
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
  setProps = () => {
    const _this = this;
    return {
      name: 'image_1',
      action: `${API_PREFIX}/poi/uploadFace.do`,
      listType: false,
      onChange(info) {
        const statusImg = info.file.status;
        let originUpImg = [];
        info.fileList.map(value => {
          if (value.response) {
            try {
              originUpImg.push(value.response.result.src.path);
            } catch (err) {

            }
          }
        });
        // if (statusImg !== 'uploading') {
        // }
        if (statusImg === 'done') {
          getBase64(info.file.originFileObj, imageUrl => {
            _this.props.onGroupPicture({ imageUrl: imageUrl, originUpImg: originUpImg }, info.file.response.result.dst)
          });
          // message.success(`${info.file.name} 上传成功.`);
          let a = info.fileList[0]
          if (a.response.status !== 0) {
            message.error(a.response.message)
          }
        } else if (statusImg === 'error') {
          message.error(`${info.file.name} 上传失败.`);
        }
      }
    };
  }


  render() {
    const _this = this;
    let currentImg = [];
    // const props = {
    //   name: 'image_1',
    //   action: `${API_PREFIX}/poi/uploadFace.do`,
    //   listType: false,
    //   onChange(info) {
    //     const status = info.file.status;
    //     let originUpImg =[];
    //    info.fileList.map(value=>{
    //        if(value.response){
    //         originUpImg.push(value.response.result.src.path);
    //        }

    //    });
    //     if (status !== 'uploading') {
    //     }
    //     if (status === 'done') {
    //       getBase64(info.file.originFileObj, imageUrl => {
    //         _this.setState({
    //           originImg: imageUrl
    //         });
    //       });
    //       _this.setState({
    //         fileList: info.file.response.result.dst,
    //         originUpImg:originUpImg
    //       });

    //       message.success(`${info.file.name} 上传成功.`);
    //     } else if (status === 'error') {
    //       message.error(`${info.file.name} 上传失败.`);
    //     }
    //   }
    // };
    const poiToFace = this.props.expand.poiToFace;
    const { ftToPoiParams } = poiToFace;
    return (
      <div className={styles.content}>
        <div className={styles.headerBar}>
          <div className={styles.right}>
            <div className={styles.title}>筛选条件</div>
            <div className={styles.formItemPerson}>
              <label className={styles.label}>目标分组：</label>
              <TreeSelect
                style={{ width: '30%', marginRight: '5px', maxHeight: '32px', overflow: 'auto', verticalAlign: 'middle' }}
                allowClear
                treeDefaultExpandAll
                dropdownMatchSelectWidth={false}
                value={ftToPoiParams.groupIds ? `${this.state.groupIdValue}` : ''}
                onChange={this.onGroupChange}
                placeholder="请选择分组"
                treeCheckStrictly={true}
              >
                {this.renderTreeNode(poiToFace.targetGroups ? poiToFace.targetGroups : [])}
              </TreeSelect>
              <label className={styles.label}>报警阈值：</label>
              <InputNumber
                max={100}
                min={0}
                onChange={this.onThresholdChange}
                // formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                // parser={value => value.replace(/\$\s?|(,*)/g, '')}
                value={this.props.inputGroupValue}
              />
              <Button type="primary" style={{ marginLeft: '20px' }} onClick={this.onSearchClick}>开始检索</Button>
            </div>
          </div>
          <div className={styles.left}>
            <div className={styles.title}>图片选择</div>
            <div className={styles.uploadArea}>
              <div className={styles.upload}>
                <Dragger {...this.setProps()}>
                  <div className={styles.dragger}>
                    <p className="ant-upload-drag-icon">
                      <Icon type="upload" />
                    </p>
                    <p className="ant-upload-text">上传图片</p>
                  </div>
                </Dragger>
              </div>
              <div className={styles.uploadImg}>
                <img
                  className={styles.originImg}
                  src={this.props.originShowImg}
                  alt="" />
              </div>
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
          </div>
          <div className={styles.cardWapper}>
            <Spin style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} spinning={this.props.loading.global} indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />
            <TweenOneGroup enter={[{ translateY: -5, opacity: 0 }, { translateY: 0, opacity: 1 }]} className={styles.list} >
              {this.props.expand.poiToFace.matchPersonList && this.props.expand.poiToFace.matchPersonList.length > 0 ? this.props.expand.poiToFace.matchPersonList.map((v, idx) => (<div className={styles.card} key={idx}>
                <div className={styles.cardContent} onClick={this.onCardClick.bind(this, v)}>
                  <div className={styles.cardTop}>
                    <p><img src={v.uploadImgs && v.uploadImgs.length > 0 ? v.uploadImgs[0] : v.imgs && v.imgs.length > 0 ? v.imgs[0] : ''} alt="" /></p>
                    <p className={styles.text}>
                      <span>{v.name}/{v.gender}</span>
                    </p>
                    <p className={styles.text} title={v.identityCard}>
                      <span>{v.identityCard}</span>
                    </p>
                    <p className={styles.text} title={v.group && v.group.length > 0 ? v.group[0].name : '尚未分组'}>
                      <span>{v.group && v.group.length > 0 ? v.group[0].name : '尚未分组'}</span>
                    </p>
                  </div>
                  <div className={styles.cardBottom}>
                    <Progress percent={parseFloat((v.socre).toFixed(2))} size="small" />
                  </div>
                </div>
              </div>)) : ''}
            </TweenOneGroup>
          </div>
        </div>
        <TargetGroupImgDetail
          visible={this.props.expand.poiToFace.isShowVisible}
          data={this.props.expand.poiToFace.showTakeImg ? this.props.expand.poiToFace.showTakeImg : null}
          onCancel={this.onCancelShowTakeImg}
          fileList={this.props.fileList}
          onBindFacetrack={this.bindFacetrack}
          ontoggleClass={this.toggleClass}
          onAddPicture={this.addPicture}
        />
      </div>
    );
  }
}

function mapStateToProps({ expand, loading }) {
  return { expand, loading };
}

export default connect(mapStateToProps)(TargetGroup);
