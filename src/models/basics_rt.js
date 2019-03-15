/**
 * Created by Jason on 2018/2/28.
 */
import { getInitPassList, getInitAlarmList, getIntFaceList } from '../services/basics';
import { watchList } from '../services/webSocket';
import { isApiSuccess, apiData, cfShowApiFail } from '../utils/utils';
import { WEBSOCKET_URL } from '../utils/config';

export default {
  namespace: 'basics_rt',
  state: {
    passList: [],
    alarmList: [],
    currentList: [],
    faceList: [],
    stat: {
      todayAlarm: 0,
      todayFace: 0,
      totalAlarm: 0,
      totalFace: 0
    },
    orgunitId: 1,
    VLC: ['', '', '', ''],
    srcNames: ['无视频', '无视频', '无视频', '无视频']
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const path = ['/', '/realMonitoring', '/realPolice', '/historyPass', '/historyPolice'];
        if (path.indexOf(pathname) !== -1) {
          dispatch({ type: 'serverOpen', payload: { dispatch } });
        }
      });
    }
  },
  effects: {
    * serverOpen({ payload }, { call, select }) {
      const delay = timeout => {
        return new Promise(resolve => {
          setTimeout(resolve, timeout);
        });
      };
      yield call(delay, 1000);
      const userMsg = yield select(store => store.navigation.userMsg);
      const config = { url: WEBSOCKET_URL, namespace: `org_${userMsg.orgunitId}` };
      watchList(config, data => {
        payload.dispatch({ type: 'socketMsg', payload: { data } });
      });
      // yield call(watchList, config);

    },
    * socketMsg({ payload }, { put, select }) {
      let { currentList, faceList, alarmList } = yield select(store => store.basics_rt);
      const { data } = payload;
      console.log(data)
      if (!data.faceTrackList) {
        yield put({
          type: 'getInitAlarmList'
        });
        yield put({
          type: 'getIntFaceList'
        })
      }

      const wsAlarmList = data.faceTrackList ? data.faceTrackList.filter(value => value.alarmed === true) : [];
      const weFaceList = data.faceTrackList ? data.faceTrackList : [];
      alarmList = wsAlarmList.concat(alarmList).slice(0, 12);// 报警记录截取12条
      faceList = weFaceList.concat(faceList).slice(0, 21);
      currentList = faceList[0]
      yield put({
        type: 'success',
        payload: {
          // passList,
          alarmList,
          currentList,
          faceList,
          stat: data.stat
        }
      });
    },
    * getInitPassList({ payload }, { put, call, select }) {
      let passList = yield select(store => store.basics_rt.passList);
      const response = yield call(getInitPassList, { pageSize: 12, pageNo: 1 });
      if (isApiSuccess(response)) {
        const result = apiData(response);
        if (result.list) {
          passList = passList.concat(result.list).slice(0, 12);
        }
        yield put({
          type: 'success',
          payload: {
            passList
          }
        });
      }
    },
    * getInitAlarmList({ payload }, { put, call, select }) {
      let alarmList = yield select(store => store.basics_rt.alarmList);
      const response = yield call(getInitAlarmList, { pageSize: 12, pageNo: 1 });
      if (isApiSuccess(response)) {
        const result = apiData(response);
        if (result.list) {
          alarmList = alarmList.concat(result.list).slice(0, 12);
        }
        yield put({
          type: 'success',
          payload: {
            alarmList
          }
        });
      }
    },

    * getIntFaceList({ payload }, { put, call, select }) {
      let faceList = [];
      const response = yield call(getIntFaceList, { pageSize: 21, pageNo: 1 });
      if (isApiSuccess(response)) {
        const result = apiData(response);
        if (result.list) {
          faceList = faceList.concat(result.list)
        }
        yield put({
          type: 'success',
          payload: {
            faceList,
            currentList: faceList[0]
          }
        });
      }
    },

  },
  reducers: {
    success(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
