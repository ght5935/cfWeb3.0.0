/**
 * Created by Jason on 2018/1/12.
 */
import { Input, Button, Select, TreeSelect } from 'antd';

import styles from './groupConfig.less';

// const Option = Select.Option;
const { TreeNode } = TreeSelect;

const GroupNew = ({ dataSource, isOrgunitShow, onNameChange, onMemoChange, onCoordinateChange, onParentIdChange, isBtnDisplay, onNewSubmit, orgunitList }) => {
  function onCancel() {
    isOrgunitShow(false);
  }

  function nameChange(e) {
    onNameChange(e.target.value);
  }
  function memoChange(e) {
    onMemoChange(e.target.value);
  }
  function coordinateChange(e) {
    onCoordinateChange(e.target.value);
  }
  function parentIdChange(value) {
    onParentIdChange(value - 0);
  }

  function onSubmit() {
    onNewSubmit();
  }
  return (
    <div className={styles.groupMsgContain}>
      <div className={styles.groupMsgTitle}>新增子项目</div>
      <div className={styles.groupMsgContent}>
        <div className={styles.groupMsgForm}>
          <div className={styles.formItem}>
            <label className={styles.label}>组织名称：</label>
            <Input type="text" style={{ width: '30%', minWidth: '200px' }} onChange={nameChange} />
          </div>
          <div className={styles.formItem}>
            <label className={styles.label}>备注：</label>
            <Input type="text" style={{ width: '30%', minWidth: '200px' }} onChange={memoChange} />
          </div>
          <div className={styles.formItem}>
            <label className={styles.label}>坐标位置：</label>
            <Input type="text" style={{ width: '30%', minWidth: '200px' }} onChange={coordinateChange} />
          </div>
          {/* <div className={styles.formItem}>
            <label className={styles.label}>所属组织：</label>
            <Select type="text" style={{ width: '30%' }} value={orgunitList !== 0 ? `${dataSource.parentId}` : ''} onChange={parentIdChange}>
              {orgunitList && orgunitList.length > 0 ? orgunitList.map(value => <Option key={value.key} value={`${value.key}`}>{value.title}</Option>) : null}
            </Select>
          </div> */}
          <div className={styles.formItem}>
            <label className={styles.label}>所属组织：</label>
            {/* <Select disabled={true} type="text" style={{ width: '30%', minWidth: '200px', color: '#333' }} value={orgunitList !== 0 ? `${dataSource.parentId}` : ''} onChange={parentIdChange}>
              {orgunitList && orgunitList.length > 0 ? orgunitList.map(value => <Option key={value.key} value={`${value.key}`}>{value.title}</Option>) : null}
            </Select> */}
            <TreeSelect
              style={{ width: '30%', minWidth: '200px', color: '#333' }}
              allowClear
              disabled={true}
              onChange={parentIdChange}
              dropdownMatchSelectWidth={false}
              value={dataSource.parentId !== 0 ? `${dataSource.parentId}` : '父节点禁止修改'}
              treeData={orgunitList && orgunitList.length ?
                orgunitList : []}
              treeDefaultExpandAll
            />
          </div>
          <div className={styles.formItem} />

          <div className={styles.formItem}>
            <label className={styles.label} />
            <div className={styles.ModifyBtns}>
              <Button type="primary" disabled={!isBtnDisplay} className={styles.btnLeft} onClick={onSubmit}>确认新增</Button>
              <Button type="primary" ghost className={styles.btnRight} onClick={onCancel}>取消新增</Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default GroupNew;
