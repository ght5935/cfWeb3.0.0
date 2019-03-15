/**
 * Created by Ethan on 2018/1/10.
 */
import React from 'react';
import { connect } from 'dva';
import { Checkbox, Button, message } from 'antd';

import styles from './powerConfig.less';
import {API_PREFIX} from '../../../utils/config';
import MayLayout from '../../../components/common/Layout/MayLayout';
import ComfirmModal from '../../../components/common/ConfirmModal/ConfirmModal';

class PowerConfig extends React.Component {

  componentDidMount() {
    this.props.dispatch({
      type: 'system/getAllModule'
    });
  }
  componentWillUnmount() {
    const powerCfg = this.props.system.powerCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        powerCfg: {
          ...powerCfg,
          bindRoleModuleParams: {
            powerRoleId: '',
            moduleId: []
          }
        }
      }
    });
  }
  onCheckModule = id => {
    const powerCfg = this.props.system.powerCfg;
    const {bindRoleModuleParams} = powerCfg;

    const moduleId = bindRoleModuleParams.moduleId || [];
    if (powerCfg.initModuleId && powerCfg.initModuleId.length > 0) {
      if (powerCfg.initModuleId[0].moduleId === id) {
        message.warning('默认模块无法更改！');
        return false;
      }
    }

    if (moduleId.indexOf(id) === -1) {
      moduleId.push(id);
    } else {
      const index = moduleId.indexOf(id);
      moduleId.splice(index, 1);
    }
    this.props.dispatch({
      type: 'system/success',
      payload: {
        powerCfg: {
          ...powerCfg,
          bindRoleModuleParams: {
            ...bindRoleModuleParams,
            moduleId
          }
        }
      }
    });
  }
  activeTree = id => {
    const powerCfg = this.props.system.powerCfg;
    const {bindRoleModuleParams} = powerCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        powerCfg: {
          ...powerCfg,
          bindRoleModuleParams: {
            ...bindRoleModuleParams,
            powerRoleId: id
          }
        }
      }
    });
    this.props.dispatch({
      type: 'system/searchRolePower'
    });
  }
  onComfirmSubmit = () => {
    this.props.dispatch({
      type: 'system/success',
      payload: {
        confirmVisiable: true
      }
    });
  }
  onSubmit = () => {
    this.props.dispatch({
      type: 'system/bindRoleModule'
    });
    this.props.dispatch({
      type: 'system/success',
      payload: {
        confirmVisiable: false
      }
    });
  }
  onComfirmCancel =() => {
    this.props.dispatch({
      type: 'system/success',
      payload: {
        confirmVisiable: false
      }
    });
  }
  onReset = () => {
    const powerCfg = this.props.system.powerCfg;
    const {bindRoleModuleParams} = powerCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        powerCfg: {
          ...powerCfg,
          bindRoleModuleParams: {
            ...bindRoleModuleParams,
            moduleId: [this.props.system.powerCfg.initModuleId[0].moduleId]
          }
        }
      }
    });
  }
  activeTreeClass = id => {
    const {bindRoleModuleParams} = this.props.system.powerCfg;
    if (bindRoleModuleParams) {
      if (id === bindRoleModuleParams.powerRoleId) {
        return styles.treeActive;
      }
    }
    return styles.tree;
  }
  renderRoleList = () => {
    let op = '';
    if (this.props.system.powerCfg && this.props.system.powerCfg.powerList) {
      if (this.props.system.powerCfg.powerList.length > 0) {
        op = this.props.system.powerCfg.powerList.map(value => (
          <a key={value.id} className={this.activeTreeClass(value.id)} onClick={this.activeTree.bind(this, value.id)}>
            <span style={{marginLeft: '25px', fontSize: '16px'}}>{value.name}</span>
          </a>
        ));
      }
    }
    return op;
  };
  checkBoxStatus = moduleId => {
    if (this.props.system.powerCfg.bindRoleModuleParams && this.props.system.powerCfg.bindRoleModuleParams.moduleId) {
      if (this.props.system.powerCfg.bindRoleModuleParams.moduleId.indexOf(moduleId) !== -1) {
        return true;
      }
      return false;
    }
    return false;
  };
  renderModels = () => {
    let mod = '';
    if (this.props.system.powerCfg && this.props.system.powerCfg.moduleList.length > 0) {
      mod = this.props.system.powerCfg.moduleList.map(value => (
        <div key={value.moduleId} className={styles.group}>
          <div className={styles.text}>
            <span>{value.moduleName}</span>
          </div>
          {value.moduleList.length > 0 ? value.moduleList.map(item => (
            <div key={item.moduleId}>
              <div className={this.cssModuleCard(item.moduleId)} onClick={this.onCheckModule.bind(this, item.moduleId)}>
                <img className={styles.photograph} src={`${API_PREFIX}${item.icon}`} alt=""/>
                <span className={styles.fontText}>{item.moduleName}</span>
                <Checkbox
                  disabled={this.props.system.powerCfg.initModuleId && this.props.system.powerCfg.initModuleId.length > 0 ?
                          this.props.system.powerCfg.initModuleId[0].moduleId === item.moduleId : false}
                  checked={this.checkBoxStatus(item.moduleId)}
                  className={styles.checkBox}
                />
                <div className={styles.introduce}>
                  {/* <span className={styles.memoText}>{item.memo}</span> TODO*/}
                  <span className={styles.memoText}>{item.memo}</span>
                </div>
              </div>
            </div>
          )) : null}
        </div>
      ));
    }
    return mod;
  }
  cssModuleCard = id => {
    if (this.props.system.powerCfg.bindRoleModuleParams && this.props.system.powerCfg.bindRoleModuleParams.moduleId) {
      if (this.props.system.powerCfg.bindRoleModuleParams.moduleId.indexOf(id) !== -1) {
        return `${styles.card} ${styles.cardSelected}`;
      }
      return styles.card;
    }
    return styles.card;
  }


  render() {
    return (
      <MayLayout location={this.props.location}>
        <div className={styles.left}>
          <div className={styles.title}>
            <span>第一步:选择角色</span>
          </div>
          <div style={{overflow: 'auto', height: '772px'}}>
            {this.renderRoleList()}
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>
            <span>第二步:选择权限</span>
          </div>
          {this.renderModels()}
          <div className={styles.btnWrap}>
            <Button style={{width: '110px'}} type="primary" onClick={this.onComfirmSubmit}>保存配置</Button>
            <Button style={{width: '110px', marginLeft: '20px'}} onClick={this.onReset} type="primary" ghost>清空选择</Button>
          </div>
        </div>


        <ComfirmModal
          visiable={this.props.system.confirmVisiable}
          onSubmit={this.onSubmit}
          onCancel={this.onComfirmCancel}
        />
      </MayLayout>
    );
  }
}

function mapStateToProps({ system }) {
  return { system };
}

export default connect(mapStateToProps)(PowerConfig);
