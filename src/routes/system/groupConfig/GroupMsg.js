/**
 * Created by Jason on 2018/1/12.
 */
import React from 'react';
import { Input, Button, TreeSelect } from 'antd';

import styles from './groupConfig.less';

// const Option = Select.Option;
const { TreeNode } = TreeSelect;

const GroupMsg = ({ dataSource, onNameChange, onMemoChange, onCoordinateChange, onParentIdChange, isBtnDisplay, newSubOrgunit, onModifySubmit, orgunitList, onDelete }) => {
  
  function nameChange(e) {
    onNameChange(e.target.value);
  }
  function memoChange(e) {
    onMemoChange(e.target.value);
  }
  function coordinateChange(e) {
    onCoordinateChange(e.target.value);
  }
  function parentChange(value) {
    onParentIdChange(value);
  }
  function onNewSubOrgunit(id) {
    newSubOrgunit(id);
  }
  function onSubmit() {
    onModifySubmit();
  }
  function onDeleteClick(id) {
    onDelete(id);
  }
  return (
    <div className={styles.groupMsgContain}>
      <div className={styles.groupMsgTitle}>组织信息</div>
      <div className={styles.groupMsgContent}>
        <div className={styles.groupMsgForm}>
          <div className={styles.formItem}>
            <label className={styles.label}>组织名称：</label>
            <Input
              type="text" style={{ width: '30%', minWidth: '200px'}} value={dataSource.name}
              onChange={nameChange}/>
          </div>
          <div className={styles.formItem}>
            <label className={styles.label}>备注：</label>
            <Input type="text" style={{ width: '30%', minWidth: '200px'}} value={dataSource.memo} onChange={memoChange}/>
          </div>
          <div className={styles.formItem}>
            <label className={styles.label}>坐标位置：</label>
            <Input type="text" style={{ width: '30%', minWidth: '200px'}} value={dataSource.coordinate} onChange={coordinateChange}/>
          </div>
          <div className={styles.formItem}>
            <label className={styles.label}>所属组织：</label>
            {/* <Select
              type="text" style={{ width: '30%', minWidth: '200px'}}
              disabled={dataSource.parentId === 0}
              value={dataSource.parentId !== 0 ? `${dataSource.parentId}` : '父节点禁止修改'}
              onChange={parentIdChange}>
              {orgunitList && orgunitList.length > 0 ? orgunitList.map(value =>
                <Option
                  key={value.key} style={{display: dataSource.id === value.key ? 'none' : 'block'}}
                  value={`${value.key}`}>{value.title}</Option>) : null}
            </Select> */}
            <TreeSelect
              style={{ width: '30%', minWidth: '200px', color: '#333'}}
              allowClear
              disabled={true}
              onChange={parentChange}
              dropdownMatchSelectWidth={false}
              value={dataSource.parentId !== 0 ? `${dataSource.parentId}` : '父节点禁止修改'}
              treeData={orgunitList && orgunitList.length ?
                orgunitList : []}
                treeDefaultExpandAll
            />
          </div>
          {/* <div className={styles.formItem}>
            <label className={styles.label}/>
            <div className={styles.ModifyBtns}>
              <Button type="primary" className={styles.btnLeft} onClick={onNewSubOrgunit.bind(this, dataSource.id)}><i
                className={styles.addIcon}/>新增子项目</Button>
            </div>
          </div> */}
          <div className={styles.formItem}/>

          <div className={styles.formItem}>
            {/* <label className={styles.label}/> */}
            <div className={styles.ModifyMsgBtns}>
              <Button type="primary" disabled={!isBtnDisplay} className={styles.btnMsgLeft} onClick={onSubmit}>确认修改</Button>
              <Button type="primary" className={styles.btnMsgLeft} onClick={onNewSubOrgunit.bind(this, dataSource.id)}><i
                className={styles.addIcon}/>新增子项目</Button>
              <Button type="danger" ghost className={styles.btnMsgLeft} onClick={onDeleteClick.bind(this, dataSource.id)}>删除此项</Button>
            </div>
          </div>

        </div>
      </div>

    </div>);
};


export default GroupMsg;
