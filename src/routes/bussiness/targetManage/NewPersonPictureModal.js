/**
 * Created by gao on 2018/4/26.
 */
import React from 'react';
import { connect } from 'dva';
import { Modal, Icon, Upload, Button, message } from 'antd';
import { API_PREFIX } from '../../../utils/config';
import checkIcon from '../../../assets/checked-s.png';
import uploadPic from '../../../assets/upload.png';
import style from './Target.less';
import ConfirmModal from '../../../components/common/ConfirmModal/ConfirmModal';

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

class NewPersonPictureModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      Listfile: [],
      loading: false,
      imageUrl: '',
      addSelectedImg: [],
      iSselect: [],
      needConfirm: [],
      deleteSelectedArr: [],
      imgList: [],
      isClickDel: false,
      isShowVisable: false,
      newAddImg: []
    };
  }
  componentWillMount() {
    this.setState({
      imgList: this.props.bussiness.poiPerson.selectedListImg
    });
  }

  onCancel = e => {
    const poiPerson = this.props.bussiness.poiPerson;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          imageUrl: [],
          isShowModal: false,
          deleteArr: []
        }
      }
    });
    this.setState({
      fileList: [],
      imgList: [],
      isClickDel: false,
      imageUrl: '',
      Listfile: [],
      needConfirm: [],
      newAddImg: []
    });
  }


  onUploadChange = info => {
    const ListfileArr = info.fileList;
    this.setState({ Listfile: ListfileArr });

    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      const newfileList = [];
      info.fileList.map(value => {
        if (value.response.status == 0) {
          value.response.result.dst.map(v => {
            newfileList.push(v);
          });
        } else {
          ListfileArr.map((v, i) => {
            if (!v.response.status == 0) {
              setTimeout(() => {
                ListfileArr.splice(i, 1);
                this.setState({
                  Listfile: ListfileArr
                });
              }, 1500);
            }
            return ListfileArr;
          });
          message.error(value.response.message, 2);
        }
        return newfileList;
      });
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        const { poiPerson } = this.props.bussiness;
        this.setState({
          loading: false,
          imageUrl
        });
        this.props.dispatch({
          type: 'bussiness/success',
          payload: {
            poiPerson: {
              ...poiPerson,
              imageUrl,
            }
          }
        });
      });

      this.setState({
        fileList: newfileList
      });
    }
  };
  okChange = () => {
    this.setState({
      isShowVisable: true
    });
  }

  onComfirmSubmit = () => {
    if (this.state.newAddImg.length != 0 || this.state.deleteSelectedArr.length != 0) {
      this.props.dispatch({
        type: 'bussiness/okChange'
      });
    }
    this.setState({
      isShowVisable: false,
      fileList: [],
      imgList: [],
      isClickDel: false,
      imageUrl: '',
      Listfile: [],
      needConfirm: [],
      newAddImg: []
    });
  }
  onComfirmCancel = () => {
    this.setState({
      isShowVisable: false
    });
  }
  copySelectedPicture = record => {
    const poiPerson = this.props.bussiness.poiPerson;
    const { originImgs } = poiPerson;
    let tmp = [...this.state.imgList];
    let tmpNewAddImg = this.state.newAddImg;
    tmp.unshift(record.displayItem.url);
    if (tmpNewAddImg.indexOf(String(record.path)) > -1) {
      removeRepeat(tmp, record.displayItem.url);
      removeRepeat(tmpNewAddImg, record.path);
    } else {
      tmpNewAddImg.unshift(record.path);
    }

    if (originImgs.indexOf(String(record.displayItem.path)) > -1) {
      removeRepeat(originImgs, record.displayItem.path);
    } else {
      originImgs.unshift(record.displayItem.path);
    }

    this.setState({
      imgList: tmp
    });
    tmpNewAddImg.map(v => {
      this.selectImgCss(v);
    });
    this.setState({
      newAddImg: tmpNewAddImg
    });
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          faceImgs: tmpNewAddImg,
          originImgs
        }
      }
    });
  }
  onRemove = file => {
    const delfileList = [];
    const fileListUrl = [];
    if (file.response) {
      if (file.response.status == 0) {
        file.response.result.dst.map(v => {
          delfileList.push(v.url);
        });
      } else {
        message.error(file.response.message);
      }
    }
    this.state.fileList.map(v => {
      if (delfileList.indexOf(v.url) == -1) {
        fileListUrl.push(v);
      }
    });

    this.setState({
      fileList: fileListUrl
    });
  }

  renderSelectedImgs = () => {
    const selectedListImg = this.props.bussiness.poiPerson.selectedListImg;
    let imgList;
    if (!this.state.isClickDel) {
      imgList = [...this.state.imgList, ...selectedListImg];
    } else {
      imgList = this.state.imgList;
    }
    if (imgList.length > 0) {
      const Img = imgList.map((val, i) => (
        <div style={{ display: 'inline-block', position: 'relative' }} key={i} onClick={this.selectConfirm.bind(this, val)}>
          <img src={val} key={i} alt="" className={this.fileListCss(val)} />
          <img src={checkIcon} style={{ visibility: this.confirmIconVisible(val), position: 'absolute', right: '0', top: '5px', width: '30px', height: '30px' }} />
        </div>
      ));
      return Img;
    }
  };

  fileListCss = path => {
    if (this.state.needConfirm.indexOf(path) !== -1) {
      return `${style.fileImg} ${style.fileImgActive}`;
    }
    return style.fileImg;
  }

  checkedSelectIconVisible = (path, imgList) => {
    let isVisiable = 'hidden';
    if (imgList.indexOf(path) !== -1) {
      isVisiable = 'visible';
      return isVisiable;
    }
    return isVisiable;
  }

  renderUploadIcon = () => (<div style={{ display: 'block', backgroundColor: 'transparent' }}>
    <img src={uploadPic} alt="" style={{ backgroundColor: 'transparent' }} />
  </div>);

  renderImgContainer = () => (<div style={{ position: 'relative' }}>
    <div className={style.facePicture}>
      <div style={{ overflowY: 'auto', height: '180px', marginLeft: '5px' }}>
        {this.renderSelectImg(this.state.fileList)}
      </div>
      <span className={style.tipTitle}>可选中图片添加到目标图片</span>
    </div>
  </div>);

  renderSelectImg = fileList => {
    let img = '';
    img = fileList.map((value, i) => (<div style={{ position: 'relative', display: 'inline-block' }} key={i}>
      <img className={this.selectImgCss(value.path)} src={value.displayItem.url} alt="" key={value.path} onClick={this.copySelectedPicture.bind(this, value)} />
      <img src={checkIcon} style={{ visibility: this.checkedIconVisible(value.displayItem.url), position: 'absolute', right: '0', top: '5px', width: '30px', height: '30px' }} />
    </div>));

    return img;
  };

  selectImgCss = path => {
    if (this.state.newAddImg.indexOf(path) !== -1) {
      return `${style.detection} ${style.active}`;
    }
    return style.detection;
  };

  checkedIconVisible = path => {
    const imgList = [...this.state.imgList];
    let isVisiable = 'hidden';
    if (imgList.indexOf(path) !== -1) {
      isVisiable = 'visible';
      return isVisiable;
    }
    return isVisiable;
  }

  confirmIconVisible = val => {
    let isVisiable = 'hidden';
    if (this.state.needConfirm.indexOf(val) !== -1) {
      isVisiable = 'visible';
      return isVisiable;
    }
    return isVisiable;
  }

  selectConfirm = val => {
    const tmpArr = this.state.needConfirm;
    if (tmpArr.indexOf(val) === -1) {
      tmpArr.unshift(val);
      this.setState({
        needConfirm: tmpArr
      });
    } else {
      removeRepeat(this.state.needConfirm, val);
      this.setState({
        needConfirm: tmpArr
      });
    }
  }

  allChoose = () => {
    const { selectedListImg } = this.props.bussiness.poiPerson;
    const imgList = [...selectedListImg, ...this.state.imgList];
    this.setState({
      needConfirm: imgList
    });
  };

  cancelChoose = () => {
    this.setState({
      needConfirm: []
    });
  };

  deleteChoose = () => {
    const poiPerson = this.props.bussiness.poiPerson;
    const { selectedListImg, deleteArr } = this.props.bussiness.poiPerson;
    const needDeleteArr = this.state.needConfirm;
    const tmpNewAddImg = this.state.newAddImg;
    let tmp = [],
      imgList;
    const tmpdel = [];
    needDeleteArr.map(v => {
      if (selectedListImg.indexOf(v) != -1) {
        tmp.push(v);
      }
    });
    if (deleteArr.length > 0) {
      imgList = this.state.imgList;
    } else {
      imgList = this.state.imgList.concat(selectedListImg);
    }

    imgList.map(v => {
      if (needDeleteArr.length > 0 && needDeleteArr.indexOf(v) == -1) {
        tmpdel.push(v);
      }
    });
    if (needDeleteArr.length > 0) {
      deleteArr.map((v, i) => {
        if (tmpNewAddImg.indexOf(v.split('uploadImgs')[1]) != -1) {
          tmpNewAddImg.splice(i, 1);
        }
        return tmpNewAddImg;
      });

      this.setState({
        imgList: tmpdel,
        isClickDel: true,
        deleteSelectedArr: tmp,
        needConfirm: [],
        newAddImg: tmpNewAddImg
      });

      this.props.dispatch({
        type: 'bussiness/success',
        payload: {
          poiPerson: {
            ...poiPerson,
            deleteArr: tmp.concat(deleteArr),
            faceImgs: tmpNewAddImg
          }
        }
      });
    }
  };
  render() {
    const { poiPerson } = this.props.bussiness;
    return (<Modal
      title=""
      footer=""
      visible={this.props.bussiness.poiPerson.isShowModal}
      width={1120}
      closable={false}
      bodyStyle={{ border: '1px solid #02abe3' }}
      className={style.modalBody}
    >
      <div>
        <div className={style.editModalHeader}>
          <span className={style.modalHeaderTitle}>编辑目标照片</span>
        </div>
      </div>
      <div className={style.tablebody}>
        <table className={style.tablestyle} >
          <thead>
            <tr>
              <th>上传照片：</th>
              <th >
                <Upload
                  action={`${API_PREFIX}/poi/uploadFace.do`}
                  listType="picture-card"
                  name="image_1"
                  fileList={this.state.Listfile}
                  onChange={this.onUploadChange}
                  showUploadList={{ showPreviewIcon: false }}
                  onRemove={this.onRemove}
                  className={style.uploadRenderC}
                >
                  {this.state.Listfile.length >= 6 ? null : this.renderUploadIcon()}
                </Upload>
                <span className={style.tipTitleTop} style={{ display: 'inline-block', marginBottom: '5px' }}>点击上方按钮上传照片（1-8张）</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr >
              <td style={{ height: '112px' }}>检测出来的人脸图片：</td>
              <td> {this.state.fileList && this.state.fileList.length > 0 ? this.renderImgContainer() : null}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={style.modalFooter}>
        <Button type="primary" style={{ marginRight: '20px', color: '#ffffff', borderColor: '#02abe3' }} ghost icon="bars" onClick={this.allChoose} >全选</Button>
        <Button type="primary" style={{ marginRight: '20px', color: '#ffffff', borderColor: '#02abe3' }} ghost icon="delete" onClick={this.cancelChoose}>取消选中</Button>
        <Button type="primary" style={{ marginRight: '20px', color: '#ffffff', borderColor: '#02abe3' }} ghost icon="delete" onClick={this.deleteChoose}>删除选中</Button>
        <div className={style.modalFooterContent}>
          <div style={{ marginLeft: '5px' }}>
            {this.renderSelectedImgs()}
          </div>
        </div>
        <Button type="primary" onClick={this.okChange} style={{ color: '#ffffff', borderColor: '#02abe3', margin: '15px 0' }}> 确认修改 </Button>
        <Button type="primary" onClick={this.onCancel} ghost style={{ color: '#ffffff', borderColor: '#02abe3', margin: '15px 20px' }}> 取消 </Button>
      </div>
      <ConfirmModal
        visiable={this.state.isShowVisable}
        onSubmit={this.onComfirmSubmit}
        onCancel={this.onComfirmCancel}
      />
    </Modal>);
  }
}
function mapStateToProps({ bussiness }) {
  return { bussiness };
}

export default connect(mapStateToProps)(NewPersonPictureModal);
