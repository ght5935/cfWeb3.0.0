/**
 * Created by Ethan on 2018/1/10.
 */
import React from 'react';
import { connect } from 'dva';
import { Input, Tree, Icon, message } from 'antd';

import MayLayout from '../../../components/common/Layout/MayLayout';
import ConfirmModal from '../../../components/common/ConfirmModal/ConfirmModal';
import GroupMsg from './GroupMsg';
import GroupNew from './GroupNew';
import styles from './groupConfig.less';

const TreeNode = Tree.TreeNode;

class GroupConfig extends React.Component {
  state = {
    expandedKeys: [], // 组织树展开节点集合
    searchValue: '', //
    autoExpandParent: true,
    isModifyDisplay: false,
    isNewBtnDisplay: false,
    confirmVisiable: false,
    action: 'edit'
  };

  componentWillMount() {
    this.props.dispatch({
      type: 'system/getGroupTree'
    });
  }

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false
    });
  };

  // 组织树Input输入
  onTreeSelectChange = e => {
    const value = e.target.value !== '' ? e.target.value.trim() : null; // 输入数据去空格
    const expandedKeys = this.props.system.groupCfg.dataList.map(item => {
      if (value && item.title.indexOf(value) > -1) {
        return this.getParentKey(item.key, this.props.system.groupCfg.groupTree);
      }
      return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value || '',
      autoExpandParent: true
    });
  };
  // 清空 .treeSelect 值
  onEmitEmpty = () => {
    this.treeSelect.focus();
    this.setState({ searchValue: '', expandedKeys: [] });
  };

  // 树节点点击
  onTreeNodeClick = (value, node, extra) => {
    if (value.length > 0) {
      this.setState({
        isBtnDisplay: false
      });
      this.props.dispatch({
        type: 'system/getOrgunitById',
        payload: {
          orgunitId: value[0] - 0 // 参数为 int
        }
      });
    } else {
      message.info('您已选中,无须重复选择')
    }
  };


  /*
  * onModifyNameChange, onModifyMemoChange，onModifyCoordinateChange，
  * onModifyParentIdChange,onModifySubmit
  *   以上函数 为修改组织内容函数
  *
  *   onNewSubOrgunit  跳转新增子节点函数
  * */
  onModifyNameChange = value => {
    this.setState({
      isModifyDisplay: true
    });
    const groupCfg = this.props.system.groupCfg;
    const { orgunitMsg } = groupCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        groupCfg: {
          ...groupCfg,
          orgunitMsg: {
            ...orgunitMsg,
            name: value
          }
        }
      }
    });
  };
  onModifyMemoChange = value => {
    this.setState({
      isModifyDisplay: true
    });
    const groupCfg = this.props.system.groupCfg;
    const { orgunitMsg } = groupCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        groupCfg: {
          ...groupCfg,
          orgunitMsg: {
            ...orgunitMsg,
            memo: value
          }
        }
      }
    });
  };
  onModifyCoordinateChange = value => {
    this.setState({
      isModifyDisplay: true
    });
    const groupCfg = this.props.system.groupCfg;
    const { orgunitMsg } = groupCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        groupCfg: {
          ...groupCfg,
          orgunitMsg: {
            ...orgunitMsg,
            coordinate: value
          }
        }
      }
    });
  };
  onModifyParentIdChange = value => {
    this.setState({
      isModifyDisplay: true
    });
    const groupCfg = this.props.system.groupCfg;
    const { orgunitMsg } = groupCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        groupCfg: {
          ...groupCfg,
          orgunitMsg: {
            ...orgunitMsg,
            parentId: value
          }
        }
      }
    });
  };
  onModifySubmit = () => {
    this.setState({
      confirmVisiable: true,
      action: 'edit'
    });
  };
  onModifyDelete = id => {
    this.setState({
      confirmVisiable: true,
      action: 'delete',
      deleteId: id
    });
  };
  onNewSubmit = () => {
    this.setState({
      confirmVisiable: true,
      action: 'new'
    });
  };
  onNewSubOrgunit = id => {
    const groupCfg = this.props.system.groupCfg;
    const { newSubOrgunitParams } = groupCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        groupCfg: {
          ...groupCfg,
          newSubOrgunitParams: {
            ...newSubOrgunitParams,
            parentId: id
          },
          isAddOrgunitShow: true
        }
      }
    });
  };
  onNewNameChange = value => {
    this.setState({
      isNewBtnDisplay: true
    });
    const groupCfg = this.props.system.groupCfg;
    const { newSubOrgunitParams } = groupCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        groupCfg: {
          ...groupCfg,
          newSubOrgunitParams: {
            ...newSubOrgunitParams,
            name: value
          }
        }
      }
    });
  };
  onNewMemoChange = value => {
    this.setState({
      isNewBtnDisplay: true
    });
    const groupCfg = this.props.system.groupCfg;
    const { newSubOrgunitParams } = groupCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        groupCfg: {
          ...groupCfg,
          newSubOrgunitParams: {
            ...newSubOrgunitParams,
            memo: value
          }
        }
      }
    });
  };
  onNewCoordinateChange = value => {
    this.setState({
      isNewBtnDisplay: true
    });
    const groupCfg = this.props.system.groupCfg;
    const { newSubOrgunitParams } = groupCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        groupCfg: {
          ...groupCfg,
          newSubOrgunitParams: {
            ...newSubOrgunitParams,
            coordinate: value
          }
        }
      }
    });
  };
  onNewParentIdChange = value => {
    this.setState({
      isNewBtnDisplay: true
    });
    const groupCfg = this.props.system.groupCfg;
    const { newSubOrgunitParams } = groupCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        groupCfg: {
          ...groupCfg,
          newSubOrgunitParams: {
            ...newSubOrgunitParams,
            parentId: value
          }
        }
      }
    });
  };

  onModalSubmit = () => {
    switch (this.state.action) {
      case 'edit':
        this.props.dispatch({
          type: 'system/modifyOrgunit'
        });
        this.setState({
          confirmVisiable: false
        });
        break;
      case 'new':
        this.props.dispatch({
          type: 'system/newOrgunit'
        });
        this.setState({
          confirmVisiable: false
        });
        break;
      case 'delete':
        this.props.dispatch({
          type: 'system/deleteOrgunit',
          payload: {
            orgunitId: this.state.deleteId
          }
        });
        this.setState({
          confirmVisiable: false
        });
        break;
    }
  };
  onModalCancel = () => {
    this.setState({
      confirmVisiable: false
    });
  };
  //  获取组织树 搜索 匹配到相应父节点的 id
  getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some(item => item.id === key)) {
          parentKey = `${node.id}`;
        } else if (this.getParentKey(key, node.children)) {
          parentKey = this.getParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  };

  parentClassName = id => {
    if (this.state.expandedKeys.indexOf(`${id}`) === -1) {
      return styles.treeNode;
    }
    return styles.treeNode_open;
  };
  // 生成树
  renderTreeNode = data => data.map(item => {
    const index = item.title.indexOf(this.state.searchValue);
    const beforeStr = item.title.substr(0, index);
    const afterStr = item.title.substr(index + this.state.searchValue.length);
    const title = index > -1 ? (
      <span>
        {beforeStr}
        <span style={{ color: '#f50' }}>{this.state.searchValue}</span>
        {afterStr}
      </span>
    ) : <span>{item.title}</span>;
    if (item.children) {
      return (
        <TreeNode key={item.id} title={<div><i className={this.parentClassName(item.id)} />{title}{'  '}{`(${item.children.length})`}</div>}>
          {this.renderTreeNode(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode key={item.id} title={<div><i className={styles.treeNode} />{title}</div>} />;
  });

  // 新增/ 修改页面切换
  isOrgunitShow = isShow => {
    const groupCfg = this.props.system.groupCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        groupCfg: {
          ...groupCfg,
          isAddOrgunitShow: isShow
        }
      }
    });
  };

  render() {
    return (
      <MayLayout location={this.props.location}>
        <div className={styles.contentLeft}>
          <div className={styles.treeSelectCont}>
            <Input
              className={styles.treeSelect}
              placeholder="输入关键字或编号"
              onChange={this.onTreeSelectChange}
              value={this.state.searchValue}
              prefix={<Icon type="search" className={styles.searchPrefix} />}
              suffix={this.state.searchValue ? <Icon
                type="close-circle"
                onClick={this.onEmitEmpty}
                className={styles.searchSuffix}
              /> : null}
              ref={node => (this.treeSelect = node)}
            />
          </div>
          <Tree
            onExpand={this.onExpand}
            expandedKeys={this.state.expandedKeys}
            autoExpandParent={this.state.autoExpandParent}
            onSelect={this.onTreeNodeClick}
          >
            {this.renderTreeNode(this.props.system.groupCfg.groupTree)}
          </Tree>
        </div>
        <div className={styles.contentRight}>

          {this.props.system.groupCfg.isAddOrgunitShow ? <GroupNew
            dataSource={this.props.system.groupCfg.newSubOrgunitParams}
            isOrgunitShow={this.isOrgunitShow}
            onNameChange={this.onNewNameChange}
            onMemoChange={this.onNewMemoChange}
            onCoordinateChange={this.onNewCoordinateChange}
            onParentIdChange={this.onNewParentIdChange}
            isBtnDisplay={this.state.isNewBtnDisplay}
            // orgunitList={this.props.system.groupCfg.dataList}
            orgunitList={this.props.system.groupCfg.groupTree}
            onNewSubmit={this.onNewSubmit}
          /> : <GroupMsg
              dataSource={this.props.system.groupCfg.orgunitMsg}
              onNameChange={this.onModifyNameChange}
              onMemoChange={this.onModifyMemoChange}
              onCoordinateChange={this.onModifyCoordinateChange}
              onParentIdChange={this.onModifyParentIdChange}
              isBtnDisplay={this.state.isModifyDisplay}
              newSubOrgunit={this.onNewSubOrgunit}
              onModifySubmit={this.onModifySubmit}
              // orgunitList={this.props.system.groupCfg.dataList}
              orgunitList={this.props.system.groupCfg.groupTree}
              onDelete={this.onModifyDelete}
            />}
        </div>

        <ConfirmModal visiable={this.state.confirmVisiable} onSubmit={this.onModalSubmit} onCancel={this.onModalCancel} />
      </MayLayout>
    );
  }
}

function mapStateToProps({ system }) {
  return { system };
}

export default connect(mapStateToProps)(GroupConfig);
