/**
 * Created by Jason on 2018/4/4.
 */
/**
 * Created by Jason on 2018/4/4.
 */

import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Upload, Button, Icon, Progress,message } from 'antd';
// import SystemLayout from '../system/SystemLayout';
import { API_PREFIX } from '../../../utils/config';
import styles from './IndexPage.css';
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orginImg_1: '',
      orginImg_2: '',
      upload_1: '',
      upload_2: '',
      magnifier: '',
      left: 0,
      top: 0,
      progressShow: true,
      percent: 0,
      imgList_1: [],
      imgList_2: [],
      path_1: '',
      path_2: ''
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'contrast/success',
      payload: {
        facetrackId1: '',
        facetrackId2: '',
        percent: ''
      }
    });
  }
  onMouseMove = (id, magnifier, rectId, e) => {
    if (rectId === 'rect1' && this.state.upload_1 === '') {
      return false;
    }
    if (rectId === 'rect2' && this.state.upload_2 === '') {
      return false;
    }
    this.setState({
      magnifier,
      progressShow: false
    });
    const img = document.getElementById(id);
    const mag = document.getElementById('mag');
    const rect = document.getElementById(rectId);
    const scale = 2;
    let left = e.clientX - img.getBoundingClientRect().left;
    let top = e.clientY - img.getBoundingClientRect().top;
    rect.style.display = 'block';
        // 图片放大
    if (top <= 100) top = 100;
    if (left <= 100) left = 100;
    if (top >= 300) top = 300;
    if (left >= 300) left = 300;
    mag.style.backgroundImage = `url(${this.state.magnifier})`;
    mag.style.backgroundRepeat = 'no-repeat';
    mag.style.backgroundSize = '200% 200%';
    mag.style.backgroundPosition = `-${scale * (left - 100)}px -${scale * (top - 100)}px`;

        // 蓝色小滑块移动
    let r_left = e.clientX - img.getBoundingClientRect().left - 100;
    let r_top = e.clientY - img.getBoundingClientRect().top - 100;

    if (r_left <= 0) r_left = 0;
    if (r_top <= 0) r_top = 0;
    if (r_left >= 200) r_left = 200;
    if (r_top >= 200) r_top = 200;

    rect.style.left = `${r_left}px`;
    rect.style.top = `${r_top}px`;
  }
  onMouseOut = () => {
    this.setState({
      magnifier: '',
      progressShow: true
    });
    const mag = document.getElementById('mag');
    const rect1 = document.getElementById('rect1');
    const rect2 = document.getElementById('rect2');
    mag.style.background = 'none';
    rect1.style.display = 'none';
    rect2.style.display = 'none';
  }

  handleChange1 = info => {
    if (info.file.status !== 'uploading') {
    }
    if (info.file.status === 'done'&&info.file.response.message=='操作成功') {
      const dst = info.file.response.result.dst
      this.setState({
        imgList_1: dst
      });
      this.onSelectImg(dst[0].displayItem.path, dst[0].displayItem.url, 1)
            // Get this url from response in real world.
      // getBase64(info.file.originFileObj, imageUrl => {
      //   this.setState({
      //     orginImg_1: imageUrl,
      //     upload_1: imageUrl,
      //     path_1: imageUrl
      //   });
      // });
    } else if (info.file.status === 'error'||(info.file.response&&info.file.response.message=='获取头像失败.')) {
      message.error(`${info.file.name}上传失败.`);
    }
  }

  handleChange2 = info => {
    if (info.file.status !== 'uploading') {
    }
    if (info.file.status === 'done'&&info.file.response.message=='操作成功') {
      const dst = info.file.response.result.dst
      this.setState({
        imgList_2: info.file.response.result.dst
      });
      this.onSelectImg(dst[0].displayItem.path, dst[0].displayItem.url, 2)

            // Get this url from response in real world.
      // getBase64(info.file.originFileObj, imageUrl => {
      //   this.setState({
      //     orginImg_2: imageUrl,
      //     upload_2: imageUrl,
      //     path_2: imageUrl
      //   });
      // });
    } else if (info.file.status === 'error'||(info.file.response&&info.file.response.message=='获取头像失败.')) {
      message.error(`${info.file.name}上传失败.`);
    }
  };
  imgItemCss1 = path => {
    if (this.state.path_1 === '') {
      return styles.itemImg;
    }
    if (path === this.state.path_1) {
      return `${styles.itemImg} ${styles.active}`;
    }
    return styles.itemImg;
  };
  imgItemCss2 = path => {
    if (this.state.path_2 === '') {
      return styles.itemImg;
    }
    if (path === this.state.path_2) {
      return `${styles.itemImg} ${styles.active}`;
    }
    return styles.itemImg;
  };
  onSelectImg = (path, src, i) => {
    const match2ImageParams = this.props.expand.match2ImageParams;
    if (i === 1) {
      this.setState({
        path_1: path, upload_1: src
      });
      if (path.indexOf('d') === 0) {
        return false;
      }
      this.props.dispatch({
        type: 'expand/success',
        payload: {
          match2ImageParams: {
            ...match2ImageParams,
            img_path_1: path
          }
        }
      });
    } else {
      this.setState({
        path_2: path, upload_2: src
      });
      if (path.indexOf('d') === 0) {
        return false;
      }
      this.props.dispatch({
        type: 'expand/success',
        payload: {
          match2ImageParams: {
            ...match2ImageParams,
            img_path_2: path
          }
        }
      });
    }
  };
  onContrast = () => {
    this.props.dispatch({
      type: 'expand/success',
      payload: {
        btnLoading: true
      }
    });
    this.props.dispatch({
      type: 'expand/matchTwoImages'
    });
  };


  render() {
    return (
        <div className={styles.wrapper}>
          <div className={styles.background}>
            <div className={styles.uploadWrapper}>
              <div className={styles.uploadBtn}>
                <Upload
                  action={`${API_PREFIX}` + '/poi/uploadFace.do'}
                  name="image_1"
                  // accept="image/jpeg"
                  showUploadList={false}
                  onChange={this.handleChange1}
                >
                  <Button><Icon type="upload" />点击上传图片</Button>
                </Upload>
              </div>
              <div
                className={styles.uploadimg} id="img1"
                onMouseMove={this.onMouseMove.bind(this, 'img1', this.state.upload_1, 'rect1')}
                onMouseOut={this.onMouseOut}
              >
                <img src={this.state.upload_1} alt=""/>
                <div className={styles.rect} id="rect1" />
              </div>
              <div className={styles.imgList}>
                {/* <img
                  src={this.state.orginImg_1}
                  className={this.imgItemCss1(this.state.orginImg_1)}
                  onClick={this.onSelectImg.bind(this, this.state.orginImg_1, this.state.orginImg_1, 1)}
                  alt=""
                /> */}
                {this.state.imgList_1.map((v,i) => (
                  <img
                  key={i}
                    src={v.displayItem.url}
                    onClick={this.onSelectImg.bind(this, v.displayItem.path, v.displayItem.url, 1)}
                    className={this.imgItemCss1(v.displayItem.path)} alt=""
                  />
                                    ))}
              </div>
            </div>
            <div className={styles.magnifier}>
              <div className={styles.uploadBtn}/>
              <div className={styles.magWrapper} id="mag">
                {this.state.magnifier ? '' : <div className={styles.Progress}>
                  <Progress
                    className={styles.circle}
                    type="circle"
                    percent={(parseFloat( this.props.expand.percent * 100).toFixed(2))}
                    format={percent => <span style={{ color: '#fff' }}>{`${percent}%`}</span>}
                  />
                  <br/>
                  <Button
                   size="large"
                    type="primary"
                    loading={this.props.expand.btnLoading}
                    onClick={this.onContrast}
                    disabled={this.state.upload_1 && this.state.upload_2 ? false : 'disabled'}
                  >开始比对</Button>
                </div>}
              </div>
            </div>
            <div className={styles.uploadWrapper} >
              <div className={styles.uploadBtn}>
                <Upload
                  action={`${API_PREFIX}` + '/poi/uploadFace.do'}
                  name="image_1"
                  // accept="image/jpeg"
                  showUploadList={false}
                  onChange={this.handleChange2}
                >
                  <Button><Icon type="upload" />点击上传图片</Button>
                </Upload>
              </div>
              <div
                className={styles.uploadimg} id="img2"
                onMouseMove={this.onMouseMove.bind(this, 'img2', this.state.upload_2, 'rect2')}
                onMouseOut={this.onMouseOut}
              >
                <img src={this.state.upload_2} alt=""/>
                <div className={styles.rect} id="rect2" />
              </div>
              <div className={styles.imgList}>
                {/* <img
                  src={this.state.orginImg_2}
                  className={this.imgItemCss2(this.state.upload_2)}
                  onClick={this.onSelectImg.bind(this, this.state.orginImg_2, this.state.orginImg_2, 2)}
                  alt=""
                /> */}
                {this.state.imgList_2.map((v,i) => (
                  <img
                  key={i}
                    src={v.displayItem.url}
                    className={this.imgItemCss2(v.displayItem.path)}
                    onClick={this.onSelectImg.bind(this, v.displayItem.path, v.displayItem.url, 2)}
                    alt=""
                  />
                                    ))}
              </div>
            </div>
          </div>

        </div>
    );
  }
}
function mapStateToProps({ expand }) {
  return { expand };
}
export default connect(mapStateToProps)(IndexPage);

