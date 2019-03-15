/**
 * Created by Jason on 2018/3/19.
 */

import React from 'react';
import { Modal, Button, Input, Select, Form, TreeSelect } from 'antd';
import styles from './roleConfig.less';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;


const DetailCameraModal = Form.create()(({ visiable, cameraList, dataSource,
  onTextAreaChange, IpChange, onSrcIdChange, onSubmit, form, onCancel, groupTree, orgunitIdChange }) => {
  const { getFieldDecorator } = form;
  function onBtnClick() {
    onSubmit();
  }
  function srcIdChange(value) {
    onSrcIdChange(value);
  }
  function textAreaChange(e) {
    onTextAreaChange(e.target.value);
  }
  function onIpAddressChange(e) {
    IpChange(e.target.value);
  }
  function onOrgunitIdChange(value) {
    orgunitIdChange(value);
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
      >
        <div className={styles.modalHeader}>
          <span className={styles.modalHeaderTitle}>查看摄像头</span>
          <span className={styles.modalHeaderClose} onClick={onCancel}>×</span>
        </div>
        <div className={styles.serchWrap}>
          <div className={styles.formItem}>
            <div className={styles.text}><span style={{ color: 'red' }}>*</span>摄像头名称：</div>
            <FormItem style={{ display: 'inline-block', width: '50%', verticalAlign: 'middle', marginBottom: '0px' }}>
              {getFieldDecorator('srcId', {
                initialValue: `${dataSource.id}`,
                rules: [
                  { required: 'true', message: '请选择摄像头！' }
                ]
              })(<Select className={styles.input} onChange={srcIdChange}>
                {cameraList.map(value => <Option
                  value={`${value.id}`}
                  key={value.id}
                >
                  {value.name}
                </Option>)}
              </Select>)}
            </FormItem>
          </div>
          <div className={styles.formItem}>
            <div className={styles.text}><span style={{ color: 'red' }}>*</span>配置：</div>
            <FormItem style={{ display: 'inline-block', width: '50%', verticalAlign: 'middle', marginBottom: '0px' }}>
              {getFieldDecorator('config', {
                initialValue: dataSource.config,
                rules: [
                  { required: 'true', message: '请输入配置！' }
                ]
              })(<TextArea autosize={{ minRows: 12, maxRows: 12 }} className={styles.input} onChange={textAreaChange} />)}
            </FormItem>
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


export default DetailCameraModal;

