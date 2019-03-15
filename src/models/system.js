/**
 * Created by Jason on 2018/1/16.
 */
import MD5 from 'crypto-js/md5';

import { isApiSuccess, apiData, cfShowApiFail, cfApiSuccess } from '../utils/utils';
import {
  getRoleList,
  getAllRoles,
  addRole,
  editRole,
  deleteRole,
  getAllModule,
  bindRoleModule,
  getRoleExceptInit,
  searchRolePower,
  getUserList,
  addUser,
  editUser,
  deleteUser,
  getGroupTree,
  getOrgunitById,
  modifyOrgunit,
  addSubOrgunit,
  deleteOrgunit,
  getParentByOrgId
} from '../services/system';

export default {
  namespace: 'system',
  state: {
    confirmVisiable: false,
    roleCfg: {
      getRoleParams: {
        pageSize: 15,
        pageNo: 1,
        roleId: ''
      },
      roleTableList: [],
      roleListPage: {
        total: 0,
        pageSize: 15,
        currentPage: 1
      },
      roleList: [],
      addRoleModalVisiable: false,
      modifyRole: {
        id: '',
        name: '',
        memo: '',
        moduleId: ''
      },
      deleteRole: {
        id: ''
      },
      moduleList: [],
      subModules: [],
      detailRoleModalVisiable: false
    },
    userCfg: {
      getUserParams: {
        pageSize: 10,
        pageNo: 1,
        roleId: '',
        orgunitId: '',
        name: ''
      },
      userListPage: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      },
      addUserModalVisiable: false,
      modifyUser: {
        id: '',
        name: '',
        loginName: '',
        password: '',
        phone: '',
        roleId: '',
        orgunitId: '',
        email: '',
        memo: ''
      },
      deleteUser: {
        type: 1,
        ids: ''
      }
    },
    powerCfg: {
      bindRoleModuleParams: {
        powerRoleId: '',
        moduleId: []
      },
      powerList: [],
      moduleList: []
    },
    groupCfg: {
      groupTree: [],
      dataList: [],
      parentList: [],
      orgunitMsg: {
        id: '',
        name: '',
        parentId: '',
        coordinate: '',
        memo: '',
        code: '',
        sort_num: ''
      },
      newSubOrgunitParams: {
        name: '',
        parentId: '',
        coordinate: '',
        memo: '',
        code: '',
        sort_num: ''
      },
      comfirmVisiable: false,
      isAddOrgunitShow: false
    }
  },
  sunscriptions: {

  },
  effects: {
    // 角色管理
    * getRoleList({ payload }, { put, call, select }) {
      const roleCfg = yield select(store => store.system.roleCfg);
      const { getRoleParams } = roleCfg;
      const response = yield call(getRoleList, getRoleParams);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            roleCfg: {
              ...roleCfg,
              roleTableList: result.list,
              roleListPage: result.page
            }
          }
        });
        yield put({ type: 'getAllRoles' });
      } else {
        cfShowApiFail(response);
      }
    },
    * roleGetAllModule({ payload }, { put, call, select }) {
      const roleCfg = yield select(store => store.system.roleCfg);
      let { subModules } = roleCfg;

      if (subModules.length > 0) {
        subModules = []
      }
      const response = yield call(getAllModule);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        for (let i = 0; i < result.length; i++) {
          subModules = subModules.concat(result[i].moduleList);
          yield put({
            type: 'success',
            payload: {
              roleCfg: {
                ...roleCfg,
                moduleList: result,
                subModules
              }
            }
          });
        }
      } else {
        cfShowApiFail(response);
      }
    },
    //角色配置
    * getAllRoles({ payload }, { put, call, select }) {
      const roleCfg = yield select(store => store.system.roleCfg);
      const response = yield call(getAllRoles);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            roleCfg: {
              ...roleCfg,
              roleList: result
            }
          }
        });
        yield put({ type: 'roleGetAllModule' });
      } else {
        cfShowApiFail(response);
      }
    },

    * addRole({ payload }, { put, call, select }) {
      const roleCfg = yield select(store => store.system.roleCfg);
      const { modifyRole } = roleCfg;
      const response = yield call(addRole, modifyRole);
      if (isApiSuccess(response)) {
        cfApiSuccess();
        yield put({ type: 'getRoleList' });
        yield put({
          type: 'success',
          payload: {
            roleCfg: {
              ...roleCfg,
              addRoleModalVisiable: false,
              modifyRole: {
                roleId: '',
                name: '',
                memo: '',
                moduleId: ''
              }
            }
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },

    * modifyRole({ payload }, { put, call, select }) {
      const roleCfg = yield select(store => store.system.roleCfg);
      const { modifyRole } = roleCfg;
      const response = yield call(editRole, modifyRole);
      if (isApiSuccess(response)) {
        cfApiSuccess();
        yield put({ type: 'getRoleList' });
        yield put({
          type: 'success',
          payload: {
            roleCfg: {
              ...roleCfg,
              addRoleModalVisiable: false,
              modifyRole: {
                roleId: '',
                name: '',
                memo: '',
                moduleId: ''
              }
            }
          }

        });
      } else {
        cfShowApiFail(response);
      }
    },
    * deleteRole({ payload }, { put, call, select }) {
      const roleCfg = yield select(store => store.system.roleCfg);
      const params = roleCfg.deleteRole;
      const response = yield call(deleteRole, params);
      if (isApiSuccess(response)) {
        cfApiSuccess();
        yield put({ type: 'getRoleList' });
        yield put({
          type: 'success',
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
      } else {
        cfShowApiFail(response);
      }
    },
    // 权限配置
    * getPowerRoles({ payload }, { put, call, select }) {
      const powerCfg = yield select(store => store.system.powerCfg);
      const response = yield call(getRoleExceptInit);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            powerCfg: {
              ...powerCfg,
              powerList: result
            }
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * getAllModule({ payload }, { put, call, select }) {
      const powerCfg = yield select(store => store.system.powerCfg);
      const response = yield call(getAllModule);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            powerCfg: {
              ...powerCfg,
              moduleList: result
            }
          }
        });
        yield put({ type: 'getPowerRoles' });
      } else {
        cfShowApiFail(response);
      }
    },
    * searchRolePower({ payload }, { call, put, select }) {
      const powerCfg = yield select(store => store.system.powerCfg);
      const { bindRoleModuleParams } = powerCfg;
      const response = yield call(searchRolePower, { roleId: bindRoleModuleParams.powerRoleId });
      if (isApiSuccess(response)) {
        const result = apiData(response);
        const moduleId = result && result.length > 0 ? result.map(item => item.moduleId) : [];
        const initModuleId = result && result.length > 0 ? result.filter(item => item.isHome === 1) : [];
        yield put({
          type: 'success',
          payload: {
            powerCfg: {
              ...powerCfg,
              bindRoleModuleParams: {
                ...bindRoleModuleParams,
                moduleId// TODO
              },
              initModuleId
            }
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * bindRoleModule({ payload }, { put, call, select }) {
      const powerCfg = yield select(store => store.system.powerCfg);
      const { bindRoleModuleParams, moduleList } = powerCfg;

      /* 从整体的modules里找到选中module的父节点Id,添加或删除 */
      moduleList.map((value, index) => {
        let flag = false;
        moduleList[index].moduleList.map(item => {
          if (bindRoleModuleParams.moduleId.indexOf(item.moduleId) !== -1) {
            flag = true;
            if (bindRoleModuleParams.moduleId.indexOf(moduleList[index].moduleId) === -1) {
              bindRoleModuleParams.moduleId.push(moduleList[index].moduleId);
            }
          }
          if (!flag) {
            if (bindRoleModuleParams.moduleId.indexOf(moduleList[index].moduleId) !== -1) {
              bindRoleModuleParams.moduleId.splice(bindRoleModuleParams.moduleId.indexOf(moduleList[index].moduleId), 1);
            }
          }
        });
      });
      const moduleIds = bindRoleModuleParams.moduleId.join(',');
      if (moduleIds === '') {
        return false;// modal 必须有一个默认模块
      }
      const response = yield call(bindRoleModule, {
        roleId: bindRoleModuleParams.powerRoleId,
        moduleIds
      });
      if (isApiSuccess(response)) {
        cfApiSuccess();
        const result = apiData(response);
      } else {
        cfShowApiFail(response);
      }
    },
    * rolePageTranslate({ payload }, { put, select }) {
      const { pageNo, pageSize } = payload;
      const roleCfg = yield select(store => store.system.roleCfg);
      const { getRoleParams } = roleCfg;
      yield put({
        type: 'success',
        payload: {
          roleCfg: {
            ...roleCfg,
            getRoleParams: {
              ...getRoleParams,
              pageSize,
              pageNo
            }
          }
        }
      });
      yield put({
        type: 'getRoleList'
      });
    },

    // 用户配置
    * getUserList({ payload }, { put, call, select }) {
      const userCfg = yield select(store => store.system.userCfg);
      const { getUserParams } = userCfg;
      const response = yield call(getUserList, getUserParams);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            userCfg: {
              ...userCfg,
              userTableList: result.list,
              userListPage: result.page
            }
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },

    * addUser({ payload }, { put, call, select }) {
      const userCfg = yield select(store => store.system.userCfg);
      const { modifyUser } = userCfg;
      let pwdMD5 = '';
      modifyUser.orgunitId -= 0;

      const { password } = modifyUser;
      if (password !== '') {
        pwdMD5 = MD5(password).toString();
      }
      const response = yield call(addUser, { ...modifyUser, password: pwdMD5 });
      if (isApiSuccess(response)) {
        cfApiSuccess();
        yield put({ type: 'getUserList' });
        yield put({
          type: 'success',
          payload: {
            userCfg: {
              ...userCfg,
              addUserModalVisiable: false,
              modifyUser: {
                id: '',
                name: '',
                loginName: '',
                password: '',
                phone: '',
                roleId: '',
                orgunitId: '',
                email: '',
                memo: ''
              }
            }
          }

        });
      } else {
        cfShowApiFail(response);
      }
    },
    * modifyUser({ payload }, { put, call, select }) {
      // const userCfg = yield select(store => store.system.userCfg);
      // const { modifyUser } = userCfg;
      // const { password } = modifyUser;
      // const pwdMD5 = MD5(password).toString();

      const userCfg = yield select(store => store.system.userCfg);
      const { modifyUser } = userCfg;
      let pwdMD5 = '';
      modifyUser.orgunitId -= 0;

      const { password } = modifyUser;
      if (password !== '') {
        pwdMD5 = MD5(password).toString();
      }
      const response = yield call(editUser, { ...modifyUser, password: pwdMD5 });
      if (isApiSuccess(response)) {
        cfApiSuccess();
        yield put({ type: 'getUserList' });
        yield put({
          type: 'success',
          payload: {
            userCfg: {
              ...userCfg,
              addUserModalVisiable: false,
              modifyUser: {
                id: '',
                name: '',
                loginName: '',
                password: '',
                phone: '',
                roleId: '',
                orgunitId: '',
                email: '',
                memo: ''
              }
            }
          }

        });
      } else {
        cfShowApiFail(response);
      }
    },
    * deleteUser({ payload }, { put, call, select }) {
      const userCfg = yield select(store => store.system.userCfg);
      const params = userCfg.deleteUser;
      const response = yield call(deleteUser, params);
      if (isApiSuccess(response)) {
        cfApiSuccess();
        yield put({ type: 'getUserList' });
        yield put({
          type: 'success',
          payload: {
            confirmVisiable: false,
            userCfg: {
              ...userCfg,
              deleteUser: {
                ...params,
                ids: ''
              }
            }
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * roleUserTranslate({ payload }, { put, select }) {
      const { pageNo, pageSize } = payload;
      const userCfg = yield select(store => store.system.userCfg);
      const { getUserParams } = userCfg;
      yield put({
        type: 'success',
        payload: {
          userCfg: {
            ...userCfg,
            getUserParams: {
              ...getUserParams,
              pageSize,
              pageNo
            }
          }
        }
      });
      yield put({
        type: 'getUserList'
      });
    },
    // 组织配置
    * getGroupTree({ payload }, { put, call, select }) {
      const groupCfg = yield select(store => store.system.groupCfg);
      const response = yield call(getGroupTree);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        const groupTree = [result];
        yield put({
          type: 'success',
          payload: {
            groupCfg: {
              ...groupCfg,
              groupTree
            }
          }
        });
        if (groupCfg.dataList.length < 1) {
          yield put({
            type: 'generateList',
            payload: { data: groupTree }
          });
        }
      } else {
        cfShowApiFail(response);
      }
    },
    * generateList({ payload }, { put, select }) {
      const groupCfg = yield select(store => store.system.groupCfg);
      const { dataList } = groupCfg;
      const { data } = payload;
      for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const key = node.id;
        const title = node.title;
        dataList.push({ key, title });
        if (node.children) {
          yield put({
            type: 'generateList',
            payload: {
              data: node.children
            }
          });
        }
      }
      yield put({
        type: 'success',
        payload: {
          groupCfg: {
            ...groupCfg,
            dataList
          }
        }
      });
    },
    * getOrgunitById({ payload }, { put, select, call }) {
      const { orgunitId } = payload;
      const groupCfg = yield select(store => store.system.groupCfg);
      const { orgunitMsg } = groupCfg;
      const response = yield call(getOrgunitById, { orgunitId });
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            groupCfg: {
              ...groupCfg,
              orgunitMsg: {
                ...orgunitMsg,
                id: result.orgunitId,
                name: result.orgunitName,
                parentId: result.parent_id,
                coordinate: result.coordinate,
                memo: result.memo,
                code: result.code,
                sort_num: result.sort_num
              }
            }
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * modifyOrgunit({ payload }, { put, select, call }) {
      // 检查必要参数是否为空 TODO
      const groupCfg = yield select(store => store.system.groupCfg);
      const params = groupCfg.orgunitMsg;
      const response = yield call(modifyOrgunit, params);
      if (isApiSuccess(response)) {
        cfApiSuccess();
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            groupCfg: {
              ...groupCfg,
              dataList: []
            }
          }
        });
        yield put({
          type: 'getGroupTree'
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * newOrgunit({ payload }, { put, select, call }) {
      // 检查必要参数是否为空 TODO
      const groupCfg = yield select(store => store.system.groupCfg);
      const params = groupCfg.newSubOrgunitParams;
      const response = yield call(addSubOrgunit, params);
      if (isApiSuccess(response)) {
        cfApiSuccess();
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            groupCfg: {
              ...groupCfg,
              dataList: [],
              isAddOrgunitShow: false
            }
          }
        });
        yield put({
          type: 'getGroupTree'
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * deleteOrgunit({ payload }, { put, select, call }) {
      // 检查必要参数是否为空 TODO
      const groupCfg = yield select(store => store.system.groupCfg);
      const { orgunitId } = payload;
      const response = yield call(deleteOrgunit, { id: orgunitId });
      if (isApiSuccess(response)) {
        cfApiSuccess();
        const result = apiData(response);
        yield put({
          type: 'getGroupTree'
        });
        yield put({
          type: 'success',
          payload: {
            groupCfg: {
              ...groupCfg,
              orgunitMsg: {
                id: '',
                name: '',
                parentId: '',
                coordinate: '',
                memo: '',
                code: '',
                sort_num: ''
              }
            }
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * getParentByOrgId({ payload }, { put, call, select }) {
      const groupCfg = yield select(store => store.system.groupCfg);
      const response = yield call(getParentByOrgId, { orgunitId: payload.id });
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            groupCfg: {
              ...groupCfg,
              parentList: result
            }
          }
        });
      } else {
        cfShowApiFail(response);
      }
    }
  },
  reducers: {
    success(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
