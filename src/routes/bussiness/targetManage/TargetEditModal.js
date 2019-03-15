/**
 * 
 * created by xuhuang on 2018/4/24
 */

import React from 'react';
import { connect } from 'dva';
import { Modal, Upload, Icon, Button } from 'antd';
import { API_PREFIX } from '../../../utils/config';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
class TargetEditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      loading: false,
      imageUrl: '',
      selectedImg: [],
      cancelImg: []
    }
  };
  onCancel = e => {
    const poiPerson = this.props.bussiness.poiPerson;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          isShowModal: false
        }
      }
    });
  }
  onUploadChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        const { poiPerson } = this.props.bussiness;
        this.setState({
          loading: false
        });
        this.props.dispatch({
          type: 'bussiness/success',
          payload: {
            poiPerson: {
              ...poiPerson,
              imageUrl
            }
          }
        });
      });
      const newFileList = []
      info.fileList.map(value => {
        value.response.result.dst.map(v => {
          newFileList.push(v);
        })
        return newFileList;
      })

      this.setState({
        // fileList: info.file.response.result.dst
        fileList: newFileList
      });
      // const poiPerson = this.props.bussiness.poiPerson;
      // const { addPoiParams } = poiPerson;
      // this.props.dispatch({
      //   type: 'bussiness/success',
      //   payload: {
      //     poiPerson: {
      //       ...poiPerson,
      //       addPoiParams: {
      //         ...addPoiParams,
      //         originImg_path_1: info.file.response.result.src.path
      //       }
      //     }
      //   }
      // });
    }
  };
  renderImgContainer = () => (<div>
    <span >请选择需要检索的人脸</span>
    <div >
      <div style={{ width: `${this.state.fileList.length * 85}px` }}>
        {this.renderSelectImg(this.state.fileList)}
      </div>
    </div>
  </div>);
  renderSelectImg = fileList => {
    let img = '';
    img = fileList.map(value => (
      <img src={value.url} alt="" key={value.path} onClick={this.selectedImg.bind(this, value)} />
    ));
    return img;
  };
  renderImgList = () => {
    let img = '';
    img = this.props.bussiness.poiPerson.imgList.map((v, i) => (
      <img src={v} key={i} />
    ))
    return img;
  }
  selectedImg = (record) => {
    //   let newSelectedImg =this.state.selectedImg;
    //   let cancelImg =this.state.cancelImg;
    //  if(newSelectedImg.length>0){
    //    newSelectedImg.map((value,i)=>{
    //      if(value.name==record){
    //       cancelImg.push(newSelectedImg[i])
    //       delete newSelectedImg[i];
    //        this.setState({
    //          cancelImg:cancelImg
    //        })
    //      }else{
    //       newSelectedImg.push(record);
    //       this.setState({
    //         selectedImg:newSelectedImg
    //       })
    //      }
    //    })
    //  }

  }
  renderUploadIcon = () => (<div >
    <Icon type={this.state.loading ? 'loading' : 'plus'} />
  </div>);

  renderSelectedImgs = () => {
    let img = '';
    img = this.state.selectedImg.map(value => (
      <img src={value.url} alt="" key={value.path} />
    ));
    return img;
  }


  render() {
    const { poiPerson } = this.props.bussiness;
    return (
      <Modal
        title="编辑目标图片"
        footer=""
        visible={this.props.bussiness.poiPerson.isShowModal}
        closable={false}
      >
        <div>
          <span>上传照片：</span>
          <Upload
            action={`${API_PREFIX}/poi/uploadFace.do`}
            name="image_1"
            listType="picture-card"
            onChange={this.onUploadChange}
          >
            {/* {this.renderUploadIcon()} */}
            {poiPerson.imageUrl ? <img src={poiPerson.imageUrl} alt="" /> : this.renderUploadIcon()}
          </Upload>
          {this.state.fileList && this.state.fileList.length > 0 ? this.renderImgContainer() : null}
        </div>
        <div>
          <div>
            <Button type="primary" style={{ marginRight: '40px' }} >全选</Button>
            <Button type="primary" ghost>取消选中</Button>
            <Button type="primary" style={{ marginRight: '40px' }} >删除选中</Button>

          </div>
          {/* {this.state.selectedImg.length>0? this.renderSelectedImgs():[]} */}
          {this.props.bussiness.poiPerson.imgList.length > 0 ? this.renderImgList() : []}
        </div>
        <Button type="primary" style={{ marginRight: '40px' }} onClick={this.onSubmit}>ok</Button>
        <Button type="primary" ghost onClick={this.onCancel}>cancel</Button>

      </Modal>
    )
  }


}

function mapStateToProps({ bussiness }) {
  return { bussiness };
}

export default connect(mapStateToProps)(TargetEditModal);
