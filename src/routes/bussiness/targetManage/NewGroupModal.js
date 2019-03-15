/**
 * Created by Jason on 2018/1/30.
 */
import React from 'react';
import { connect } from 'dva';
import { Modal, Input, Select, Button, InputNumber, TreeSelect, Radio, Form } from 'antd';
import styles from './Target.less';

import { GROUP_TYPE } from '../../../utils/config';
import { GROUP_LABEL_COLOR } from '../../../utils/config';
const { TextArea } = Input;
const { Option } = Select;
const { TreeNode } = TreeSelect;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

class NewGroupModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      loading: false,
      imageUrl: '',
      selectColorIndex: '',
      chooseColor: ''
    };
  }
  onOrgunitsChange = id => {
    let value = id - 0;
    if (!value) {
      value = '';
    }
    const poiGroup = this.props.bussiness.poiGroup;
    const { addGroupParams } = poiGroup;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiGroup: {
          ...poiGroup,
          addGroupParams: {
            ...addGroupParams,
            orgunitId: value
          }
        }
      }
    });
  };
  onNameChange = e => {
    const poiGroup = this.props.bussiness.poiGroup;
    const { addGroupParams } = poiGroup;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiGroup: {
          ...poiGroup,
          addGroupParams: {
            ...addGroupParams,
            name: e.target.value
          }
        }
      }
    });
  };
  onGroupChange = value => {
    const poiGroup = this.props.bussiness.poiGroup;
    const { addGroupParams } = poiGroup;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiGroup: {
          ...poiGroup,
          addGroupParams: {
            ...addGroupParams,
            type: value
          }
        }
      }
    });
  };
  onlabelStateChange = (e) => {
    const poiGroup = this.props.bussiness.poiGroup;
    const { addGroupParams } = poiGroup;

    if (e.target.value == 0) {
      this.props.dispatch({
        type: 'bussiness/success',
        payload: {
          poiGroup: {
            ...poiGroup,
            addGroupParams: {
              ...addGroupParams,
              labelState: e.target.value
            }
          }
        }
      });
    } else {
      this.props.dispatch({
        type: 'bussiness/success',
        payload: {
          poiGroup: {
            ...poiGroup,
            addGroupParams: {
              ...addGroupParams,
              labelState: e.target.value,
              labelName: '',
              labelColor: '',
            }
          }
        }
      });
      this.setState({
        selectColorIndex: undefined
      }, () => {
        this.selectColor(this.state.selectColorIndex, -1)
      })
    }
  }
  onlabelNameChange = e => {
    const poiGroup = this.props.bussiness.poiGroup;
    const { addGroupParams } = poiGroup;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiGroup: {
          ...poiGroup,
          addGroupParams: {
            ...addGroupParams,
            labelName: e.target.value
          }
        }
      }
    });
  };
  onlabelColorClick = (value, index) => {
    const poiGroup = this.props.bussiness.poiGroup;
    const { addGroupParams } = poiGroup;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiGroup: {
          ...poiGroup,
          addGroupParams: {
            ...addGroupParams,
            labelColor: value
          }
        }
      }
    });
    this.setState({
      selectColorIndex: index,
      chooseColor: value
    }, () => { this.selectColor(value, index) })

  }
  selectColor = (value, index) => {
    const poiGroup = this.props.bussiness.poiGroup;
    const { addGroupParams } = poiGroup;
    if (this.state.selectColorIndex === index || poiGroup.addGroupParams.labelColor === value) {
      return { background: `${value}`, boxShadow: `0 0 15px ${value}`, width: 30, height: 30 }
    }
    return { background: `${value}` }
  }

  onThresholdChange = value => {
    const poiGroup = this.props.bussiness.poiGroup;
    const { addGroupParams } = poiGroup;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiGroup: {
          ...poiGroup,
          addGroupParams: {
            ...addGroupParams,
            alarm_threshold: value
          }
        }
      }
    });
  };
  onMemoChange = e => {
    const poiGroup = this.props.bussiness.poiGroup;
    const { addGroupParams } = poiGroup;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiGroup: {
          ...poiGroup,
          addGroupParams: {
            ...addGroupParams,
            memo: e.target.value
          }
        }
      }
    });
  };

  onSubmit = () => {
    const poiGroup = this.props.bussiness.poiGroup;
    const { addGroupParams } = poiGroup;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiGroup: {
          ...poiGroup,
          addGroupParams: {
            ...addGroupParams,
            type: 2
          }
        }
      }
    });
    switch (this.props.action) {
      case 'new':
        this.props.dispatch({
          type: 'bussiness/addGroup'
        });
        break;
      case 'edit':
        this.props.dispatch({
          type: 'bussiness/modifyGroup'
        });
        break;
    }
    this.setState({
      selectColorIndex: -1
    })
  };
  onCancel = () => {
    const poiGroup = this.props.bussiness.poiGroup;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiGroup: {
          ...poiGroup,
          addGroupParams: {
            id: '',
            type: '',
            name: '',
            memo: '',
            orgunitId: '',
            alarm_threshold: '',
            labelState: 1,
            labelName: '',
            labelColor: '',
          },
          addGroupModalVisiable: false,
        }
      }
    });
    this.setState({
      selectColorIndex: -1
    })
  };

  renderGroupType = () => (GROUP_TYPE.map((value, index) =>
    (<Option value={index} key={index}>{value}</Option>)));

  renderGroupLabelColor = () => (GROUP_LABEL_COLOR.map((value, index) =>
    (<span
      style={this.selectColor(value, index)}
      key={index}
      onClick={this.onlabelColorClick.bind(this, value, index)}
    />)));

  render() {
    const { poiGroup } = this.props.bussiness;
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title=""
        footer=""
        visible={poiGroup.addGroupModalVisiable}
        width={400}
        closable={false}
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

          <div className={styles.modalInput}>
            <label className={styles.modalLabel}><span style={{ color: 'red' }}>*</span> 分组名称：</label>
            <Input type="text" style={{ width: '60%' }} value={poiGroup.addGroupParams.name} onChange={this.onNameChange} />
          </div>
          <div className={styles.modalInput}>
            <label className={styles.modalLabel}><span style={{ color: 'red' }}>*</span> 所属组织：</label>
            <TreeSelect
              style={{ width: '60%' }}
              allowClear
              treeData={this.props.bussiness && this.props.bussiness.groupTree ?
                this.props.bussiness.groupTree : []}
              onChange={this.onOrgunitsChange}
              treeDefaultExpandAll
              placeholder="请选择组织"
              value={`${poiGroup.addGroupParams.orgunitId}`}
            />
          </div>

          {/* <div className={styles.modalInput}>
            <label className={styles.modalLabel}><span style={{ color: 'red' }}>*</span> 分组类型：</label>
            <Select style={{ width: '60%' }} value={poiGroup.addGroupParams.type} onChange={this.onGroupChange}>
              {this.renderGroupType()}
            </Select>
          </div> */}

          <div className={styles.modalInput}>
            <label className={styles.modalLabel}>阈值：</label>
            <InputNumber
              style={{ width: '60%' }}
              max={100}
              min={0}
              value={poiGroup.addGroupParams.alarm_threshold}
              onChange={this.onThresholdChange} />
          </div>
          <div className={styles.modalInput} style={{ display: 'flex', alignItems: 'center' }}>
            <label className={styles.modalLabel}>备注：</label>
            <TextArea style={{ width: '60%' }} autosize={{ minRows: 2, maxRows: 6 }} value={poiGroup.addGroupParams.memo} onChange={this.onMemoChange} />
          </div>

          <div className={styles.modalInput}>
            <label className={styles.modalLabel}> 标签状态：</label>
            <RadioGroup onChange={this.onlabelStateChange} value={poiGroup.addGroupParams.labelState}>
              <Radio value={0} style={{ color: '#fff' }}>启用</Radio>
              <Radio value={1} style={{ color: '#fff' }}>禁用</Radio>
            </RadioGroup>
          </div>
          {poiGroup.addGroupParams.labelState == 0 ? <div>
            <div className={styles.modalInput}>
              <label className={styles.modalLabel}> 标签名称：</label>
              <FormItem
                style={{ width: '60%', margin: 0 }}
              >
                {getFieldDecorator('labelName', {
                  initialValue: poiGroup.addGroupParams.labelName,
                  rules: [
                    { required: 'true', message: '标签名称最长四个字符！', max: 4, }
                  ]
                })(<Input type="text" maxLength="4" style={{ color: poiGroup.addGroupParams.labelColor ? poiGroup.addGroupParams.labelColor : this.state.chooseColor }} onChange={this.onlabelNameChange} />)}
              </FormItem>
              {/* <Input
                type="text"
                maxLength="4"
                style={{ width: '60%' }}
                value={poiGroup.addGroupParams.labelName}
                onChange={this.onlabelNameChange}
              /> */}
            </div>
            <div className={styles.modalInput}>
              <label className={styles.modalLabel}> 标签颜色：</label>
              <div className={styles.labelColor}>
                {this.renderGroupLabelColor()}
              </div>
            </div>
          </div> : null}

          <div style={{ width: '100%', textAlign: 'center' }}>
            <Button type="primary" style={{ marginBottom: '15px' }} onClick={this.onSubmit}>确定</Button>
          </div>
        </div>
      </Modal>
    );
  }
}

function mapStateToProps({ bussiness }) {
  return { bussiness };
}
const NewGroupModalForm = Form.create()(NewGroupModal);
export default connect(mapStateToProps)(NewGroupModalForm);
