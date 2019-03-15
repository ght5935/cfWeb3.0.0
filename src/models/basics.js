/**
 * Created by Ethan on 2018/2/1.
 */
import {
  historyPassList,
  gitALLCamreaList,
  deleteTakeImgs,
  bindFacetrackApi,
  addByFacetrack,
  getAlarmList,
  getMatchpoi,
  getCategoryTree
} from '../services/basics';
import { getAllGroups } from '../services/bussiness';
import { getGroupTree } from '../services/system';
import { isApiSuccess, apiData, cfShowApiFail, cfApiSuccess, delay } from '../utils/utils';

export default {
  namespace: 'basics',
  state: {
    historyPass: {
      getPassListParams: {
        pageSize: 16,
        pageNo: 1,
        // cmOrgunitId: '',
        orgunitId: '',
        cameraGroupId: '',
        srcIds: [],
        startTime: '',
        endTime: '',
        startPercent: 0,
        endPercent: 100,
        name: '',
        idCard: '',
        gender: '',
        age: '',
        isglasses: '',
        ismoustache: '',
        ishat: ''
      },
      facetrackList: [],
      facetrackPage: {
        pageSize: 16,
        pageNo: 1,
        total: 0
      },
      matchPoiListData: [],
      judgePersonData: {}
    },
    historyPolice: {
      takeImgModal: false,
      getAlarmListParams: {
        pageSize: 10,
        pageNo: 1,
        orgunitId: '',
        srcIds: [],
        startTime: '',
        endTime: '',
        startPercent: 0,
        endPercent: 100,
        name: '',
        idCard: '',
        gender: '',
        age: '',
        isglasses: '',
        ismoustache: '',
        ishat: '',
        cameraGroupId: ''
      },
      alarmList: [],
      alarmPage: {
        pageSize: 10,
        pageNo: 1,
        total: 0
      },
      personData: {},
      takeImgData: {}
    },
    detailsModal: false,
    addTargetModal: false,
    detailsModalData: {},
    checkTakeImgs: [],
    originImgs: [],
    bindFacetrack: {
      facetrackId: '',
      personId: ''
    },
    newFacetrack: {
      facetrackId: '',
      name: '',
      gender: '',
      threshold: '',
      groupId: '',
      orgunitId: '',
      identityCard: ''
    },
    dataList: [],
    groupTree: [],
    groupTrees: [],
    allGroups: [],
    camreaAll: [],
    categoryTree: [],//摄像头分组树
    userMsg: {}

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const path = ['/', '/historyPolice', '/historyPass', '/realMonitoring'];
        if (path.indexOf(pathname) !== -1) {
          dispatch({ type: 'getUserMsg', payload: { pathname } });
        }
      });
    }
  },
  effects: {
    * historyPassList({ payload }, { put, call, select }) {
      const historyPass = yield select(store => store.basics.historyPass);
      const { getPassListParams } = historyPass;

      let { srcIds } = getPassListParams;
      if (srcIds.length > 0) {
        srcIds = srcIds.filter(v => {
          return typeof v !== 'number';
        });
        if (srcIds.length > 0) {
          srcIds = srcIds.join(',')
        } else {
          srcIds = '-1'
        }
      }
      yield call(delay, 500)
      const response = yield call(historyPassList, { ...getPassListParams, srcIds });
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            historyPass: {
              ...historyPass,
              facetrackList: result.list,
              facetrackPage: result.page
            }
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * passListTranslate({ payload }, { put, select, call }) {
      const { pageNo, pageSize } = payload;
      const historyPass = yield select(store => store.basics.historyPass);
      const { getPassListParams } = historyPass;
      yield put({
        type: 'success',
        payload: {
          historyPass: {
            ...historyPass,
            getPassListParams: {
              ...getPassListParams,
              pageSize,
              pageNo
            },
            facetrackList: []
          }
        }
      });
      yield call(delay, 500)
      yield put({
        type: 'historyPassList'
      });
    },
    * getGroupTrees({ payload }, { put, call }) {
      const response = yield call(getGroupTree);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        const groupTrees = [result];
        yield put({
          type: 'success',
          payload: {
            groupTrees
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * getAllGroups({ payload }, { call, put, select }) {
      const newFacetrack = yield select(store => store.basics.newFacetrack);
      const response = yield call(getAllGroups);
      let resultarr = [];
      if (isApiSuccess(response)) {
        const result = apiData(response);
        result.map(v => {
          if(v.orgunitId == newFacetrack.orgunitId){
            resultarr.push(v)
          }else if(!newFacetrack.orgunitId){
            resultarr = result
          }
        })
        yield put({
          type: 'success',
          payload: {
            allGroups: resultarr
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },

    * gitALLCamreaList({ payload }, { put, call }) {
      const response = yield call(gitALLCamreaList);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            camreaAll: result
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * deleteTakeImgs({ payload }, { put, call, select }) {
      const checkTakeImgs = yield select(store => store.basics.checkTakeImgs);
      const checkTakeImgsString = checkTakeImgs.join(',');
      const detailsModalData = yield select(store => store.basics.detailsModalData);
      const originImgs = yield select(store => store.basics.originImgs);
      const { code } = detailsModalData;
      const response = yield call(deleteTakeImgs, { imgNames: checkTakeImgsString, facetrackId: code });
      // 更新detailsModalData数据
      const { imgs } = detailsModalData;
      originImgs.map(value => {
        const index = imgs.indexOf(value);
        imgs.splice(index, 1);
      });
      if (isApiSuccess(response)) {
        yield put({ type: 'historyPassList' });
        const result = apiData(response);
        cfApiSuccess();
        yield put({
          type: 'success',
          payload: {
            checkTakeImgs: '',
            detailsModalData: {
              ...detailsModalData,
              imgs
            },
            originImgs: []
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * bindFacetrack({ payload }, { put, call, select }) {
      const bindFacetrack = yield select(store => store.basics.bindFacetrack);
      const response = yield call(bindFacetrackApi, bindFacetrack);

      if (isApiSuccess(response)) {
        const result = apiData(response);
        cfApiSuccess();
        yield put({
          type: 'success',
          payload: {
            bindFacetrack: {
              facetrackId: '',
              personId: '',

            },
            checkTakeImgs: []
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * addFacetrack({ payload }, { put, call, select }) {
      const newFacetrack = yield select(store => store.basics.newFacetrack);
      const detailsModalData = yield select(store => store.basics.detailsModalData);
      const { code } = detailsModalData;
      const response = yield call(addByFacetrack, { ...newFacetrack, facetrackId: code });
      if (isApiSuccess(response)) {
        cfApiSuccess();
        yield put({
          type: 'success',
          payload: {
            addTargetModal: false,
            newFacetrack: {
              facetrackId: '',
              name: '',
              gender: '',
              threshold: '',
              groupId: '',
              orgunitId: '',
              identityCard: ''
            }
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * getAlarmList({ payload }, { put, call, select }) {
      const historyPolice = yield select(store => store.basics.historyPolice);
      const { getAlarmListParams } = historyPolice;
      let { srcIds } = getAlarmListParams
      if (srcIds.length > 0) {
        srcIds = srcIds.filter(v => {
          return typeof v !== 'number';
        });
        if (srcIds.length > 0) {
          srcIds = srcIds.join(',')
        } else {
          srcIds = '-1'
        }
      }

      const response = yield call(getAlarmList, { ...getAlarmListParams, srcIds });
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            historyPolice: {
              ...historyPolice,
              alarmList: result.list,
              alarmPage: result.page
            }
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * alarmListTranslate({ payload }, { put, select }) {
      const { pageNo, pageSize } = payload;
      const historyPolice = yield select(store => store.basics.historyPolice);
      const { getAlarmListParams } = historyPolice;
      yield put({
        type: 'success',
        payload: {
          historyPolice: {
            ...historyPolice,
            getAlarmListParams: {
              ...getAlarmListParams,
              pageSize,
              pageNo
            }
          }
        }
      });
      yield put({
        type: 'getAlarmList'
      });
    },
    * getCategoryTree({ payload }, { put, call, select }) {

      const orgunitId = yield select(store => store.basics.userMsg.orgunitId);
      const params = yield select(store => store.basics.historyPolice.getAlarmListParams);
      if (!params.orgunitId) {
        params.orgunitId = orgunitId;
      }
      if (payload && payload.orgunitId) {
        params.orgunitId = orgunitId;
      }
      const response = yield call(getCategoryTree, { orgunitId: params.orgunitId });

      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            categoryTree: result
          }
        })
      }
    },
    * getPassCategoryTree({ payload }, { put, call, select }) {

      const orgunitId = yield select(store => store.basics.userMsg.orgunitId);
      const params = yield select(store => store.basics.historyPass.getPassListParams);
      if (!params.orgunitId) {
        params.orgunitId = orgunitId;
      }
      if (payload && payload.orgunitId) {
        params.orgunitId = orgunitId;
      }
      const response = yield call(getCategoryTree, { orgunitId: params.orgunitId });

      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            categoryTree: result
          }
        })
      }
    },
    * getUserMsg({ payload }, { put, call, select }) {
      yield call(delay, 500);
      const userMsg = yield select(store => store.navigation.userMsg);
      yield put({
        type: 'success',
        payload: {
          userMsg
        }
      });
      if (payload.pathname === '/historyPolice') {
        yield put({
          type: 'getCategoryTree',
          payload: {
            orgunitId: ''
          }
        })
      } else if (payload.pathname === '/historyPass') {
        yield put({
          type: 'getPassCategoryTree',
          payload: {
            orgunitId: ''
          }
        })
      } else {
        yield put({
          type: 'getGroupTree'
        })
      }
    },
    * getGroupTree({ payload }, { put, call, select }) {
      let orgunitId = yield select(store => store.basics.userMsg.orgunitId);
      if (!orgunitId) {
        yield call(delay, 1000);
        orgunitId = yield select(store => store.basics.userMsg.orgunitId);
      }
      const { dataList } = yield select(store => store.basics);
      const response = yield call(getCategoryTree, { orgunitId });

      if (isApiSuccess(response)) {
        const result = apiData(response);
        const groupTree = result;
        yield put({
          type: 'success',
          payload: {
            groupTree
          }
        })

        if (dataList.length < 1) {
          yield put({
            type: 'generateList',
            payload: { data: [groupTree, null] }
          });
        }
      } else {
        // cfShowApiFail(response);
      }
    },
    * generateList({ payload }, { put, select }) {
      const groupCfg = yield select(store => store.system.groupCfg);

      const { dataList } = groupCfg;
      const { data } = payload;
      for (let i = 0; i < data[0].length; i++) {
        const node = data[0][i];
        const key = node.cameraCategory ? node.cameraCategory.id : node.srcId;
        const title = node.cameraCategory ? node.cameraCategory.name : node.name;
        const parent = data[1];
        dataList.push({ key, title, parent });
        if (node.children) {
          yield put({
            type: 'generateList',
            payload: {
              data: [node.children, node.cameraCategory.id]
            }
          });
        }
        if (node.cameras) {
          yield put({
            type: 'generateList',
            payload: {
              data: [node.cameras, node.cameraCategory.id]
            }
          });
        }
      }
      yield put({
        type: 'success',
        payload: {
          dataList
        }
      });
    },


  },
  reducers: {
    success(state, action) {
      return { ...state, ...action.payload };
    },
    getcameraList(state, action) {
      const oriArr = action.payload.orgunitByRole;
      let camreaAll = [];
      function getcamera(data) {
        if (data.length > 0) {
          data.map((v, i) => {
            if (v.children) {
              getcamera(v.children)
            } else {
              if (v.cameras)
                camreaAll = camreaAll.concat(v.cameras)
            }
          })
        }
      }
      getcamera(oriArr)
      return { ...state, camreaAll }
    }
  }
};
