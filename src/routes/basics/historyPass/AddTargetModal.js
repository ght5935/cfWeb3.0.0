/**
 * Created by Ethan on 2018/2/1.
 */
import React from 'react';
import { Modal, Row, Col, Button, Input, Select, InputNumber, TreeSelect, Form } from 'antd';
import styles from './historyPass.less';

const FormItem = Form.Item;
const { Option } = Select;
const AddTargetModal = Form.create()(({
  data,
  form,
  dataSource,
  visible,
  treeData,
  onCancel,
  addTargetData,
  nameChange,
  idcardChange,
  groupChange,
  genderChange,
  nativeplaceChange,
  thresholdChange,
  orgunitChange,
  groupList
}) => {
  const { getFieldDecorator } = form;
  function onNameChange(e) {
    nameChange(e.target.value);
  }
  function onIdcardChange(e) {
    idcardChange(e.target.value);
  }
  function onGroupChange(value) {
    groupChange(value);
  }
  function onGenderChange(value) {
    genderChange(value);
  }
  function onNativeplaceChange(e) {
    nativeplaceChange(e.target.value);
  }
  function onThresholdChange(value) {
    thresholdChange(value);
  }
  function onOrgunitChange(value) {
    orgunitChange(value);
  }
  function onrenderSelectOptions() {
    let op = '';
    if (groupList) {
      op = groupList.map(value => (
        <Option value={`${value.id}`} key={value.id}>{value.name}</Option>
      ));
    }
    return op;
  }
  function onAddTargetData() {
    addTargetData();
  }

  return (
    <div>
      <Modal
        title=""
        footer=""
        visible={visible}
        onCancel={onCancel}
        closable={false}
        width={1150}
        bodyStyle={{ height: 628, border: '1px solid #02abe3' }}
        className={styles.modalBody}
      >
        <Row style={{ height: '100%' }}>
          <Col span={10} className={styles.wrap}>
            <div className={styles.modalHeader}>
              <span className={styles.modalHeaderTitle}>抓拍序列</span>
            </div>
            <div className={`${styles.contentTwo} ${styles.contentTwoAdd}`} >
              {data && data.imgs && data.imgs.length > 0 ? data.imgs.map((value, i) =>
                <div className={styles.notSelectImg} key={value}>
                  <img src={value} alt="" />
                </div>
              ) : null}
            </div>
          </Col>
          <Col span={14} className={styles.wrap}>
            <div className={styles.modalHeader}>
              <span className={styles.modalHeaderTitle}>现场照片</span>
              <span onClick={onCancel} className={styles.modalHeaderClose} >×</span>
            </div>
            <div>
              <div className={styles.sceneImg}>
                <img className={styles.sceneImgData} src={data ? data.snapImg : ''} alt="" />
              </div>
              <div className={`${styles.formItem} ${styles.marginLeft}`}>
                  <label className={styles.fromlabel}><span style={{color: 'red'}}>*</span> 组织/分组：</label>
                  <FormItem style={{ display: 'inline-block', width: '150px', verticalAlign: 'middle', marginBottom: '0px' }}>
                    {getFieldDecorator('orgunitId', {
                      initialValue: `${dataSource.orgunitId}`
                    })(<TreeSelect
                      allowClear
                      treeData={treeData}
                      style={{ width: '150px', height: '24px' }}
                      onChange={onOrgunitChange}
                      treeDefaultExpandAll
                      dropdownMatchSelectWidth={false}
                      placeholder="① 请选择组织"
                      size="small"
                    />)}
                  </FormItem>
                {/* </div>
                <div className={styles.formItem}> */}
                <span className={styles.connector}>-</span>
                  <FormItem style={{ display: 'inline-block', width: '150px',verticalAlign: 'middle', marginBottom: '0px' }}>
                    {getFieldDecorator('groupId', {
                      value: `${dataSource.groupId}` ? `${dataSource.groupId}` : '',
                      rules: [
                        { required: 'true', message: '请选择所属分组！' }
                      ]
                    })(<Select
                      style={{ width: '150px', height: '24px' }}
                      size="small"
                      placeholder="② 请选择分组"
                      onChange={onGroupChange}
                      dropdownMatchSelectWidth={false}
                    >
                      {onrenderSelectOptions()}
                    </Select>)}
                  </FormItem>
                </div>
              

              <div className={styles.modalInput}>
                <div className={styles.formItem}>
                  <label className={styles.fromlabel}><span style={{color: 'red'}}>*</span> 姓名：</label>
                  <FormItem
                    style={{ display: 'inline-block', width: '50%', marginBottom: '0px' }}
                  >
                    {getFieldDecorator('name', {
                      initialValue: dataSource.name,
                      rules: [
                        { required: 'true', message: '请输入用户名！' }
                      ]
                    })(<Input type="text" style={{ width: '150px', height: '24px' }} onChange={onNameChange} size="small" />)}
                  </FormItem>
                </div>
                <div className={styles.formItem}>
                  <label className={styles.fromlabel}><span style={{color: 'red'}}>*</span> 阈值：</label>
                  <FormItem style={{ display: 'inline-block', width: '50%', marginBottom: '0px' }}>
                    {getFieldDecorator('threshold', {
                      initialValue: dataSource.threshold,
                      rules: [
                        { required: 'true', message: '请输入阈值！' }
                      ]
                    })(<InputNumber
                      style={{ width: '150px' }}
                      size="small"
                      min={1}
                      max={100}
                      // precision='number'
                      onChange={onThresholdChange} />)}
                  </FormItem>
                </div>
                
              </div>

              <div className={styles.modalInput}>
                <div className={styles.formItem}>
                  <label className={styles.fromlabel}><span style={{color: 'red'}}>*</span> 性别：</label>
                  <FormItem style={{ display: 'inline-block', width: '50%', marginBottom: '0px' }}>
                    {getFieldDecorator('gender', {
                      initialValue: dataSource.gender,
                      rules: [
                        { required: 'true', message: '请选择性别！' }
                      ]
                    })(<Select
                      style={{
                        width: '150px',
                        height: '24px'
                      }}
                      size="small"
                      onChange={onGenderChange}
                    >
                      <Option value={1}>男</Option>
                      <Option value={0}>女</Option>
                    </Select>)}
                  </FormItem>
                </div>
                <div className={styles.formItem}>
                  <label className={styles.fromlabel}>身份证号：</label>
                  <FormItem style={{ display: 'inline-block', width: '50%', marginBottom: '0px' }}>
                    {getFieldDecorator('identityCard', {
                      initialValue: dataSource.identityCard,
                      rules: [
                        {
                          pattern: /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i,
                          message: '请输入合法身份证'
                        }
                      ]
                    })(<Input type="text" style={{ width: '150px', height: '24px' }} onChange={onIdcardChange} size="small" />)}
                  </FormItem>
                </div>
                

               
              </div>
             
              <div>
                <Button onClick={onAddTargetData} style={{ marginTop: '30px', marginLeft: '43%' }} type="primary">新增目标</Button>
              </div>
            </div>
          </Col>
        </Row>
      </Modal>

    </div>
  );
});

export default AddTargetModal;

