/**
 * Created by Jason on 2018/2/5.
 */

import { getIshomeModuleByRid } from '../services/index';
import { getRoleByUserName } from '../services/navigation';
import { isApiSuccess, apiData, cfShowApiFail } from '../utils/utils';

export default {
  namespace: 'index',
  state: {
    initModule: {},
    stateShow: false
  },
  sunscriptions: {
    // setup({ dispatch, history }) {
    //   return history.listen(({ pathname }) => {
    //     if (pathname === '/realMonitoring' || pathname === '/historyPass' || pathname === '/historyPolice' || pathname === '/realPolice') {
    //       dispatch({type: 'showFlowState'});
    //     } else {
    //       dispatch({type: 'hideFlowState'});
    //     }
    //   });
    // }
  },
  effects: {
    * showFlowState({payload}, {put}) {
      yield put({
        type: 'success',
        payload: {
          stateShow: true
        }
      });
    },
    * hideFlowState({payload}, {put}) {
      yield put({
        type: 'success',
        payload: {
          stateShow: false
        }
      });
    },
    * getIshomeModuleByRid({payload}, {put, call}) {
        // const regParent = new RegExp('(^| )parentId=([^;]*)(;|$)');
      const regName = new RegExp('(^| )cf_uname=([^;]*)(;|$)');
        // const parentId = document.cookie.match(regParent)[2];
      const userName = document.cookie.match(regName)[2];
      const roleId = yield call(getRoleByUserName, { userName });
      if (isApiSuccess(roleId)) {
        const data = apiData(roleId);
        const response = yield call(getIshomeModuleByRid, {roleId: data.roleId});
        if (isApiSuccess(response)) {
          const result = apiData(response);
          yield put({
            type: 'success',
            payload: {
              initModule: result
            }
          });
            // 将parentId存在cookie中，用于生成侧边栏
          document.cookie = `parentId=${result.parentId}`;
        } else {
          cfShowApiFail(response);
        }
      }
    }

  },
  reducers: {
    success(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
