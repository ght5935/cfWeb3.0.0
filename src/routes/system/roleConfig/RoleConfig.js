/**
 * Created by Ethan on 2018/1/10.
 */
import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Select, Button, Table, Pagination } from 'antd';

import { ROLE_CONFIG_PAGE_SIZE } from '../../../utils/config';
import MayLayout from '../../../components/common/Layout/MayLayout';
import ComfirmModal from '../../../components/common/ConfirmModal/ConfirmModal';
// import Pagination from '../../../components/common/PaginationView/PaginationView';
import AddRoleModal from './AddRoleModal';
import styles from './roleConfig.less';

const Option = Select.Option;
const { Column } = Table;

class RoleConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: '',
      modalTitle: '新建角色',
    };
  }

  componentWillMount() {
    this.props.dispatch({
      type: 'system/getRoleList'
    });
  }
  onSearchClick = () => {
    this.props.dispatch({
      type: 'system/getRoleList'
    });
  };
  onSelectRoleChange = value => {
    const roleCfg = this.props.system.roleCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        roleCfg: {
          ...roleCfg,
          getRoleParams: {
            pageSize: 15,
            pageNo: 1,
            roleId: value
          }
        }
      }
    });
  };
  onAddBtnClick = () => {
    this.setState({
      action: 'newRole',
      modalTitle: '新建角色',
    });
    const roleCfg = this.props.system.roleCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        roleCfg: {
          ...roleCfg,
          addRoleModalVisiable: true
        }
      }
    });
  };
  onAddModalCancel = () => {
    const roleCfg = this.props.system.roleCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        roleCfg: {
          ...roleCfg,
          addRoleModalVisiable: false,
          modifyRole: {
            id: '',
            name: '',
            memo: ''
          }
        }
      }
    });
  };
  onRoleNameChange = val => {
    const roleCfg = this.props.system.roleCfg;
    const { modifyRole } = roleCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        roleCfg: {
          ...roleCfg,
          modifyRole: {
            ...modifyRole,
            name: val
          }
        }
      }
    });
  };
  onRoleModuleIdChange = val => {
    const roleCfg = this.props.system.roleCfg;
    const { modifyRole } = roleCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        roleCfg: {
          ...roleCfg,
          modifyRole: {
            ...modifyRole,
            moduleId: val
          }
        }
      }
    });
  };

  onRoleMemoChange = val => {
    const roleCfg = this.props.system.roleCfg;
    const { modifyRole } = roleCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        roleCfg: {
          ...roleCfg,
          modifyRole: {
            ...modifyRole,
            memo: val
          }
        }
      }
    });
  };
  onAddRoleSubmit = () => {
    switch (this.state.action) {
      case 'newRole':
        this.props.dispatch({
          type: 'system/addRole'
        });
        break;
      case 'editRole':
        this.props.dispatch({
          type: 'system/modifyRole'
        });
        break;
      default:
        break;
    }
  };
  onCheckClick = record => {
    const userCfg = this.props.system.userCfg;
    const roleCfg = this.props.system.roleCfg;
    const { getUserParams } = userCfg;
    // 1.请求当前角色所属用户
    this.props.dispatch({
      type: 'system/success',
      payload: {
        userCfg: {
          ...userCfg,
          getUserParams: {
            ...getUserParams,
            roleId: record.roleId,
          }
        }
      }
    })
    this.props.dispatch(routerRedux.push('/userCfg'))
  };
  onEditClick = record => {
    this.setState({
      action: 'editRole',
      modalTitle: '编辑角色'
    });
    const roleCfg = this.props.system.roleCfg;
    const { modifyRole } = roleCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        roleCfg: {
          ...roleCfg,
          addRoleModalVisiable: true,
          modifyRole: {
            ...modifyRole,
            id: record.roleId,
            name: record.roleName,
            memo: record.memo,
            moduleId: record.initModuleId
          }
        }
      }
    });
  };
  onDeleteClick = record => {
    const roleCfg = this.props.system.roleCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        confirmVisiable: true,
        roleCfg: {
          ...roleCfg,
          deleteRole: {
            id: record.roleId
          }
        }
      }
    });
  };

  onComfirmSubmit = () => {
    this.props.dispatch({
      type: 'system/deleteRole'
    });
  };
  onComfirmCancel = () => {
    const roleCfg = this.props.system.roleCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        confirmVisiable: false,
        roleCfg: {
          ...roleCfg,
          deleteRole: {
            id: ''
          }
        }
      }
    });
  };

  // pageTranslate = value => {
  //   this.props.dispatch({
  //     type: 'system/rolePageTranslate',
  //     payload: {
  //       pageNo: value.pageNo,
  //       pageSize: value.pageSize
  //     }
  //   });
  // };
  itemRender(current, type, originalElement) {
    if (type === 'prev') {
      return <a style={{ color: '#02abe3' }}>上一页</a>;
    } else if (type === 'next') {
      return <a style={{ color: '#02abe3' }}>下一页</a>;
    }
    return originalElement;
  }
  PaginationChange(page, pageSize) {
    this.props.dispatch({
      type: 'system/rolePageTranslate',
      payload: {
        pageNo: page,
        pageSize: pageSize
      }
    });
  }
  tableOperation = record => (
    <div>
      <span title="查看角色用户" onClick={this.onCheckClick.bind(this, record)} className={`${styles.tableBtn} ${styles.tableCheck}`} />
      <span title="编辑角色" onClick={this.onEditClick.bind(this, record)} className={`${styles.tableBtn} ${styles.tableEdit}`} />
      <span title="删除角色" onClick={this.onDeleteClick.bind(this, record)} className={`${styles.tableBtn} ${styles.tableDelete}`} />
    </div>
  );
  renderSelectOptions = () => {
    let op = '';
    if (this.props.system.roleCfg && this.props.system.roleCfg.roleList) {
      if (this.props.system.roleCfg.roleList.length > 0) {
        op = this.props.system.roleCfg.roleList.map(value => (
          <Option value={value.id} key={value.id}>{value.name}</Option>
        ));
      }
    }
    return op;
  };

  render() {
    return (
      <MayLayout location={this.props.location}>
        <div className={styles.content}>
          <div className={styles.searchBar}>
            <label className={styles.selectInput}>
              <span className={styles.label}>选择角色：</span>
              <Select
                style={{
                  width: '10%',
                  marginRight: '45px'
                }}
                placeholder="请选择角色"
                onChange={this.onSelectRoleChange}
              >
                <Option value="">全部</Option>
                {this.renderSelectOptions()}
              </Select>
            </label>
            <Button type="primary" onClick={this.onSearchClick}>查询</Button>
          </div>
          <div className={`${styles.newRoleWapper} ${styles.clearfix}`}>
            <Button type="primary" className={styles.newRoleBtn} onClick={this.onAddBtnClick}><i className={styles.addIcon} />新增角色</Button>
          </div>
          <div>
            <Table
              dataSource={this.props.system.roleCfg && this.props.system.roleCfg.roleTableList ?
                this.props.system.roleCfg.roleTableList : []}
              pagination={false}
              bordered
              rowKey={record => record.roleId}
            >
              <Column
                title="角色名称"
                dataIndex="roleName"
                key="roleName" />
              {/* <Column*/}
              {/* title=""*/}
              {/* dataIndex="userCount"*/}
              {/* key="userCount"/>*/}
              <Column
                title="用户数"
                dataIndex="userCount"
                key="userCount" />
              <Column
                title="备注"
                dataIndex="memo"
                key="memo" />
              <Column
                title="操作"
                render={this.tableOperation}
              />
            </Table>
          </div>
          {/* <Pagination
            className={styles.pagination}
            page={this.props.system.roleCfg.roleListPage}
            pageTranslate={this.pageTranslate ? this.pageTranslate : null} /> */}
          <Pagination
            className={styles.pagination}
            current={this.props.system.roleCfg.roleListPage.currentPage}
            showQuickJumper
            onChange={this.PaginationChange.bind(this)}
            defaultPageSize={15}
            itemRender={this.itemRender}
            showTotal={total => `共 ${total} 条`}
            total={this.props.system.roleCfg.roleListPage.total}
          />
        </div>
        <AddRoleModal
          visiable={this.props.system.roleCfg.addRoleModalVisiable}
          onAddModalCancel={this.onAddModalCancel}
          dataSource={this.props.system.roleCfg.modifyRole}
          roleNameChange={this.onRoleNameChange}
          roleMemoChange={this.onRoleMemoChange}
          moduleIdChange={this.onRoleModuleIdChange}
          subModules={this.props.system.roleCfg.subModules}
          onSubmit={this.onAddRoleSubmit}
          modalTitle={this.state.modalTitle}
        />
        <ComfirmModal
          visiable={this.props.system.confirmVisiable}
          onSubmit={this.onComfirmSubmit}
          onCancel={this.onComfirmCancel}
        />

      </MayLayout>
    );
  }
}

function mapStateToProps({ system }) {
  return { system };
}

export default connect(mapStateToProps)(RoleConfig);

