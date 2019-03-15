/**
 * Created by Ethan on 2018/2/28.
 */
import {
  createFacetrackByImg,
  matchFacetrackToFacetrack,
  getMatchFaceToFaceResult,
  gitALLCamreaList,
  matchFacetrackToPerson,
  getMatchFaceToPoiResult,
  getOrgPersonGroup,
  // getAlarmTypeData,
  // getCultData,
  // getMonthTypeData,
  getGroupCaptureDataList,
  getCaptureData,
  getCameraData,
  getTimeTypeCaptureData,
  addPicture,
  downLoadExcel,
  match2images
} from '../services/expand';
import { getCategoryTree } from '../services/basics';
import { getGroupTree } from '../services/system';
import { isApiSuccess, apiData, cfShowApiFail, cfApiSuccess } from '../utils/utils';
import { message } from 'antd';

export default {
  namespace: 'expand',
  state: {
    faceToPoi: {
      createFtParams: {
        faceCount: 1,
        img_path_1: '',
        srcIds: [],
        type: 0
      },
      ftToFtParams: {
        size: 0,
        srcIds: [],
        threshold: 60,
        startTime: '',
        endTime: ''
      },
      matchFtParams: {
        transId: '',
        appkey: '',
        faceId: '',
        appurl: ''
      },
      matchFaceList: [],
      takeImgModal: false,
      takeImgData: {},
      ftProcess: false,
      orgunitId: ''
    },
    poiToFace: {
      isShowVisible: false,
      showTakeImg: {},
      originUpImg: [],
      selectImg: [],
      personId: '',
      faceList: [],
      createFtParams: {
        faceCount: 1,
        img_path_1: '',
        srcIds: '',
        type: 1
      },
      ftToPoiParams: {
        alarmThreshold: 60,
        groupIds: ''
      },
      matchPoiParams: {
        transId: '',
        appkey: '',
        faceId: '',
        appurl: '',
      },
      matchPersonList: [],
      targetGroups: [],
      poiProcess: false
    },
    staticData: {
      alarmTypeData: [],
      cultData: [],
      monthTypeData: {
        alarm_1: [],
        alarm_2: [],
        alarm_3: [],
        alarm_4: [],
        alarm_5: [],
        alarm_6: []
      },
      monthTypeTable: [
        { name: '', data: [{ alarmReason: 1 }] },
        { name: '', data: [{ alarmReason: 2 }] },
        { name: '', data: [{ alarmReason: 3 }] },
        { name: '', data: [{ alarmReason: 4 }] }],
      alarmList: [],
      getAlarmListParams: {
        alarmReason: 0,
        pageSize: 20,
        pageNo: 1,
        name: '',
        idCard: '',
        startTime: '',
        endTime: '',
        gender: ''
      },
      listPage: {
        pageSize: 20,
        currentPage: 1,
        total: 0
      }
    },
    isFirst: true,
    categoryTree: [],
    btnLoading: false,
    match2ImageParams: {
      img_path_1: '',
      img_path_2: ''
    },
    percent: 0,
    groupTrees: []
  },
  effects: {
    * getGroupTrees({ payload }, { put, call }) {
      const response = yield call(getGroupTree);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        const groupTrees = [result];
        // yield put({
        //   type: 'getcameraList',
        //   payload: {
        //     orgunitByRole: groupTrees
        //   }
        // })

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
    * getCategoryTree({ payload }, { put, call, select }) {

      const orgunitId = yield select(store => store.basics.userMsg.orgunitId);
      const params = yield select(store => store.expand.faceToPoi);
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
    * createFaceTrack({ payload }, { put, call, select }) {
      const faceToPoi = yield select(store => store.expand.faceToPoi);
      const params = faceToPoi.createFtParams;
      const ftToFtParams = faceToPoi.ftToFtParams;
      let { srcIds } = params;
      srcIds = srcIds.join(',');
      const response = yield call(createFacetrackByImg, { ...params, srcIds });
      if (isApiSuccess(response)) {
        const result = apiData(response);

        let collectParams = '';
        if (result.length === 1) {
          collectParams += `{"data": [{"appkey_1":"${result[0].appkey}"` + ',' + `"face_1":"${result[0].facetrackId}"` + ',' + `"appurl_1":"${result[0].appurl}"}]}`;
        } else {
          result.map((v, i) => {
            if (i === 0) {
              collectParams += `{"data": [{"appkey_${i + 1}":"${v.appkey}"` + ',' + `"face_${i + 1}":"${v.facetrackId}"` + ',' + `"appurl_${i + 1}":"${v.appurl}",`;
            } else if (i === result.length - 1) {
              collectParams += `"appkey_${i + 1}":"${v.appkey}"` + ',' + `"face_${i + 1}":"${v.facetrackId}"` + ',' + `"appurl_${i + 1}":"${v.appurl}"}]}`;
            } else {
              collectParams += `"appkey_${i + 1}":"${v.appkey}"` + ',' + `"face_${i + 1}":"${v.facetrackId}"` + ',' + `"appurl_${i + 1}":"${v.appurl}",`;
            }
          });
        }
        collectParams = eval(`(${collectParams})`);
        yield put({
          type: 'success',
          payload: {
            faceToPoi: {
              ...faceToPoi,
              ftToFtParams: {
                ...ftToFtParams,
                ...collectParams.data[0],
                size: result.length
              }
            }
          }
        });
        yield put({
          type: 'ftMatchFt'
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * ftMatchFt({ payload }, { put, call, select }) { // 111111111111111111111
      const faceToPoi = yield select(store => store.expand.faceToPoi);
      const params = faceToPoi.ftToFtParams;
      let { srcIds } = params;
      srcIds = srcIds.join(',');
      const response = yield call(matchFacetrackToFacetrack, { ...params, srcIds });
      if (isApiSuccess(response)) {
        const result = apiData(response);
        for (let i = 0; i < result.length; i++) {
          yield put({
            type: 'matchFacetrack',
            payload: {
              transId: result[i].transId,
              faceId: result[i].facetrackId,
              appkey: result[i].appkey,
              appurl: result[i].appurl
            }
          });
        }
        yield put({
          type: 'success',
          payload: {
            faceToPoi: {
              ...faceToPoi,
              matchFaceList: []
            }
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * matchFacetrack({ payload }, { put, call, select }) {
      const faceToPoi = yield select(store => store.expand.faceToPoi);
      let { processed } = faceToPoi;
      const delay = timeout => {
        return new Promise(resolve => {
          setTimeout(resolve, timeout);
        });
      };
      while (!processed) {
        yield call(delay, 100);
        processed = yield select(store => store.expand.faceToPoi.ftProcess);
        if (!processed) {
          const response = yield call(getMatchFaceToFaceResult, payload);
          if (isApiSuccess(response)) {
            const result = apiData(response);
            if(result.list){
              result.list.sort(function (a, b) {
                return a.captureTime > b.captureTime ? 1 : -1;
              })
            }
            yield put({
              type: 'success',
              payload: {
                faceToPoi: {
                  ...faceToPoi,
                  matchFaceList: result.list,
                  ftProcess: result.processed
                }
              }
            });
          } else {
            cfShowApiFail(response);
          }
        }
      }
    },
    * gitALLCamreaList({ payload }, { put, call, select }) {
      const response = yield call(gitALLCamreaList);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            cameraList: result ? result : []
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * createFaceTrack2({ payload }, { put, call, select }) {
      const poiToFace = yield select(store => store.expand.poiToFace);
      const params = poiToFace.createFtParams;
      // const ftToPoiParams = poiToFace.ftToPoiParams;
      const response = yield call(createFacetrackByImg, params);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'ftMatchPerson',
          payload: {
            appkey: result[0].appkey,
            facetrackId: result[0].facetrackId,
            appurl: result[0].appurl
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * ftMatchPerson({ payload }, { put, call, select }) {
      const poiToFace = yield select(store => store.expand.poiToFace);
      const params = poiToFace.ftToPoiParams;

      if (String(params.groupIds).indexOf('-') == -1) {
        params.groupIds = params.groupIds
      } else {
        params.groupIds = params.groupIds.split('-')[1]

      }
      const response = yield call(matchFacetrackToPerson, { ...payload, ...params });
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'matchPerson',
          payload: {
            transId: result,
            facetrackId: payload.facetrackId,
            appkey: payload.appkey,
            appurl: payload.appurl,
            ...params
          }
        });
        yield put({
          type: 'success',
          payload: {
            poiToFace: {
              ...poiToFace,
              matchPersonList: []
            }
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * matchPerson({ payload }, { put, call, select }) {
      const poiToFace = yield select(store => store.expand.poiToFace);
      let processed = yield select(store => store.expand.poiToFace.poiProcess);
      const delay = timeout => {
        return new Promise(resolve => {
          setTimeout(resolve, timeout);
        });
      };
      while (!processed) {
        yield call(delay, 100);
        processed = yield select(store => store.expand.poiToFace.poiProcess);
        if (!processed) {
          const response = yield call(getMatchFaceToPoiResult, payload);
          if (isApiSuccess(response)) {
            const result = apiData(response);
            yield put({
              type: 'success',
              payload: {
                poiToFace: {
                  ...poiToFace,
                  matchPersonList: result.list,
                  poiProcess: result.processed
                }
              }
            });
          } else {
            cfShowApiFail(response);
          }
        }
      }
    },
    * getTargetGroups({ payload }, { call, put, select }) {
      const poiToFace = yield select(store => store.expand.poiToFace);
      // let orgunitId = yield select(store => store.bussiness.getPgParam.orgunitId);
      // if (!orgunitId) {
      //   orgunitId = yield select(store => store.navigation.userMsg.orgunitId);
      // }
      const response = yield call(getOrgPersonGroup, { orgunitId: 1 });
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            poiToFace: {
              ...poiToFace,
              targetGroups: [result] || []
            }
          }
        })
      } else {

      }
    },
    // * getAlarmTypeData({ payload }, { put, call }) {
    //   const response = yield call(getAlarmTypeData);
    //   if (isApiSuccess(response)) {
    //     const result = apiData(response);
    //     yield put({
    //       type: 'changeAlarmTypeData',
    //       payload: {
    //         result
    //       }
    //     });
    //   } else {
    //     cfShowApiFail(response);
    //   }
    // },
    // 数据统计
    * getCaptureData({ payload }, { put, call }) {
      const response = yield call(getCaptureData);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'changeCaptureData',
          payload: {
            result
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },

    // * getCultData({ payload }, { put, call }) {
    //   const response = yield call(getCultData);
    //   if (isApiSuccess(response)) {
    //     const result = apiData(response);
    //     yield put({
    //       type: 'changeCultData',
    //       payload: {
    //         result
    //       }
    //     });
    //   } else {
    //     cfShowApiFail(response);
    //   }
    // },
    * getCameraData({ payload }, { put, call }) {
      const response = yield call(getCameraData);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'changeCameraData',
          payload: {
            result
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    // * getMonthTypeData({ payload }, { put, call, select }) {
    //   const response = yield call(getMonthTypeData, payload);
    //   if (isApiSuccess(response)) {
    //     const result = apiData(response);
    //     yield put({
    //       type: 'changeMonthTypeData',
    //       payload: {
    //         result
    //       }
    //     });
    //   } else {
    //     cfShowApiFail(response);
    //   }
    // },
    * getTimeTypeCaptureData({ payload }, { put, call, select }) {
      const response = yield call(getTimeTypeCaptureData, payload);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'changeMonthTypeData',
          payload: {
            result
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * alarmListTranslate({ payload }, { put, select }) {
      const { pageNo, pageSize } = payload;
      const staticData = yield select(store => store.expand.staticData);
      const { getAlarmListParams } = staticData;
      yield put({
        type: 'success',
        payload: {
          staticData: {
            ...staticData,
            getAlarmListParams: {
              ...getAlarmListParams,
              pageSize,
              pageNo
            }
          }
        }
      });
      yield put({
        type: 'getInitAlarmList'
      });
    },
    * getInitAlarmList({ payload }, { put, call, select }) {
      const staticData = yield select(store => store.expand.staticData);
      const { getAlarmListParams } = staticData;
      const response = yield call(getGroupCaptureDataList, getAlarmListParams);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            staticData: {
              ...staticData,
              alarmList: result.list,
              listPage: result.page
            }

          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * addPicture({ payload }, { put, call, select }) {
      const poiToFace = yield select(store => store.expand.poiToFace);
      const { selectImg, personId, originUpImg } = poiToFace;
      let collectParams = {};
      let originImgParams = {}
      selectImg.map((v, i) => {
        collectParams[`img_path_${i + 1}`] = v;
      })
      originUpImg.map((v, i) => {
        originImgParams[`originImg_path_${i + 1}`] = v;
      })
      let params = {
        personId: personId,
        faceCount: selectImg.length,
        originCount: originUpImg.length,
        // originImg_path_1:originUpImg[0],
        ...originImgParams,
        ...collectParams
      }
      const response = yield call(addPicture, params);
      if (isApiSuccess(response)) {
        cfApiSuccess();
        yield put({
          type: 'createFaceTrack2'
        })
        yield put({
          type: 'success',
          payload: {
            poiToFace: {
              ...poiToFace,
              personId: '',
              originUpImg: [],
              isShowVisible: false
            }

          }
        });
      }
    },
    * matchTwoImages({ payload }, { put, call, select }) {
      const params = yield select(store => store.expand.match2ImageParams);
      if (!params.img_path_1 || !params.img_path_2) {
        message.error('请确认已选择两张人脸！');
        yield put({
          type: 'success',
          payload: {
            btnLoading: false
          }
        });
      }

      const response = yield call(match2images, params);
      const { data } = response.response;
      if (data && data.status === 0) {
        yield put({
          type: 'success',
          payload: {
            percent: data.result.percent,
            btnLoading: false
          }
        });
      } else {
        yield put({
          type: 'success',
          payload: {
            btnLoading: false
          }
        });
        message.error('人脸比对失败！');
      }
    }


  },
  reducers: {
    success(state, action) {
      return { ...state, ...action.payload };
    },
    // changeAlarmTypeData(state, action) {
    //   const arr = [];
    //   action.payload.result.map(v => {
    //     arr.push({ name: v.alarmName, value: v.count, alarmReason: v.alarmReason });
    //   });
    //   state.staticData.alarmTypeData = arr;
    //   return { ...state };
    // }, 
    changeCaptureData(state, action) {
      const arr = [];
      action.payload.result.map(v => {
        arr.push({ id: v.id, name: v.groupName, value: v.count });
      });
      state.staticData.alarmTypeData = arr;
      return { ...state };
    },
    // changeCultData(state, action) {
    //   state.staticData.cultData = action.payload.result;
    //   return { ...state };
    // },
    changeCameraData(state, action) {
      state.staticData.cultData = action.payload.result;
      return { ...state };
    },
    changeMonthTypeData(state, action) {
      const monthTypeData = {
        alarm_1: [], alarm_2: [], alarm_3: [], alarm_4: [], alarm_5: [], alarm_6: []
      };
      const monthTypeTable = [{ name: '', data: [] }, { name: '', data: [] }, { name: '', data: [] }, { name: '', data: [] }, { name: '', data: [] }, { name: '', data: [] }];
      action.payload.result.map(v => {
        switch (v.groupId) {
          case 1:
            monthTypeData.alarm_1.push(v);
            monthTypeTable[5].name = v.groupName;
            monthTypeTable[5].data.push(v);
            break;
          case 2:
            monthTypeData.alarm_2.push(v);
            monthTypeTable[1].name = v.groupName;
            monthTypeTable[1].data.push(v);

            break;
          case 3:
            monthTypeData.alarm_3.push(v);
            monthTypeTable[2].name = v.groupName;
            monthTypeTable[2].data.push(v);

            break;
          case 4:
            monthTypeData.alarm_4.push(v);
            monthTypeTable[3].name = v.groupName;
            monthTypeTable[3].data.push(v);
            break;
          case 5:
            monthTypeData.alarm_5.push(v);
            monthTypeTable[4].name = v.groupName;
            monthTypeTable[4].data.push(v);
            break;
          case -1:
            monthTypeData.alarm_6.push(v);
            monthTypeTable[0].name = v.groupName;
            monthTypeTable[0].data.push(v);
            break;
        }
      });

      // 得出这个最后一个拼接日期的索引
      const lastIndex = monthTypeTable[0].data.length

      if (monthTypeTable[0].data.length >= 28) {
        monthTypeTable.map(v => {
          let data = v.data;
          let arr = [];
          //..数据处理
          data.map((item, i) => {
            if (i <= 9) {
              if (i == 0) {
                arr[0] = {
                  date: item.date.substring(5, item.date.length) + '~',
                  alarmName: item.alarmName,
                  alarmReason: item.alarmReason,
                  count: arr[0] ? arr[0].count + item.count : item.count
                }
              }
              if (i == 9) {
                arr[0] = {
                  date: arr[0] ? arr[0].date + item.date.substring(5, item.date.length) : item.date.substring(5, item.date.length),
                  alarmName: item.alarmName,
                  alarmReason: item.alarmReason,
                  count: arr[0] ? arr[0].count + item.count : item.count
                }
              }
              arr[0] = {
                date: arr[0] ? arr[0].date : item.date.substring(5, item.date.length),
                alarmName: item.alarmName,
                alarmReason: item.alarmReason,
                count: arr[0] ? arr[0].count + item.count : item.count
              }
            }
            if (i > 9 && i <= 19) {
              if (i == 10) {
                arr[1] = {
                  date: item.date.substring(5, item.date.length) + '~',
                  alarmName: item.alarmName,
                  alarmReason: item.alarmReason,
                  count: arr[1] ? arr[1].count + item.count : item.count
                }
              }
              if (i == 19) {
                arr[1] = {
                  date: arr[1] ? arr[1].date + item.date.substring(5, item.date.length) : item.date.substring(5, item.date.length),
                  alarmName: item.alarmName,
                  alarmReason: item.alarmReason,
                  count: arr[1] ? arr[1].count + item.count : item.count
                }
              }
              arr[1] = {
                date: arr[1] ? arr[1].date : item.date.substring(5, item.date.length),
                alarmName: item.alarmName,
                alarmReason: item.alarmReason,
                count: arr[1] ? arr[1].count + item.count : item.count
              }
            }
            if (i > 19) {
              if (i == 20) {
                arr[2] = {
                  date: item.date.substring(5, item.date.length) + '~',
                  alarmName: item.alarmName,
                  alarmReason: item.alarmReason,
                  count: arr[2] ? arr[2].count + item.count : item.count
                }
              }
              if (i == lastIndex - 1) {
                arr[2] = {
                  date: arr[2] ? arr[2].date + item.date.substring(5, item.date.length) : item.date.substring(5, item.date.length),
                  alarmName: item.alarmName,
                  alarmReason: item.alarmReason,
                  count: arr[2] ? arr[2].count + item.count : item.count
                }
              }
              arr[2] = {
                date: arr[2] ? arr[2].date : item.date.substring(5, item.date.length),
                alarmName: item.alarmName,
                alarmReason: item.alarmReason,
                count: arr[2] ? arr[2].count + item.count : item.count
              }
            }

          })
          v.data = arr
        })
      }
      if (monthTypeTable[0].data.length >= 12) {
        monthTypeTable.map(v => {
          let data = v.data;
          let arr = [];
          //..数据处理
          data.map((item, i) => {
            if (i <= 3) {
              if (i == 0) {
                arr[0] = {
                  date: item.date + '~',
                  alarmName: item.alarmName,
                  alarmReason: item.alarmReason,
                  count: arr[0] ? arr[0].count + item.count : item.count
                }
              }
              if (i == 3) {
                arr[0] = {
                  date: arr[0] ? arr[0].date + item.date : item.date,
                  alarmName: item.alarmName,
                  alarmReason: item.alarmReason,
                  count: arr[0] ? arr[0].count + item.count : item.count
                }
              }
              arr[0] = {
                date: arr[0] ? arr[0].date : item.date,
                alarmName: item.alarmName,
                alarmReason: item.alarmReason,
                count: arr[0] ? arr[0].count + item.count : item.count
              }
            }
            if (i > 3 && i <= 7) {
              if (i == 4) {
                arr[1] = {
                  date: item.date + '~',
                  alarmName: item.alarmName,
                  alarmReason: item.alarmReason,
                  count: arr[1] ? arr[1].count + item.count : item.count
                }
              }
              if (i == 7) {
                arr[1] = {
                  date: arr[1] ? arr[1].date + item.date : item.date,
                  alarmName: item.alarmName,
                  alarmReason: item.alarmReason,
                  count: arr[1] ? arr[1].count + item.count : item.count
                }
              }
              arr[1] = {
                date: arr[1] ? arr[1].date : item.date,
                alarmName: item.alarmName,
                alarmReason: item.alarmReason,
                count: arr[1] ? arr[1].count + item.count : item.count
              }
            }
            if (i > 7) {
              if (i == 8) {
                arr[2] = {
                  date: item.date + '~',
                  alarmName: item.alarmName,
                  alarmReason: item.alarmReason,
                  count: arr[2] ? arr[2].count + item.count : item.count
                }
              }
              if (i == lastIndex - 1) {
                arr[2] = {
                  date: arr[2] ? arr[2].date + item.date : item.date,
                  alarmName: item.alarmName,
                  alarmReason: item.alarmReason,
                  count: arr[2] ? arr[2].count + item.count : item.count
                }
              }
              arr[2] = {
                date: arr[2] ? arr[2].date : item.date,
                alarmName: item.alarmName,
                alarmReason: item.alarmReason,
                count: arr[2] ? arr[2].count + item.count : item.count
              }
            }

          })
          v.data = arr;
        })
      }
      state.staticData.monthTypeData = monthTypeData;
      state.staticData.monthTypeTable = monthTypeTable;
      return { ...state };
    }
  }
};
