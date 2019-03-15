/**
 * Created by Ethan on 2018/1/9.
 */
import { routerRedux } from 'dva/router';

import { isApiSuccess, apiData, cfShowApiFail } from '../utils/utils';
import { navList, getSubModule, getRoleByUserName, getUserMsg } from '../services/navigation';

export default {
  namespace: 'navigation',
  state: {
    navlist: [],
    navItem: [],
    userMsg: {
      name: '',
      orgunitId: ''
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        dispatch({ type: 'permissions', payload: { pathname } });
      });
    },
    setFlow({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const path = ['/', '/realMonitoring', '/historyPass', '/historyPolice', '/realPolice'];
        if (path.indexOf(pathname) !== -1) {
          dispatch({ type: 'showFlowState' });
        } else {
          dispatch({ type: 'hideFlowState' });
        }
      });
    },
    getUserNameSub({ dispatch, history }) {
      return history.listen(({ pathname }) => {

        dispatch({type: 'getUserName'});
      });
    }
  },
  effects: {
    * getUserName({ payload }, { put, call }) {
      const response = yield call(getUserMsg);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            userMsg: result
          }
        });
      } else {
        // cfShowApiFail(response);
      }
    },
    * showFlowState({ payload }, { put }) {
      yield put({
        type: 'success',
        payload: {
          stateShow: true
        }
      });
    },
    * hideFlowState({ payload }, { put }) {
      yield put({
        type: 'success',
        payload: {
          stateShow: false
        }
      });
    },
    * navList({ payload }, { put, call }) {
      const response = yield call(navList);
      let tmpSubArray = [];
      if (isApiSuccess(response)) {
        const result = apiData(response);
        result.map(v => {
          v.subNavigationDataList.map(value => {
            tmpSubArray.push(value);
          })
        })
        yield put({
          type: 'success',
          payload: {
            navlist: result,
            navItem: tmpSubArray
          }
        });
      }
    },
    * permissions({ payload }, { put, call, select }) {
      const navlist = yield select(store => store.navigation.navlist);
      const { pathname } = payload;
      const path = pathname.substring(1);
      const permissList = [];
      if (navlist.length === 0) {
        yield put({ type: 'navList' });
        return false;
      }
      // 递归出所有的模块， 与路由匹配
      navlist.map(value => value.subNavigationDataList.filter(item => {
        if (path === item.url) { permissList.push(path); }
      }));
      if (path === 'nav') { return false; }
      if (permissList.length === 0) {
        // yield put(routerRedux.goBack());
        // alert('您当前权限无法访问此页面，请于管理员联系！');
        return false;
      }
      return false;
    },
    * getSubModule({ payload }, { put, call, select }) {
      const regParent = new RegExp('(^| )parentId=([^;]*)(;|$)');
      const regName = new RegExp('(^| )cf_uname=([^;]*)(;|$)');
      const parentId = document.cookie.match(regParent)[2];
      const userName = document.cookie.match(regName)[2];
      const roleId = yield call(getRoleByUserName, { userName });
      if (isApiSuccess(roleId)) {
        const data = apiData(roleId);
        const response = yield call(getSubModule, { roleId: data.roleId, parentId });
        if (isApiSuccess(response)) {
          const result = apiData(response);
          yield put({
            type: 'success',
            payload: {
              navItem: result
            }
          });
        } else {
          cfShowApiFail(response);
        }

      } else {
        cfShowApiFail(roleId);
      }
    }
  },
  reducers: {
    success(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
