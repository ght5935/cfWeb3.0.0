
/**
 * Created by Ethan on 2018/1/16.
 */
import React from 'react';
import { Modal, Button, Input, Icon, Row, Form, TreeSelect, Radio } from 'antd';
import styles from './roleConfig.less';

const { TextArea } = Input;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const RrcognizeModal = Form.create()(({ visiable, dataSource,
  nameChange, IpChange, onSubmit, form, onCancel, groupTree,
  orgunitIdChange, action, modalTitle, memoChange, configChange }) => {
  const { getFieldDecorator } = form;
  function onBtnClick() {
    onSubmit();
  }

  function onNameChange(e) {
    nameChange(e.target.value);
  }
  function onIpAddressChange(e) {
    IpChange(e.target.value);
  }
  function onOrgunitIdChange(value) {
    orgunitIdChange(value);
  }
  function onMemoChange(e) {
    memoChange(e.target.value);
  }
  function onConfigChange(e) {
    configChange(e.target.value);
  }
  return (
    <div>
      <Modal
        title=""
        footer=""
        visible={visiable}
        onCancel={onCancel}
        closable={false}
        width={520}
        bodyStyle={{ border: '1px solid #02abe3' }}
        className={styles.modalBody}
        maskClosable={false}
      >
        <div className={styles.modalHeader}>
          <span className={styles.modalHeaderTitle}>{modalTitle}</span>
          <span className={styles.modalHeaderClose} onClick={onCancel}>×</span>
        </div>
        <div className={styles.serchWrap}>
          <div className={styles.formItem}>
            <div className={styles.text}><span style={{ color: 'red' }}>*</span>识别端名称：</div>
            <FormItem style={{ display: 'inline-block', width: '50%', verticalAlign: 'middle', marginBottom: '0px' }}>
              {getFieldDecorator('serverName', {
                initialValue: dataSource.name,
                rules: [
                  { required: 'true', message: '请输入识别端名称！' }
                ]
              })(<Input className={styles.recInput} onChange={onNameChange} />)}
            </FormItem>
          </div>
          <div className={styles.formItem}>
            <div className={styles.text}><span style={{ color: 'red' }}>*</span>选择组织：</div>
            <FormItem style={{ display: 'inline-block', width: '50%', verticalAlign: 'middle', marginBottom: '0px' }}>
              {getFieldDecorator('orgunitId', {
                initialValue: `${dataSource.orgunitId}`,
                rules: [
                  { required: 'true', message: '请选择组织！' }
                ]
              })(<TreeSelect
                disabled={action === 'newRole' ? false : true}
                className={styles.recInput}
                style={{ color: '#333' }}
                allowClear
                treeData={groupTree}
                treeDefaultExpandAll
                onChange={onOrgunitIdChange}
                placeholder="请选择组织"
                dropdownMatchSelectWidth={false}
              />)}
            </FormItem>
          </div>
          <div className={styles.formItem}>
            <div className={styles.text}><span style={{ color: 'red' }}>*</span>IP地址：</div>
            <FormItem style={{ display: 'inline-block', width: '50%', verticalAlign: 'middle', marginBottom: '0px' }}>
              {getFieldDecorator('serverIP', {
                initialValue: dataSource.ipAddress,
                rules: [
                  { required: 'true', message: '请输入IP地址！' }
                ]
              })(<Input className={styles.recInput} onChange={onIpAddressChange} />)}
            </FormItem>
          </div>
          <div className={styles.formItem} style={{ display: 'flex', alignItems: 'center' }}>
            <div className={styles.text} >备注: </div>
            <TextArea
              className={styles.recInput}
              autosize={{ minRows: 2, maxRows: 5 }}
              value={`${dataSource.memo}`}
              onChange={onMemoChange}
            />
          </div>
          <div className={styles.formItem} style={{ display: 'flex', alignItems: 'center' }}>
            <div className={styles.text} >参数配置: </div>
            <TextArea
              className={styles.recInput}
              autosize={{ minRows: 8, maxRows: 13 }}
              onChange={onConfigChange}
              value={`${dataSource.appconfig}`}
            />
          </div>
          <div className={styles.formItem}>
            
              <Button type="primary" style={{ display: 'block', margin: '0 auto' }} onClick={onBtnClick}>确定</Button>
            
          </div>
        </div>
      </Modal>
    </div>);
});


export default RrcognizeModal;

