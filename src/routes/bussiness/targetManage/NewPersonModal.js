/**
 * Created by Jason on 2018/1/26.
 */
import React from 'react';
import { connect } from 'dva';
import { Modal, Input, TreeSelect, Select, InputNumber, Radio, Upload, Button, Icon, Form } from 'antd';
import styles from './Target.less';

import { API_PREFIX } from '../../../utils/config';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { Option } = Select;
const { TreeNode } = TreeSelect;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

class NewPersonModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      loading: false,
      imageUrl: ''
    };
  }
  onUploadChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.

      // 上传图片获取图片名称，作为姓名回显
      const name = info.file.name.split('.')[0]
      const poiPerson = this.props.bussiness.poiPerson;
      const { addPoiParams } = poiPerson;
      this.props.dispatch({
        type: 'bussiness/success',
        payload: {
          poiPerson: {
            ...poiPerson,
            addPoiParams: {
              ...addPoiParams,
              name,
              img_path_1: info.file.response.result.dst[0].path,
              originImg_path_1: info.file.response.result.dst[0].displayItem.path
            }
          }
        }
      });

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
      try {
        this.setState({
          fileList: info.file.response.result.dst
        });
      } catch (err) {

      }
    }
  };
  onSelectImg = value => {
    const poiPerson = this.props.bussiness.poiPerson;
    const { addPoiParams } = poiPerson;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          addPoiParams: {
            ...addPoiParams,
            img_path_1: value.path,
            originImg_path_1: value.displayItem.path
          }
        }
      }
    });
  };
  onNameChange = e => {
    const poiPerson = this.props.bussiness.poiPerson;
    const { addPoiParams } = poiPerson;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          addPoiParams: {
            ...addPoiParams,
            name: e.target.value
          }
        }
      }
    });
  };
  onGenderChange = e => {
    const poiPerson = this.props.bussiness.poiPerson;
    const { addPoiParams } = poiPerson;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          addPoiParams: {
            ...addPoiParams,
            gender: e.target.value - 0
          }
        }
      }
    });
  };
  onGroupChange = value => {
    if (value == undefined) {
      value = ''
    }
    const poiPerson = this.props.bussiness.poiPerson;
    const { addPoiParams } = poiPerson;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          addPoiParams: {
            ...addPoiParams,
            groupId: value
          }
        }
      }
    });
  };

  renderCameraNode = data => data.map(item => {
    return <TreeNode key={`${item.id}-${item.name}`} value={`${item.orgunitId}-${item.id}`} title={<div>{item.name}</div>} />;
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

  onOrgunitIdChange = value => {
    const poiPerson = this.props.bussiness.poiPerson;
    const { addPoiParams } = poiPerson;
    let orgunitId;
    if (value == 'undefined') {
      orgunitId = '';
    } else {
      orgunitId = value - 0;
    }
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          addPoiParams: {
            ...addPoiParams,
            orgunitId
          }
        }
      }
    });
  }
  onThresholdChange = value => {
    const poiPerson = this.props.bussiness.poiPerson;
    const { addPoiParams } = poiPerson;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          addPoiParams: {
            ...addPoiParams,
            threshold: value
          }
        }
      }
    });
  };
  onIdentityCardChange = e => {
    const poiPerson = this.props.bussiness.poiPerson;
    this.props.form.setFieldsValue({
      identityCard: poiPerson.addPoiParams.identityCard
    });

    const { addPoiParams } = poiPerson;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          addPoiParams: {
            ...addPoiParams,
            identityCard: e.target.value
          }
        }
      }
    });
  };

  onSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (err) {
        return false;
      }
      switch (this.props.action) {
        case 'new':
          this.props.dispatch({
            type: 'bussiness/addPoiByUpload'
          });
          this.props.form.resetFields();
          this.setState({
            fileList: []
          });
          break;
        case 'edit':
          this.props.dispatch({
            type: 'bussiness/modifyPoi'
          });
          this.props.form.resetFields();
          this.setState({
            fileList: []
          });
          break;
      }
    });
  };
  onCancel = () => {
    const poiPerson = this.props.bussiness.poiPerson;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          addPoiModalVisiable: false,
          addPoiParams: {
            personId: '',
            img_path_1: '',
            originImg_path_1: '',
            name: '',
            gender: 1,
            threshold: 60,
            groupId: '',
            identityCard: '',
            impTag: '',
            memo: ''
          },
          imageUrl: ''
        }
      }
    });
    this.props.form.resetFields();
    this.setState({
      imageUrl: '',
      fileList: []
    });
  };

  cssIsSelected = path => {
    if (path === this.props.bussiness.poiPerson.addPoiParams.img_path_1) {
      return `${styles.imgToBeSelected} ${styles.imgSelected}`;
    }
    return styles.imgToBeSelected;
  };
  renderUploadIcon = () => (<div className={styles.upload}>
    <Icon type={this.state.loading ? 'loading' : 'plus'} />
  </div>);
  renderImgContainer = () => (<div style={{ marginLeft: 110 }}>
    <span className={styles.remindText}>请选择需要检索的人脸（单选）</span>
    <div className={styles.imgContainer}>
      <div style={{ width: `${this.state.fileList.length * 85}px` }}>
        {this.renderSelectImg(this.state.fileList)}
      </div>
    </div>
  </div>);
  renderSelectImg = fileList => {
    let img = '';
    img = fileList.map(value => (<div
      className={this.cssIsSelected(value.path)}
      key={value.path}
      onClick={this.onSelectImg.bind(this, value)}>
      <img src={value.displayItem.url} alt="" />
    </div>

    ));
    return img;
  };
  renderGroups = () => (this.props.bussiness.poiGroup.allGroups.map(value =>
    (<Option value={value.id} key={value.id}>{value.name}</Option>)));


  render() {
    const { poiPerson } = this.props.bussiness;
    const { getFieldDecorator } = this.props.form;

    return (<Modal
      title=""
      footer=""
      visible={this.props.bussiness.poiPerson.addPoiModalVisiable}
      closable={false}
      width={400}
      bodyStyle={{ border: '1px solid #02abe3' }}
      className={styles.modalBody}
      onCancel={this.onCancel}
      maskClosable={false}
    >
      <div className={styles.modalHeader}>
        <span className={styles.modalHeaderTitle}>{this.props.title}</span>
        <span className={styles.modalHeaderClose} onClick={this.onCancel}>×</span>
      </div>
      <div className={styles.modalContent} >
        <div className={`${styles.modalInput} ${styles.modalPicture}`}>
          <label className={styles.modalLabel} style={{ verticalAlign: 'top' }}><span style={{ color: 'red' }}>*</span>照片：</label>
          <div style={{ display: 'inline-block', maxWidth: '60%', overflow: 'hidden' }}>
            <Upload
              action={`${API_PREFIX}/poi/uploadFace.do`}
              name="image_1"
              listType="picture-card"
              showUploadList={false}
              onChange={this.onUploadChange}
            >
              {poiPerson.imageUrl ? <img className={styles.modalImg} src={poiPerson.imageUrl} alt="" /> : this.renderUploadIcon()}
            </Upload>
          </div>
        </div>

        {this.state.fileList && this.state.fileList.length > 0 ? this.renderImgContainer() : null}

        <div className={styles.modalInput}>
          <label className={styles.modalLabel}><span style={{ color: 'red' }}>*</span>姓名：</label>
          <Input type="text" style={{ width: '60%' }} value={poiPerson.addPoiParams.name} onChange={this.onNameChange} />
        </div>
        <div className={styles.modalInput}>
          <label className={styles.modalLabel}>身份证：</label>
          <FormItem style={{ display: 'inline-block', width: '60%', verticalAlign: 'middle', marginBottom: '0px' }}>
            {getFieldDecorator('identityCard', {
              initialValue: poiPerson.addPoiParams.identityCard,
              rules: [{
                pattern: /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i,
                message: '请输入合法身份证'
              }]
            })(
              <Input type="text" onChange={this.onIdentityCardChange} />
            )}
          </FormItem>

        </div>
        <div className={styles.modalInput}>
          <label className={styles.modalLabel}><span style={{ color: 'red' }}>*</span>性别：</label>
          <RadioGroup value={`${poiPerson.addPoiParams.gender}`} onChange={this.onGenderChange}>
            <Radio value="1" style={{ color: '#fff', marginRight: '40px' }}>男</Radio>
            <Radio value="0" style={{ color: '#fff', marginRight: '40px' }}>女</Radio>
          </RadioGroup>
        </div>
        <div className={styles.modalInput}>
          <label className={styles.modalLabel}><span style={{ color: 'red' }}>*</span>所属分组：</label>
          {/* <Select style={{ width: '60%' }} value={poiPerson.addPoiParams.groupId} onChange={this.onGroupChange}>
            {this.props.bussiness.poiGroup.allGroups.length > 0 ? this.renderGroups() : null}
          </Select> */}
          <TreeSelect
            style={{ width: '60%', maxHeight: '32px', overflow: 'auto', verticalAlign: 'middle' }}
            allowClear
            treeDefaultExpandAll
            dropdownMatchSelectWidth={false}
            value={`${poiPerson.addPoiParams.groupId}`}
            onChange={this.onGroupChange}
            placeholder="请选择分组"
          >
            {this.renderTreeNode(this.props.bussiness && this.props.bussiness.poiGroup.allGroups ? this.props.bussiness.poiGroup.allGroups : [])}
          </TreeSelect>
        </div>
        <div className={styles.modalInput}>
          <label className={styles.modalLabel}><span style={{ color: 'red' }}>*</span>识别阈值：</label>
          <InputNumber
            style={{ width: '60%' }}
            max={100}
            min={0}
            value={poiPerson.addPoiParams.threshold}
            onChange={this.onThresholdChange} />
        </div>
        <div style={{ width: '100%', textAlign: 'center' }}>
          <Button type="primary" style={{ marginBottom: '15px' }} onClick={this.onSubmit}>确定</Button>
        </div>
      </div>
    </Modal>);
  }
}

function mapStateToProps({ bussiness }) {
  return { bussiness };
}

const NewModal = Form.create()(NewPersonModal);
export default connect(mapStateToProps)(NewModal);
