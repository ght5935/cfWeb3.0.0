
/**
 * Created by Ethan on 2018/1/16.
 */
import React from 'react';
import { Modal, Button, Input, Select, Icon, Row, Form, TreeSelect, Radio } from 'antd';
import styles from './roleConfig.less';

const { TextArea } = Input;
const Option = Select.Option;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const CollectModal = Form.create()(({ visiable, dataSource,
  nameChange, IpChange, validStrChange, onSubmit, form, onCancel, groupTree,
  orgunitIdChange, action, modalTitle, memoChange, appnodeAllList, appnodeChange }) => {
  const { getFieldDecorator } = form;
  function onBtnClick() {
    onSubmit();
  }
  function onValidstringChange(e) {
    validStrChange(e.target.value);
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
  function onAppnodeChange(value) {
    appnodeChange(value);
  }

  return (
    <div>
      <Modal
        title=""
        footer=""
        visible={visiable}
        onCancel={onCancel}
        closable={false}
        width={432}
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
            <div className={styles.text}><span style={{ color: 'red' }}>*</span>采集端名称：</div>
            <FormItem style={{ display: 'inline-block', width: '50%', verticalAlign: 'middle', marginBottom: '0px' }}>
              {getFieldDecorator('serverName', {
                initialValue: dataSource.name,
                rules: [
                  { required: 'true', message: '请输入采集端名称！' }
                ]
              })(<Input className={styles.input} onChange={onNameChange} />)}
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
                style={{ color: '#333' }}
                className={styles.input}
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
              })(<Input className={styles.input} onChange={onIpAddressChange} />)}
            </FormItem>
          </div>
          <div className={styles.formItem}>
            <div className={styles.text}><span style={{ color: 'red' }}>*</span>标识串：</div>
            <FormItem style={{ display: 'inline-block', width: '50%', verticalAlign: 'middle', marginBottom: '0px' }}>
              {getFieldDecorator('validstring', {
                initialValue: dataSource.validstring,
                rules: [
                  { required: 'true', message: '请输入标识穿！' }
                ]
              })(<Input className={styles.input} onChange={onValidstringChange} />)}
            </FormItem>
          </div>
          <div className={styles.formItem}>
            <div className={styles.text}><span style={{ color: 'red' }}>*</span>所属识别端：</div>
            <FormItem style={{ display: 'inline-block', width: '50%', verticalAlign: 'middle', marginBottom: '0px' }}>
              {getFieldDecorator('appId', {
                initialValue: dataSource.appId,
                rules: [
                  { required: 'true', message: '请选择识别端！' }
                ]
              })(<Select
                disabled={action === 'newRole' ? false : true}
                style={{ color: '#333' }}
                className={styles.input}
                placeholder="请选择"
                onChange={onAppnodeChange}
                // value={dataSource.appId}
              >
                {appnodeAllList ? appnodeAllList.map(v => <Option value={`${v.appId}`} key={v.appId}>{v.name}</Option>) : []}
              </Select>)}
            </FormItem>

          </div>

          <div className={styles.formItem} style={{ display: 'flex', alignItems: 'center' }}>
            <div className={styles.text} >备注: </div>
            <TextArea
              className={styles.input}
              autosize={{ minRows: 2, maxRows: 5 }}
              value={dataSource.memo}
              onChange={onMemoChange}
            />
          </div>
          <div className={styles.formItem}>
            <div className={styles.text} />
            <div className={styles.input}>
              <Button type="primary" style={{ display: 'block', margin: '0 40px' }} onClick={onBtnClick}>确定</Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>);
});


export default CollectModal;

