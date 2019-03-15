
/**
 * Created by Ethan on 2018/1/16.
 */
import React from 'react';
import { Modal, Row, Col, Tree, Input, Radio, Button } from 'antd';
import styles from './Rule.less';

const TreeNode = Tree.TreeNode;
const RadioGroup = Radio.Group;

const AddRuleModule = ({ dataSource, visiable, toggleCss, modalCss, onAddModalCancel,
    cameraGroupTree, personGroupTree, cgTreeExpandKeys, pgTreeExpandKeys, cgTreeExpand, pgTreeExpand,
    cgSelect, pgSelect, configPriorityChange, alarmLevelChange, indicationChange, alarmTypeChange, stateChange,
    nameChange, onSubmit }) => {

    function onToggleCss() {
        toggleCss()
    }
    function addModalCancel() {
        onAddModalCancel()

    }
    function onCgTreeExpand(expandedKeys) {
        cgTreeExpand(expandedKeys)
    }
    function onPgTreeExpand(expandedKeys) {
        pgTreeExpand(expandedKeys)
    }

    function onNameChange(e){
        nameChange(e.target.value);
    }
    function onAddClick() {
        onSubmit();
      }

    function parentClassName(flag, id) {
        const expandedKeys = flag === 'cg' ? cgTreeExpandKeys : pgTreeExpandKeys;
        if (expandedKeys.indexOf(`${id}`) === -1) {
            return styles.treeNode;
        }
        return styles.treeNode_open;
    }
    function renderTree(data, flag) {
        let tn = '';
        tn = data.map(v => {
            if (v.children) {
                return (
                    <TreeNode key={v.id} title={<div><i className={parentClassName(flag, v.id)} />{v.title}</div>}>
                        {v.objectList ? renderCameraNode(flag, v.objectList, v.id) : ''}
                        {renderTree(v.children, flag)}
                    </TreeNode>
                );
            }
            if (v.objectList) {
                return (
                    <TreeNode
                        key={v.id} title={<div><i className={parentClassName(flag, v.id)} />{v.title}</div>}>
                        {renderCameraNode(flag, v.objectList, v.id)}
                    </TreeNode>
                );
            }
            return <TreeNode key={v.id} title={<div><i className={parentClassName(flag, v.id)} />{v.title}</div>} />;
        });
        return tn;
    }
    function renderCameraNode(flag, data, parentId) {
        let tn = '';
        tn = data.map(v => {
            return <TreeNode key={`${v.id}|${parentId}|${v.name}`} title={<div><Radio checked={isRadioChecked(flag, v.id)} className={styles.treeRadios} /><span className={styles.treeSpan}>{v.name}</span></div>} />;
        });
        return tn;
    }
    function onCgSelect(v, n, y) {
        cgSelect(v)
    }
    function onPgSelect(v) {
        pgSelect(v)
    }
    function isRadioChecked(flag, id) {
        const comId = flag === 'cg' ? dataSource.groupId : dataSource.poiGroupId;
        if (id == comId) {
            return true;
        }
        return false;
    }
    function onStateChange(e) {
        stateChange(e.target.value)
    };
    //   function onNameChange(e) {
    //     nameChange(e.target.value);
    //   };
    function onAlarmTypeChange(e) {
        alarmTypeChange(e.target.value)
    }
    function onIndicationChange(e) {
        indicationChange(e.target.value)
    }

    function onAlarmLevelChange(e) {
        alarmLevelChange(e.target.value)
    }
    function onConfigPriorityChange(e) {
        configPriorityChange(e.target.value)
    }
    //   function onMemoChange(e) {
    //     memoChange(e.target.value);
    //   }

    return (
        <div>
            <Modal
                title=""
                footer=""
                visible={visiable}
                closable={false}
                onCancel={addModalCancel}
                width={modalCss.modalWidth}
                bodyStyle={{ transition: '.2s', border: '1px solid #02abe3', width: modalCss.modalWidth, height: '460px', overflow: 'hidden' }}
                className={styles.modal}
                maskClosable={false}
            >
                <div className={styles.modalHeader}>
                    <span className={styles.modalHeaderTitle}>新建报警规则</span>
                </div>
                <div className={modalCss.arrowCss} onClick={onToggleCss}></div>
                <Row>
                    <Col span={modalCss.treeCol} className={styles.treeWapper}>
                        <div className={styles.addTitle}>
                            <i className={styles.numberOne}></i><span>选择摄像头分组</span>
                        </div>
                        <div className={styles.treeSwiper}>
                            <Tree
                                defaultExpandAll={true}
                                expandedKeys={cgTreeExpandKeys}
                                onExpand={onCgTreeExpand}
                                onSelect={onCgSelect}
                                selectedKeys={[`${dataSource.groupId}`]}
                            >
                                {renderTree(cameraGroupTree, 'cg')}
                            </Tree>
                        </div>

                    </Col>
                    <Col span={modalCss.treeCol} className={styles.treeWapper}>
                        <div className={styles.addTitle}>
                            <i className={styles.numberTwo}></i><span>选择目标分组</span>
                        </div>
                        <div className={styles.treeSwiper}>
                            <Tree
                                defaultExpandAll={true}
                                expandedKeys={pgTreeExpandKeys}
                                onExpand={onPgTreeExpand}
                                onSelect={onPgSelect}
                                selectedKeys={[`${dataSource.poiGroupId}`]}
                            >
                                {renderTree(personGroupTree, 'pg')}
                            </Tree>
                        </div>
                    </Col>
                    <Col span={modalCss.moreCol} className={styles.treeWapper}>
                        <div className={styles.addTitle}>
                            <i className={styles.numberThree}></i><span>选择报警条件</span>
                        </div>
                        <div className={styles.treeSwiper}>
                            <div className={styles.serchWrap}>
                                <div className={styles.text}>规则名称</div>
                                <div className={styles.input}>
                                <Input
                                    value={dataSource.name}
                                    style={{width: '90%'}}
                                    onChange={onNameChange}
                                />
                                </div>
                                
                            </div>
                            <div className={styles.serchWrap}>
                                <div className={styles.text}>规则状态</div>
                                <RadioGroup name="radiogroup" value={dataSource.flag} className={styles.input} onChange={onStateChange} >
                                    <Radio className={styles.radio} value={1}>开启</Radio>
                                    <Radio className={styles.radio} value={0}>关闭</Radio>
                                </RadioGroup>
                            </div>
                            <div className={styles.serchWrap}>
                                <div className={styles.text}>报警方式</div>
                                <RadioGroup
                                    className={styles.input}
                                    onChange={onAlarmTypeChange}
                                    value={`${dataSource.alarmType}`}
                                >
                                    <Radio className={styles.radio} value="2">在组内</Radio>
                                    <Radio className={styles.radio} value="1">不在组内</Radio>

                                </RadioGroup>
                            </div>
                            <div className={styles.serchWrap}>
                                <div className={styles.text}>预警性质</div>
                                <RadioGroup
                                    className={styles.input}
                                    onChange={onIndicationChange}
                                    value={`${dataSource.alarmIndication}`}
                                >
                                    <Radio className={styles.radio} value="1">报警</Radio>
                                    {/* <Option value="2">VIP</Option> */}
                                    <Radio className={styles.radio} value="3">闯入</Radio>
                                    {/* <Option value="4">新客户</Option> */}
                                </RadioGroup>
                            </div>
                            <div className={styles.serchWrap}>
                                <div className={styles.text}>报警级别</div>
                                <RadioGroup
                                    className={styles.input}
                                    // style={{width: '280px'}}
                                    onChange={onAlarmLevelChange}
                                    value={`${dataSource.alarmLevel}`}
                                >
                                    <Radio className={styles.radio} value="1">一级</Radio>
                                    <Radio className={styles.radio} value="2">二级</Radio>
                                    <Radio className={styles.radio} value="3">三级</Radio>
                                    <Radio className={styles.radio} value="4">四级</Radio>
                                </RadioGroup>
                            </div>
                            <div className={styles.serchWrap}>
                                <div className={styles.text}>报警优先级</div>
                                <div className={styles.input}>
                                    <Input
                                        style={{ width: '90%' }}
                                        placeholder={"请输入数字，0-999，0位最高优先级"}
                                        value={dataSource.configPriority}
                                        onChange={onConfigPriorityChange}
                                    />
                                </div>

                            </div>
                        </div>
                    </Col>
                </Row>
                {/* <Collapse bordered={false}>
                    <Panel header="更多设置" key="1" style={panelStyle}>
                        fsfsfsfgsgsdgsgsgsgsgsgsg
                    </Panel>
                </Collapse> */}
                <div className={styles.submit}>
                    <Button type="primary" className={styles.refreshMatch} onClick={onAddClick}>保存</Button>
                    <Button type="primary" ghost className={styles.refreshMatch} onClick={addModalCancel}>关闭</Button>
                </div>
            </Modal>
        </div>
    );
};

export default AddRuleModule;

