import MD5 from 'crypto-js/md5';
/**
 * Created by Ethan on 2018/3/7.
 */
import { getLogList } from '../services/personal';
import { isApiSuccess, apiData, cfShowApiFail, cfApiSuccess } from '../utils/utils';
import { getGroupTree, getAllRoles, getAllModule, editUser } from '../services/system';

export default {
  namespace: 'personal',
  state: {
    logRecord: {
      getLogListParams: {
        pageSize: 15,
        pageNo: 1,
        userName: '',
        modelId: '',
        orgunitId: '',
        roleId: '',
        startTime: '',
        endTime: ''
      },
      logList: [],
      logPage: {
        pageSize: 15,
        pageNo: 1,
        total: 0
      }
    },
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
    groupTree: [],
    roleList: [],
    moduleList: []
  },
  effects: {
    * logList({ payload }, { put, call, select }) {
      const logRecord = yield select(store => store.personal.logRecord);
      const { getLogListParams } = logRecord;
      const response = yield call(getLogList, getLogListParams);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            logRecord: {
              ...logRecord,
              logList: result.list,
              logPage: result.page
            }
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * logListTranslate({ payload }, { put, select }) {
      const { pageNo, pageSize } = payload;
      const logRecord = yield select(store => store.personal.logRecord);
      const { getLogListParams } = logRecord;
      yield put({
        type: 'success',
        payload: {
          logRecord: {
            ...logRecord,
            getLogListParams: {
              ...getLogListParams,
              pageSize,
              pageNo
            }
          }
        }
      });
      yield put({
        type: 'logList'
      });
    },
    * getGroupTree({ payload }, { put, call }) {
      const response = yield call(getGroupTree);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        const groupTree = [result];
        yield put({
          type: 'success',
          payload: {
            groupTree
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * getAllRoles({ payload }, { put, call }) {
      const response = yield call(getAllRoles);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            roleList: result
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * getAllModule({ payload }, { put, call, select }) {
      const response = yield call(getAllModule);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            moduleList: result
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * getUserMsg({ payload }, { put, call, select }) {
      const delay = timeout => {
        return new Promise(resolve => {
          setTimeout(resolve, timeout);
        });
      };
      yield call(delay, 100);
      const userMsg = yield select(store => store.navigation.userMsg);
      yield put({
        type: 'success',
        payload: {
          modifyUser: userMsg
        }
      });
    },
    * modifyUser({ payload }, { put, call, select }) {
      const modifyUser = yield select(store => store.personal.modifyUser);
      delete modifyUser.password;
      const response = yield call(editUser, modifyUser);
      if (isApiSuccess(response)) {
        cfApiSuccess();
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
