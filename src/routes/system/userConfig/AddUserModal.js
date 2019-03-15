
/**
 * Created by Ethan on 2018/1/16.
 */
import React from 'react';
import { Modal, Button, Input, Select, Row, TreeSelect, Form, Icon } from 'antd';
import styles from './userConfig.less';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const AddUserModal = Form.create()(({
  action,
  title,
  visiable,
  dataSource,
  groupTree,
  onAddModalCancel,
  userNameChange,
  userLoginNameChange,
  userPwdChange,
  userPhoneChange,
  userRoleIdChange,
  userOrgunitIdChange,
  userEmailChange,
  userMemoChange,
  renderSelectOptions,
  iconClick,
  form,
  onSubmit,
  onChangePass, passType, iconColor }) => {
  const { getFieldDecorator } = form;
  function onCancel() {
    onAddModalCancel();
  }
  function onuserNameChange(e) {
    userNameChange(e.target.value);
  }
  function onuserLoginNameChange(e) {
    userLoginNameChange(e.target.value);
  }
  function onuserPwdChange(e) {
    userPwdChange(e.target.value);
  }
  function onuserRoleIdChange(value) {
    userRoleIdChange(value);
  }
  function onorgunitIdChange(value) {
    userOrgunitIdChange(value);
  }
  function onuserPhoneChange(e) {
    userPhoneChange(e.target.value);
  }
  function onrenderSelectOptions() {
    const op = renderSelectOptions.map(value => (
      <Option value={value.id} key={value.id}>{value.name}</Option>
    ));
    return op;
  }
  function onuserEmailChange(e) {
    userEmailChange(e.target.value);
  }
  function onuserMemoChange(e) {
    userMemoChange(e.target.value);
  }
  function onIconClick() {
    iconClick()
  }
  function onAddClick() {
    onSubmit();
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
          <span className={styles.modalHeaderTitle}>{title}</span>
          <span className={styles.modalHeaderClose} onClick={onCancel}>×</span>
        </div>

        <div className={styles.serchWrap}>
          <div className={styles.text}><span style={{ color: 'red' }}>*</span>用户名</div>

          <FormItem style={{ display: 'inline-block', width: '60%', verticalAlign: 'middle', marginBottom: '0px' }}>
            {getFieldDecorator('l', {
              initialValue: dataSource.loginName,
              rules: [
                { required: 'true', message: '请输入用户名！' }
              ]
            })(<Input className={styles.input} onChange={onuserLoginNameChange} />)}
          </FormItem>
        </div>

        <div className={styles.serchWrap}>
          <div className={styles.text}>{action === 'newUser' ? <span style={{ color: 'red' }}>*</span> : ''}密码</div>
          <FormItem style={{ display: 'inline-block', width: '60%', verticalAlign: 'middle', marginBottom: '0px' }}>
            {getFieldDecorator('p', {
              initialValue: dataSource.password,
              rules: [
                action === 'newUser' ? { required: 'true', message: '请输入密码！' } : {}
              ]
            })(<Input type={passType} onFocus={onChangePass} placeholder={action === 'newUser' ? '' : '不填默认原密码'}
              suffix={<Icon type="eye-o" className={styles.lockPassWordIcon} style={{ margin: '0 0 0 10px', color: iconColor, cursor: 'pointer' }} onClick={onIconClick} />} className={styles.input} onChange={onuserPwdChange} />)}

          </FormItem>

        </div>

        <div className={styles.serchWrap}>
          <div className={styles.text}><span style={{ color: 'red' }}>*</span>姓名</div>
          {/* <Input className={styles.input} onChange={onuserNameChange} value={dataSource.name}/>*/}
          <FormItem style={{ display: 'inline-block', width: '60%', verticalAlign: 'middle', marginBottom: '0px' }}>
            {getFieldDecorator('name', {
              initialValue: dataSource.name,
              rules: [
                { required: 'true', message: '请输入姓名！' }
              ]
            })(<Input className={styles.input} onChange={onuserNameChange} />)}
          </FormItem>
        </div>

        <div className={styles.serchWrap}>
          <div className={styles.text}><span style={{ color: 'red' }}>*</span>手机号</div>
          <FormItem style={{ display: 'inline-block', width: '60%', verticalAlign: 'middle', marginBottom: '0px' }}>
            {getFieldDecorator('phone', {
              initialValue: dataSource.phone,
              rules: [
                { required: 'true', message: '请输入手机号！' },
                { pattern: /^1[34578][0-9]{9}$/, message: '请输入正确格式手机号！' }
              ]
            })(<Input className={styles.input} onChange={onuserPhoneChange} />)}
          </FormItem>
        </div>

        <div className={styles.serchWrap}>
          <div className={styles.text}><span style={{ color: 'red' }}>*</span>所属角色</div>
          <FormItem style={{ display: 'inline-block', width: '60%', verticalAlign: 'middle', marginBottom: '0px' }}>
            {getFieldDecorator('roleId', {
              initialValue: dataSource.roleId,
              rules: [
                { required: 'true', message: '请选择所属角色！' }
              ]
            })(<Select
              className={styles.input}
              placeholder="请选择角色"
              value={dataSource.roleId}
              onChange={onuserRoleIdChange}
            >
              {onrenderSelectOptions()}</Select>)}
          </FormItem>
        </div>

        <div className={styles.serchWrap}>
          <div className={styles.text}><span style={{ color: 'red' }}>*</span>所属组织</div>
          <FormItem style={{ display: 'inline-block', width: '60%', verticalAlign: 'middle', marginBottom: '0px' }}>
            {getFieldDecorator('orgunitId', {
              initialValue: `${dataSource.orgunitId}`,
              rules: [
                { required: 'true', message: '请选择所属组织！' }
              ]
            })(<TreeSelect
              treeData={groupTree || []}
              className={styles.input}
              onChange={onorgunitIdChange}
              treeDefaultExpandAll
              placeholder="请选择组织"
            />)}
          </FormItem>
        </div>

        <div className={styles.serchWrap}>
          <div className={styles.text}>电子邮箱</div>
          <FormItem style={{ display: 'inline-block', width: '60%', verticalAlign: 'middle', marginBottom: '0px' }}>
            {getFieldDecorator('email', {
              initialValue: dataSource.email,
              rules: [
                { pattern: /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g, message: '请正确格式的邮箱！' }
              ]
            })(<Input className={styles.input} onChange={onuserEmailChange} />)}
          </FormItem>
        </div>

        <div className={styles.serchWrap} style={{ display: 'flex', alignItems: 'center' }}>
          <div className={styles.text}>备注</div>
          <TextArea
            className={styles.input}
            style={{ width: 200 }}
            autosize={{ minRows: 2, maxRows: 5 }}
            value={dataSource.memo}
            onChange={onuserMemoChange}
          />

        </div>
        <Row type="flex" justify="space-between" className={styles.footer}>
          <Button type="primary" className={styles.refreshMatch} onClick={onAddClick}>确定</Button>
        </Row>

      </Modal>
    </div>
  );
});

export default AddUserModal;

