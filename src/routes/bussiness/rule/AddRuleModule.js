
/**
 * Created by Ethan on 2018/1/16.
 */
import React from 'react';
import { Modal, Button, Input, Select, Icon, Row, Col, Checkbox, TreeSelect, Radio } from 'antd';
import styles from './Rule.less';

const RadioGroup = Radio.Group;
const { TreeNode } = TreeSelect;
const Option = Select.Option;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;
const AddRuleModule = ({ visiable,
  dataSource,
  categoryTree,
  onAddModalCancel,
  stateChange,
  nameChange,
  cameraOrgChange,
  targetOrgunitChange,
  targerNameList,
  groupChange,
  indicationChange,
  alarmLevelChange,
  alarmTypeChange,
  configPriorityChange,
  memoChange,
  targetGroupList,
  onSubmit }) => {
  function onCancel() {
    onAddModalCancel();
  }
  function onStateChange(e) {
    stateChange(e.target.value)
  };
  function onNameChange(e) {
    nameChange(e.target.value);
  };
  function onCameraOrgChange(value) {
    cameraOrgChange(value);
  };
  function onGroupChange(value) {
    groupChange(value)
  }
  function onAlarmTypeChange(value) {
    alarmTypeChange(value)
  }
  function onIndicationChange(value) {
    indicationChange(value)
  }

  function onAlarmLevelChange(value) {
    alarmLevelChange(value)
  }
  function onConfigPriorityChange(e) {
    configPriorityChange(e.target.value)
  }
  function onMemoChange(e) {
    memoChange(e.target.value);
  }
  function onAddClick() {
    onSubmit();
  }
  const renderCameraGroup = data => data.map(item => {
    if (item.children) {
      return (<TreeNode key={item.cameraCategory.id} value={String(item.cameraCategory.id)} title={<div>{item.cameraCategory.name}</div>}>
        {renderCameraGroup(item.children)}
      </TreeNode>)
    };
    return <TreeNode key={item.cameraCategory.id} value={String(item.cameraCategory.id)} title={<div>{item.cameraCategory.name}</div>}>

    </TreeNode>
  });
  function onrenderSelectOptions() {
    let op = '';
    if (targetGroupList) {
      op = targetGroupList.map(value => (
        <Option value={value.id} key={value.id}>{value.name}</Option>
      ));
    }
    return op;
  }

  return (
    <div>
      <Modal
        title=""
        footer=""
        visible={visiable}
        onCancel={onCancel}
        closable={false}
        width={500}
        bodyStyle={{ border: '1px solid #02abe3' }}
        className={styles.modalBody}
        maskClosable={false}
      >
        <div className={styles.modalHeader}>
          <span className={styles.modalHeaderTitle}>新建规则</span>
        </div>
        <div className={styles.serchWrap}>
          <div className={styles.text}><span style={{ color: 'red' }}>*</span>规则状态</div>
          <RadioGroup name="radiogroup" value={dataSource.flag} onChange={onStateChange}>
            <Radio className={styles.radio} value={1}>开启</Radio>
            <Radio className={styles.radio} value={0}>关闭</Radio>
          </RadioGroup>
        </div>
        <div className={styles.moduleLine} />
        <div className={styles.serchWrap}>
          <div className={styles.text}><span style={{ color: 'red' }}>*</span>规则名称</div>
          <Input
            value={dataSource.name}
            className={styles.input}
            onChange={onNameChange}
          />
        </div>
        <div className={styles.moduleLine} />
        <div className={styles.serchWrap}>
          <div className={styles.text}><span style={{ color: 'red' }}>*</span>摄像头所属分组</div>
          <TreeSelect
            className={styles.input}
            value={`${dataSource.groupId}`}
            onChange={onCameraOrgChange}
            treeDefaultExpandAll
            placeholder="请选择组织"
          >

            {renderCameraGroup(categoryTree ? categoryTree : [])}
          </TreeSelect>
        </div>
        <div className={styles.serchWrap}>
          <div className={styles.text}><span style={{ color: 'red' }}>*</span>目标所属分组</div>
          <Select
            className={styles.input}
            onChange={onGroupChange}
            value={dataSource.poiGroupId}
          >
            {onrenderSelectOptions()}
          </Select>
        </div>

        <div className={styles.moduleLine} />
        <div className={styles.serchWrap}>
          <div className={styles.text}><span style={{ color: 'red' }}>*</span>报警方式</div>
          <Select
            className={styles.input}
            onChange={onAlarmTypeChange}
            value={`${dataSource.alarmType}`}
          >
            <Option value="2">在组内</Option>
            <Option value="1">不在组内</Option>

          </Select>
        </div>
        <div className={styles.serchWrap}>
          <div className={styles.text}><span style={{ color: 'red' }}>*</span>预警性质</div>
          <Select
            className={styles.input}
            onChange={onIndicationChange}
            value={`${dataSource.alarmIndication}`}
          >
            <Option value="1">报警</Option>
            <Option value="2">VIP</Option>
            <Option value="3">闯入</Option>
            <Option value="4">新客户</Option>
          </Select>
        </div>
        <div className={styles.serchWrap}>
          <div className={styles.text}><span style={{ color: 'red' }}>*</span>报警级别</div>
          <Select
            className={styles.input}
            onChange={onAlarmLevelChange}
            value={`${dataSource.alarmLevel}`}
          >
            <Option value="1">一级报警</Option>
            <Option value="2">二级报警</Option>
            <Option value="3">三级报警</Option>
            <Option value="4">四级报警</Option>
          </Select>
        </div>
        <div className={styles.serchWrap}>
          <div className={styles.text}><span style={{ color: 'red' }}>*</span>报警优先级</div>
          <Input
            className={styles.input}
            placeholder={"请输入数字，0-999，0位最高优先级"}
            value={dataSource.configPriority}
            onChange={onConfigPriorityChange}
          />
        </div>
        {/* <div className={styles.serchWrap}>
          <div className={styles.text}>执行时间</div>
          <div className={styles.checkboxInput}>
            <Row>
              <Col span={8}>
                <Checkbox value="0" checked={checkBoxIsChecked('0')} onChange={onTimeChange}>每天</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="1" checked={checkBoxIsChecked('1')} onChange={onTimeChange}>星期一</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="2" checked={checkBoxIsChecked('2')} onChange={onTimeChange}>星期二</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="3" checked={checkBoxIsChecked('3')} onChange={onTimeChange}>星期三</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="4" checked={checkBoxIsChecked('4')} onChange={onTimeChange}>星期四</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="5" checked={checkBoxIsChecked('5')} onChange={onTimeChange}>星期五</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="6" checked={checkBoxIsChecked('6')} onChange={onTimeChange}>星期六</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="7" checked={checkBoxIsChecked('7')} onChange={onTimeChange}>星期天</Checkbox>
              </Col>
            </Row>
          </div> */}
        {/* </div> */}

        <div className={styles.moduleLine} />
        <div className={`${styles.serchWrap} ${styles.textAreaWrap}`}>
          <div className={styles.text}>备注</div>
          <TextArea
            className={styles.input}
            style={{ width: '50%' }}
            autosize={{ minRows: 2, maxRows: 5 }}
            onChange={onMemoChange}
            value={dataSource.memo}
          />
        </div>
        <div className={styles.moduleLine} />
        <Row type="flex" justify="space-between" className={styles.footer}>
          <Button type="primary" className={styles.refreshMatch} onClick={onAddClick}>保存</Button>
          <Button type="primary" ghost className={styles.refreshMatch} onClick={onCancel}>关闭</Button>
        </Row>
      </Modal>
    </div>
  );
};

export default AddRuleModule;

