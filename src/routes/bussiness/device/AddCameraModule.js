
/**
 * Created by Ethan on 2018/1/16.
 */
import React from 'react';
import { Modal, Button, Input, Select, Row, TreeSelect, Popover } from 'antd';
import VlcView from '../../../components/vlc/VlcView';
import { connect } from 'dva';
import styles from './Device.less';
import { CAMERA_CONFIG } from '../../../utils/config';

const Option = Select.Option;
const { TextArea } = Input;
const AddCameraModule = ({
  modalWidth,
  visiable,
  dataSource,
  groupTree,
  onAddModalCancel,
  cameraNameChange,
  brandChange,
  ipChange,
  manageCameraNameChange,
  manageCameraPswChange,
  playURLChange,
  cjdURLChange,
  cjdUuIdChange,
  cjdSubIdChange,
  configChange,
  orgunitIdChange,
  renderSelectOptions,
  onSubmit,
  selectGroupChange,
  modifygroupNameTree,
  changeModalWidth,
  textAreaShow,
  arrowShow,
  playTestVisit,
  cjdTestVisit,
  changePlayTestVisiable,
  changeCjdTestVisiable
}) => {
  function onCancel() {
    onAddModalCancel();
  }
  function onCameraNameChange(e) {
    cameraNameChange(e.target.value);
  }
  function onBrandChange(value) {
    brandChange(value);
  }
  function onIpChange(e) {
    ipChange(e.target.value);
  }
  function onManageCameraNameChange(e) {
    manageCameraNameChange(e.target.value);
  }
  function onManageCameraPswChange(e) {
    manageCameraPswChange(e.target.value);
  }
  function onPlayURLChange(e) {
    playURLChange(e.target.value);
  }
  function onCjdURLChange(e) {
    cjdURLChange(e.target.value);
  }
  function onCjdUChange(value) {
    cjdUuIdChange(value);
  }
  function onCjdSubIdChange(e) {
    cjdSubIdChange(e.target.value);
  }
  function onConfigChange(e) {
    configChange(e.target.value);
  }
  function onorgunitIdChange(value) {
    orgunitIdChange(value);
  }
  function onSelectGroupChange(value) {
    selectGroupChange(value);
  }
  function onAddClick() {
    onSubmit();
  }
  function playTestVisitChange(visible) {
    changePlayTestVisiable(visible)
  }
  function cjdTestVisitChange(visible){
    changeCjdTestVisiable(visible)
  }
  return (
    <div>
      <Modal
        title=""
        footer=""
        visible={visiable}
        onCancel={onCancel}
        closable={false}
        width={modalWidth}
        maskClosable={false}
        bodyStyle={{ height: 555, border: '1px solid #02abe3' }}
        className={styles.modalBody}
      >

        <div className={styles.modalHeader}>
          <span className={styles.modalHeaderTitle}>新建摄像头</span>
          <span onClick={onCancel} className={styles.modalHeaderClose} >×</span>
        </div>
        <div className={styles.serchWrap}>
          <div className={styles.text}><span style={{ color: 'red' }}>*</span> 所属组织</div>
          <TreeSelect
            treeData={groupTree || []}
            className={styles.input}
            value={`${dataSource.orgunit_id}`}
            onChange={onorgunitIdChange}
            treeDefaultExpandAll
            placeholder="请选择组织"
          />
        </div>
        <div className={styles.serchWrap}>
          <div className={styles.text}><span style={{ color: 'red' }}>*</span> 分组名称</div>
          <Select
            className={styles.input}
            onChange={onSelectGroupChange}
            value={`${dataSource.categoryId}`}
            placeholder="请选择分组"
          >
            {modifygroupNameTree && modifygroupNameTree.length > 0 ?
              modifygroupNameTree.map((value, i) =>
                <Select.Option
                  key={i}
                  value={`${value.id}`}>{value.name}</Select.Option>
              ) : null}
          </Select>
        </div>
        <div className={styles.serchWrap}>
          <div className={styles.text}><span style={{ color: 'red' }}>*</span> 摄像头名称</div>
          <Input className={styles.input} onChange={onCameraNameChange} value={dataSource.name} />
        </div>
        <div className={styles.serchWrap}>
          <div className={styles.text}>IP地址</div>
          <Input className={styles.input} onChange={onIpChange} value={dataSource.ipAddress} />
        </div>
        <div className={styles.serchWrap}>
          <div className={styles.text}>管理摄像头用户名</div>
          <Input className={styles.input} onChange={onManageCameraNameChange} value={dataSource.cameraUsername} />
        </div>
        <div className={styles.serchWrap}>
          <div className={styles.text}>管理摄像头密码</div>
          <Input className={styles.input} onChange={onManageCameraPswChange} value={dataSource.cameraPassword} />
        </div>
        <div className={styles.serchWrap}>
          <div className={styles.text}><span style={{ color: 'red' }}>*</span> 摄像头品牌</div>
          <Select
            className={styles.input}
            placeholder="请选择品牌"
            value={dataSource.modelType}
            onChange={onBrandChange}
          >
            <Select.Option value={0}>其他</Select.Option>
            <Select.Option value={1}>海康</Select.Option>
            <Select.Option value={2}>大华</Select.Option>
            <Select.Option value={3}>宇视</Select.Option>
          </Select>
        </div>
        <div className={styles.serchWrap}>
          <div className={styles.text}><span style={{ color: 'red' }}>*</span> 播放流地址</div>
          <Input className={styles.input} onChange={onPlayURLChange} value={dataSource.playUrl} />
          <Popover  
            trigger={'click'}
            content={<div className={styles.testVlcModal}>
            {playTestVisit ? <VlcView vlcSrc={dataSource.playUrl} id={1} /> : ''}
          </div>}
            visible={playTestVisit}
            onVisibleChange={playTestVisitChange}
          >
            <Button style={{ marginLeft: '20px', position: 'absolute', zIndex: 100 }} type="primary">测试</Button>
          </Popover>
        </div>
        <div className={styles.serchWrap}>
          <div className={styles.text}><span style={{ color: 'red' }}>*</span> 采集流地址</div>
          <Input className={styles.input} onChange={onCjdURLChange} value={dataSource.cjdUrl} />
          <Popover  
            trigger={'click'}
            content={<div className={styles.testVlcModal}>
            {cjdTestVisit ? <VlcView vlcSrc={dataSource.cjdUrl} id={1} /> : ''}
          </div>}
            visible={cjdTestVisit}
            onVisibleChange={cjdTestVisitChange}
          >
          <Button style={{ marginLeft: '20px', position: 'absolute', zIndex: 100 }} type="primary">测试</Button>
          </Popover>
        </div>
        <div className={styles.configWrap}>
          <div className={styles.areaText} ><span style={{ color: 'red' }}>*</span> 参数配置</div>
          <div className={`${styles.arrowChange} ${styles[arrowShow]}`} onClick={changeModalWidth}>>></div>
          <TextArea
            className={`${styles.areaInput} ${styles[textAreaShow]}`}
            // defaultValue={CAMERA_CONFIG}
            style={{ width: 300 }} 
            autosize={{ minRows: 17, maxRows: 19 }}
            onChange={onConfigChange}
            value={dataSource.config}
          />

        </div>
        <Row type="flex" justify="space-between" className={styles.footer} style={{ marginLeft: 30 }}>
          <Button type="primary" className={styles.refreshMatch} onClick={onAddClick}>保存</Button>
        </Row>
      </Modal>
    </div>
  );
};

export default AddCameraModule;

