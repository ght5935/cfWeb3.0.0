/**
 * Created by Jason on 2018/1/30.
 */
/**
 * Created by gao on 2018/5/14.
 */
import React from 'react';
import { connect } from 'dva';
import { Modal, Input, Select, Button, InputNumber, TreeSelect } from 'antd';
import styles from './CameraGroup.less';

import { GROUP_TYPE } from '../../../utils/config';

const { TreeNode } = TreeSelect;
const { TextArea } = Input;
const Option = Select.Option;

class NewGroupModal extends React.Component {

  onNameChange = e => {
    const { device } = this.props.bussiness;
    const { camreaGroup } = device;
    const { addCamreaGroupParams } = camreaGroup;
        this.props.dispatch({
          type: 'bussiness/success',
          payload: {
            device: {
              ...device,
              camreaGroup: {
                ...camreaGroup,
                addCamreaGroupParams: {
                  ...addCamreaGroupParams,
                  name: e.target.value
                },
              }
            }
          }
        });
  };
  onGroupChange = value => {
    const { device } = this.props.bussiness;
    const { camreaGroup } = device;
    const { addCamreaGroupParams} = camreaGroup;
    let orgunitId = '';
    if(value){
      orgunitId = value - 0
    }else{
      orgunitId = ''
    }
        this.props.dispatch({
          type: 'bussiness/success',
          payload: {
            device: {
              ...device,
              camreaGroup: {
                ...camreaGroup,
                addCamreaGroupParams: {
                  ...addCamreaGroupParams,
                  orgunitId
                },
              }
            }
          }
        });
  };
  onMemoChange = e => {
    const { device } = this.props.bussiness;
    const { camreaGroup } = device;
    const { addCamreaGroupParams} = camreaGroup;
   
        this.props.dispatch({
          type: 'bussiness/success',
          payload: {
            device: {
              ...device,
              camreaGroup: {
                ...camreaGroup,
                addCamreaGroupParams: {
                  ...addCamreaGroupParams,
                  memo: e.target.value,
                },
              }
            }
          }
        });
  };

  onSubmit = () => {
    switch (this.props.action) {
      case 'new':
        this.props.dispatch({
          type: 'bussiness/addCamreaGroup'
        });
        break;
      case 'edit':
        this.props.dispatch({
          type: 'bussiness/modifyCamreaGroup'
        });
        break;
    }
  };
  onCancel = () => {
    const { device } = this.props.bussiness;
    const { camreaGroup } = device;
    const { addCamreaGroupParams } = camreaGroup;
  
        this.props.dispatch({
          type: 'bussiness/success',
          payload: {
            device: {
              ...device,
              camreaGroup: {
                ...camreaGroup,
                addCamreaGroupParams: {
                  ...addCamreaGroupParams,
                  name: '',
                  orgunitId: '',
                  memo: '',
                },
                addCamreaGroupModalVisiable: false
              }
            }
          }
        });
  };
  render() {
    const { device } = this.props.bussiness;
    const { camreaGroup } = device;
    return (<Modal
      title=""
      footer=""
      visible={camreaGroup.addCamreaGroupModalVisiable}
      closable={false}
      width={400}
      maskClosable={false}
      onCancel={this.onCancel}
      bodyStyle={{ border: '1px solid #02abe3' }}
      className={styles.modalBody}>
      <div className={styles.modalHeader}>
        <span className={styles.modalHeaderTitle}>{this.props.title}</span>
        <span onClick={this.onCancel} className={styles.modalHeaderClose} >×</span>
      </div>
      <div className={styles.modalContent} >

        <div className={styles.modalInput}>
          <label className={styles.modalLabel}><span style={{ color: 'red' }}>*</span> 分组名称：</label>
          <Input type="text"
            style={{ width: '60%' }}
            value={camreaGroup.addCamreaGroupParams.name}
            onChange={this.onNameChange}
          />
        </div>

        <div className={styles.modalInput}>
          <label className={styles.modalLabel}><span style={{ color: 'red' }}>*</span> 所属组织：</label>
          <TreeSelect
            style={{ width: '60%' }}
            allowClear
            onChange={this.onGroupChange}
            placeholder="请选择所属组织"
            value={`${camreaGroup.addCamreaGroupParams.orgunitId}`}
            treeData={this.props.bussiness && this.props.bussiness.groupTree ?
              this.props.bussiness.groupTree : []}
          />
        </div>
        <div className={styles.modalInput} style={{ display: 'flex', alignItems: 'center' }}>
          <label className={styles.modalLabel}>备注：</label>
          <TextArea
            style={{ width: '60%' }}
            autosize={{ minRows: 2, maxRows: 6 }}
            value={camreaGroup.addCamreaGroupParams.memo}
            onChange={this.onMemoChange}
          />
        </div>

        <div >
          <Button type="primary" style={{display:'block',margin:'0 auto 15px auto'}} onClick={this.onSubmit}>确定</Button>
        </div>
      </div>
    </Modal>);
  }
}

function mapStateToProps({ bussiness }) {
  return { bussiness };
}
export default connect(mapStateToProps)(NewGroupModal);
