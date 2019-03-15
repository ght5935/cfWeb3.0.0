/**
 * Created by Ethan on 2018/1/22.
 */
import axios from 'axios';
import {
  getCamreaList,
  addCamrea,
  modifyCamrea,
  delCamrea,
  getPoiList,
  addPoiByUpload,
  modifyPoi,
  deletePoi,
  getAllGroups,
  getGroupsList,
  addGroup,
  modifyGroup,
  deleteGroup,
  alarmRuleList,
  addAlarmRule,
  modifyAlarmRule,
  deleteAlarmRule,
  getPoiByOrgIdAndGroupId,
  getRecognizeList,
  addServer,
  modifyServer,
  deleteServer,
  getAppDefaultConfig,
  getSrc,
  modifyCamera,
  getCollectList,
  getAppnodeList,
  addCollect,
  modifyCollect,
  deleteCollect,
  changeCameraStatus,
  deletePicture,
  addPicture,
  addCamreaGroup,
  getCameraGroupList,
  deleteCamreaGroup,
  modifyCamreaGroup,
  getGroupNameTree,
  modifyGroupNameTree,
  getOrgCategory,
  getOrgPersonGroup,
  getCameraDefaultConfig,
  matchPerson2Facetrack,
  getMatchPersonResult
} from '../services/bussiness';
import { bindFacetrackApi } from '../services/basics';
import { getAllRoles, getGroupTree } from '../services/system';
import { isApiSuccess, apiData, cfShowApiFail, cfApiSuccess, delay } from '../utils/utils';
import { POI_PERSON_PAGE_SIZE, POI_GROUP_PAGE_SIZE, MATCH_THRESHOLD } from '../utils/config';
import conf from '../utils/config';
export default {
  namespace: 'bussiness',
  state: {
    device: {
      addCameraModule: false,
      getCameraParams: {
        pageSize: 10,
        pageNo: 1,
        name: '',
        id: '',
        orgunitId: '',
        ip_address: '',
        groupId: '',
        flag: ''
      },
      cameraTableList: [],
      cameraTablePage: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      },
      modifyCamera: {
        srcId: '',
        name: '',
        modelType: '',
        categoryId: '',
        orgunit_id: '',
        ipAddress: '',
        playUrl: '',
        cjdUrl: '',
        cameraUsername: '',
        cameraPassword: '',
        memo: '',
        cjdUuid: '',
        config: '',
        groupId: ''
      },
      deleteCamrea: {
        srcId: ''
      },
      camreaGroup: {
        addCamreaGroupParams: {
          name: '',
          // parentId: 1,
          sortNo: 1,
          orgunitId: '',
          memo: '',
        },
        editCamreaGroupParams: {
          id: '',
          name: '',
          // parentId: 1,
          sortNo: 0,
          orgunitId: '',
          memo: '',
        },
        getCameraGroupListParams: {
          pageSize: 10,
          pageNo: 1,
          name: '',
          orgunitId: '',
        },
        cameraGroupTablePage: {
          total: 0,
          pageSize: 10,
          currentPage: 1
        },
        cameraGroupTableList: [],
        ids: '',
        groupNameTree: [],
        modifygroupNameTree: [],
        addCamreaGroupModalVisiable: false
      }
    },

    poiPerson: {
      getPoiListParams: {
        pageSize: POI_PERSON_PAGE_SIZE,
        pageNo: 1,
        name: '',
        gender: '',
        identityCard: '',
        orgunitId: '',
        groupId: '',
        // groupId: [],
        threshold: ''
      },
      poiPersonList: [],
      poiPersonPage: {
        total: 0,
        pageSize: POI_PERSON_PAGE_SIZE,
        currentPage: 1
      },
      deletePerson: {
        type: 0,
        personIds: ''
      },
      addPoiParams: {
        personId: '',
        img_path_1: '',
        originImg_path_1: '',
        name: '',
        gender: 1,
        threshold: 60,
        groupId: '',
        identityCard: '',
        impTag: '',
        memo: ''
      },
      imgUrl: '',
      addPoiModalVisiable: false,
      isShowModal: false,
      selectedListImg: [],
      faceImgs: [],
      originImgs: [],
      deleteArr: [],
      personId: '',
      imageUrl: [],
      trajectoryModalVisible: false,
      detailFaceModalVisible: false,
      trajectoryData:{},
      checkTakeImgs: [],
      originImgs: [],
      bindFacetrack: {
        facetrackId: '',
        personId: ''
      },
    },

    poiGroup: {
      allGroups: [],
      getGroupsListParams: {
        pageSize: POI_GROUP_PAGE_SIZE,
        pageNo: 1,
        name: '',
        type: '',
        orgunitId: ''
      },
      poiGroupList: [],
      poiGroupPage: {
        pageSize: POI_GROUP_PAGE_SIZE,
        currentPage: 1,
        total: 0
      },
      addGroupParams: {
        id: '',
        type: '',
        name: '',
        memo: '',
        alarm_threshold: '',
        orgunitId: '',
        labelState: 1,
        labelName: '',
        labelColor: '',
      },
      deleteGroup: {
        groupId: ''
      },
      addGroupModalVisiable: false
    },

    rule: {
      addRuleModule: false,
      getRuleParams: {
        pageSize: 10,
        pageNo: 1,
        name: '',
        orgunitId: '',
        poiGroupId: '',
        groupId: '',
        flag: '',
        alarmType: '',
        configPriority: '',
        alarmIndication: '',
        alarmLevel: '',
      },
      ruleTableList: [],
      ruleTablePage: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      },
      modifyRule: {
        id: '',
        flag: 1,
        name: '',
        groupId: '',
        poiGroupId: '',
        configType: 1,
        alarmType: 1,
        alarmIndication: 1,
        alarmLevel: 1,
        configPriority: '0',
        memo: '',
      },
      deleteRule: {
        id: ''
      },
      ruleSwitch: {
        id: ''
      },
      targetNameList: []
    },
    server: {
      searchParams: {
        pageSize: 10, // TODO
        pageNo: 1,
        id_name_ip: '',
        orgunit: ''
      },
      tableList: [],
      page: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      },
      addParams: {
        name: '',
        ipAddress: '',
        appconfig: '',
        orgunitId: '',
        memo: ''
      },
      deleteParams: {
        id: ''
      },
      addRecognizeModalVisiable: false,
      searchCameraParam: {
        id: ''
      },
      cameraList: [],
      modifyCameraParams: {
        id: '',
        config: ''
      },
      DetailCameraVisiable: false
    },
    appnodeList: [],
    collectGroup: {
      addModalVisiable: false,
      searchCollectParams: {
        pageSize: 10, // TODO
        pageNo: 1,
        id_name_ip: '',
        orgunit: ''
      },
      collectList: [],
      collectPage: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      },
      addCollectParams: {
        name: '',
        ipAddress: '',
        validstring: '',
        orgunitId: '',
        memo: '',
        appId: '',
      },
      deleteCollectParams: {
        id: ''
      },
    },
    roleList: [],
    groupTree: [],
    confirmVisiable: false,
    confirmVisiable2: false,
    categoryTree: [],
    cameraGroupTree: [],
    personGroupTree: [],
    getPgParam: {
      orgunitId: null
    },
    poiToFace: {
      processed: false,
      matchFaceList: []
    }
  },
  sunscriptions: {},
  effects: {
    // 设备管理
    * getCameraList({ payload }, { put, call, select }) {
      const device = yield select(store => store.bussiness.device);
      const { getCameraParams } = device;
      const response = yield call(getCamreaList, getCameraParams);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        // 修改配置JSON
        if (result.list) {
          result.list.map((value, i) => {
            try {
              const config = JSON.parse(result.list[i].config);
              delete config.IPCameraParam.url;
              delete config.IPCameraParam.live_port;
              result.list[i].config = JSON.stringify(config, undefined, 2);
            } catch (err) {

            }
          });
        }
        yield put({
          type: 'success',
          payload: {
            device: {
              ...device,
              cameraTableList: result.list ? result.list : [],
              cameraTablePage: result.page
            }
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * addCamera({ payload }, { put, call, select }) {
      const device = yield select(store => store.bussiness.device);
      const { modifyCamera } = device;
      const response = yield call(addCamrea, modifyCamera);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        cfApiSuccess();
        yield put({ type: 'getCameraList' });
        yield put({
          type: 'success',
          payload: {
            device: {
              ...device,
              addCameraModule: false,
              modifyCamera: {
                srcId: '',
                name: '',
                modelType: '',
                categoryId: '',
                orgunit_id: '',
                ipAddress: '',
                playUrl: '',
                cjdUrl: '',
                cameraUsername: '',
                cameraPassword: '',
                memo: '',
                cjdUuid: '',
                cjdSubid: '',
                config: '',
              }
            }
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * modifyCamrea({ payload }, { put, call, select }) {
      const device = yield select(store => store.bussiness.device);
      const { modifyCamera, camreaGroup } = device;
      const response = yield call(modifyCamrea, modifyCamera);
      if (isApiSuccess(response)) {
        cfApiSuccess();
        const result = apiData(response);
        yield put({ type: 'getCameraList' });
        yield put({
          type: 'success',
          payload: {
            device: {
              ...device,
              addCameraModule: false,
              modifyCamera: {
                srcId: '',
                name: '',
                modelType: '',
                categoryId: '',
                orgunit_id: '',
                ipAddress: '',
                playUrl: '',
                cjdUrl: '',
                cameraUsername: '',
                cameraPassword: '',
                memo: '',
                cjdUuid: '',
                cjdSubid: '',
                config: '',
              },
              camreaGroup: {
                ...camreaGroup,
                modifygroupNameTree: [],
              }
            }
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * deleteCamrea({ payload }, { put, call, select }) {
      const device = yield select(store => store.bussiness.device);
      const { deleteCamrea } = device;
      const response = yield call(delCamrea, deleteCamrea);
      if (isApiSuccess(response)) {
        cfApiSuccess();
        const result = apiData(response);
        yield put({ type: 'getCameraList' });
        yield put({
          type: 'success',
          payload: {
            confirmVisiable: false,
            device: {
              ...device,
              deleteCamrea: {
                srcId: ''
              }
            }
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * cameraListTranslate({ payload }, { put, select }) {
      const { pageNo, pageSize } = payload;
      const device = yield select(store => store.bussiness.device);
      const { getCameraParams } = device;
      yield put({
        type: 'success',
        payload: {
          device: {
            ...device,
            getCameraParams: {
              ...getCameraParams,
              pageSize,
              pageNo
            }
          }
        }
      });
      yield put({
        type: 'getCameraList'
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
    * changeStatus({ payload }, { put, call, select }) {
      const srcId = payload.srcId;
      const response = yield call(changeCameraStatus, { srcId });
      if (isApiSuccess(response)) {
        cfApiSuccess();
        const result = apiData(response);
        yield put({
          type: 'getCameraList'
        });
      } else {
        cfShowApiFail(response);
      }
    },
    // 摄像头分组
    * addCamreaGroup({ payload }, { call, put, select }) {
      const device = yield select(store => store.bussiness.device);
      const { camreaGroup } = device;
      const { addCamreaGroupParams } = camreaGroup;
      const response = yield call(addCamreaGroup, addCamreaGroupParams);
      if (isApiSuccess(response)) {
        cfApiSuccess();
        const result = apiData(response);
        yield put({ type: 'getCameraGroupList' });
        yield put({
          type: 'success',
          payload: {
            device: {
              ...device,
              camreaGroup: {
                ...camreaGroup,
                addCamreaGroupParams: {
                  ...addCamreaGroupParams,
                  name: '',
                  orgunitId: '',
                  memo: '',
                },
                addCamreaGroupModalVisiable: false
              }
            }
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * modifyCamreaGroup({ payload }, { put, call, select }) {
      const device = yield select(store => store.bussiness.device);
      const { camreaGroup } = device;
      const { addCamreaGroupParams } = camreaGroup;
      const response = yield call(modifyCamreaGroup, addCamreaGroupParams);
      if (isApiSuccess(response)) {
        cfApiSuccess();
        const result = apiData(response);
        yield put({ type: 'getCameraGroupList' });
        yield put({
          type: 'success',
          payload: {
            device: {
              ...device,
              camreaGroup: {
                ...camreaGroup,
                addCamreaGroupParams: {
                  ...addCamreaGroupParams,
                  id: '',
                  name: '',
                  orgunitId: '',
                  memo: '',
                },
                addCamreaGroupModalVisiable: false,
              }
            }
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * getCameraGroupList({ payload }, { put, call, select }) {
      const device = yield select(store => store.bussiness.device);
      const { camreaGroup } = device;
      const { getCameraGroupListParams } = camreaGroup;
      const response = yield call(getCameraGroupList, getCameraGroupListParams);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            device: {
              ...device,
              camreaGroup: {
                ...camreaGroup,
                cameraGroupTableList: result.list ? result.list : [],
                cameraGroupTablePage: result.page
              }
            }
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * camreaGroupPageTranslate({ payload }, { put, select }) {
      const { pageNo, pageSize } = payload;
      const device = yield select(store => store.bussiness.device);
      const { camreaGroup } = device;
      const { getCameraGroupListParams } = camreaGroup;
      yield put({
        type: 'success',
        payload: {
          device: {
            ...device,
            camreaGroup: {
              ...camreaGroup,
              getCameraGroupListParams: {
                ...getCameraGroupListParams,
                pageSize,
                pageNo
              }
            }
          }
        }
      });
      yield put({
        type: 'getCameraGroupList'
      });
    },
    * deleteCamreaGroup({ payload }, { put, call, select }) {
      const device = yield select(store => store.bussiness.device);
      const { camreaGroup } = device;
      const camreaGroupParams = { ids: camreaGroup.ids };
      const response = yield call(deleteCamreaGroup, camreaGroupParams);
      if (isApiSuccess(response)) {
        cfApiSuccess();
        const result = apiData(response);
        yield put({ type: 'getCameraGroupList' });
        yield put({
          type: 'success',
          payload: {
            confirmVisiable2: false,
            device: {
              ...device,
              camreaGroup: {
                ...camreaGroup,
                ids: ''
              }
            }
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * getGroupNameTree({ payload }, { call, put, select }) {
      const device = yield select(store => store.bussiness.device);
      const { camreaGroup, getCameraParams } = device;
      const getGroupNameTreeParams = { orgunitId: getCameraParams.orgunitId };
      const response = yield call(getGroupNameTree, getGroupNameTreeParams);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            device: {
              ...device,
              camreaGroup: {
                ...camreaGroup,
                groupNameTree: result || []
              }
            }
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * modifyGroupNameTree({ payload }, { call, put, select }) {
      const device = yield select(store => store.bussiness.device);
      const { camreaGroup, modifyCamera } = device;
      const getGroupNameTreeParams = { orgunitId: modifyCamera.orgunit_id };
      const response = yield call(getGroupNameTree, getGroupNameTreeParams);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            device: {
              ...device,
              camreaGroup: {
                ...camreaGroup,
                modifygroupNameTree: result || []
              }
            }
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    // 目标管理
    * getPoiList({ payload }, { call, put, select }) {
      const poiPerson = yield select(store => store.bussiness.poiPerson);
      let { getPoiListParams } = poiPerson;
      if (getPoiListParams.groupId) {
        getPoiListParams.groupId.indexOf('-') > -1 ? getPoiListParams.groupId = getPoiListParams.groupId.split('-')[1] : getPoiListParams.groupId
      } else {
        getPoiListParams.groupId = ''
      }

      const response = yield call(getPoiList, getPoiListParams);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            poiPerson: {
              ...poiPerson,
              poiPersonList: result.list,
              poiPersonPage: result.page
            }
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * poiPersonPageTranslate({ payload }, { put, select }) {
      const { pageNo, pageSize } = payload;
      const poiPerson = yield select(store => store.bussiness.poiPerson);
      const { getPoiListParams } = poiPerson;
      yield put({
        type: 'success',
        payload: {
          poiPerson: {
            ...poiPerson,
            getPoiListParams: {
              ...getPoiListParams,
              pageSize,
              pageNo
            }
          }
        }
      });
      yield put({
        type: 'getPoiList'
      });
    },
    * getAllGroups({ payload }, { call, put, select }) {
      const poiGroup = yield select(store => store.bussiness.poiGroup);
      let orgunitId = yield select(store => store.bussiness.getPgParam.orgunitId);
      if (!orgunitId) {
        yield call(delay, 1000)
        orgunitId = yield select(store => store.navigation.userMsg.orgunitId);
      }
      const response = yield call(getOrgPersonGroup, { orgunitId });
      if (isApiSuccess(response)) {
        const result = apiData(response);

        yield put({
          type: 'success',
          payload: {
            poiGroup: {
              ...poiGroup,
              allGroups: [result] || []
            }
          }
        })
      } else {

      }
    },
    * addPoiByUpload({ payload }, { call, put, select }) {
      const poiPerson = yield select(store => store.bussiness.poiPerson);
      const { addPoiParams } = poiPerson;

      if (String(addPoiParams.groupId).indexOf('-') == -1) {
        addPoiParams.groupId = addPoiParams.groupId
      } else {
        addPoiParams.groupId = addPoiParams.groupId.split('-')[1]
      }

      const response = yield call(addPoiByUpload, addPoiParams);
      if (isApiSuccess(response)) {
        cfApiSuccess();
        const result = apiData(response);
        yield put({ type: 'getPoiList' });
        yield put({
          type: 'success',
          payload: {
            poiPerson: {
              ...poiPerson,
              addPoiParams: {
                img_path_1: '',
                originImg_path_1: '',
                name: '',
                gender: '',
                threshold: '',
                groupId: '',
                identityCard: '',
                impTag: '',
                memo: ''
              },
              addPoiModalVisiable: false,
              imageUrl: ''
            }
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * modifyPoi({ payload }, { call, put, select }) {
      const poiPerson = yield select(store => store.bussiness.poiPerson);
      let { addPoiParams } = poiPerson;

      if (String(addPoiParams.groupId).indexOf('-') == -1) {
        addPoiParams.groupId = addPoiParams.groupId
      } else {
        addPoiParams.groupId = addPoiParams.groupId.split('-')[1]
      }

      const response = yield call(modifyPoi, addPoiParams);
      if (isApiSuccess(response)) {
        cfApiSuccess();
        yield put({ type: 'getPoiList' });
        yield put({
          type: 'success',
          payload: {
            poiPerson: {
              ...poiPerson,
              addPoiParams: {
                faceCount: 1,
                originCount: 1,
                img_path_1: '',
                originImg_path_1: '',
                name: '',
                gender: '',
                threshold: '',
                groupId: '',
                identityCard: '',
                impTag: '',
                memo: ''
              },
              addPoiModalVisiable: false,
              imageUrl: ''
            }
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * deletePoi({ payload }, { call, put, select }) {
      const poiPerson = yield select(store => store.bussiness.poiPerson);
      const { deletePerson } = poiPerson;
      const response = yield call(deletePoi, deletePerson);
      if (isApiSuccess(response)) {
        cfApiSuccess();
        yield put({
          type: 'success',
          payload: {
            poiPerson: {
              ...poiPerson,
              deletePerson: {
                type: 0,
                personIds: ''
              }
            },
            confirmVisiable: false
          }
        });
        yield put({ type: 'getPoiList' });
      } else {
        cfShowApiFail(response);
      }
    },
    // 目标分组管理
    * getGroupsList({ payload }, { call, put, select }) {
      const poiGroup = yield select(store => store.bussiness.poiGroup);
      const { getGroupsListParams } = poiGroup;
      const response = yield call(getGroupsList, getGroupsListParams);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            poiGroup: {
              ...poiGroup,
              poiGroupList: result.list,
              poiGroupPage: result.page
            }
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * poiGroupPageTranslate({ payload }, { put, select }) {
      const { pageNo, pageSize } = payload;
      const poiGroup = yield select(store => store.bussiness.poiGroup);
      const { getGroupsListParams } = poiGroup;
      yield put({
        type: 'success',
        payload: {
          poiGroup: {
            ...poiGroup,
            getGroupsListParams: {
              ...getGroupsListParams,
              pageSize,
              pageNo
            }
          }
        }
      });
      yield put({
        type: 'getGroupsList'
      });
    },
    * addGroup({ payload }, { call, put, select }) {
      const poiGroup = yield select(store => store.bussiness.poiGroup);
      const { addGroupParams } = poiGroup;
      const response = yield call(addGroup, addGroupParams);
      if (isApiSuccess(response)) {
        cfApiSuccess();
        const result = apiData(response);
        yield put({ type: 'getGroupsList' });
        yield put({
          type: 'success',
          payload: {
            poiGroup: {
              ...poiGroup,
              addGroupParams: {
                id: '',
                type: '',
                name: '',
                memo: '',
                orgunitId: '',
                alarm_threshold: '',
                labelState: 1,
                labelName: '',
                labelColor: '',
              },
              addGroupModalVisiable: false
            }
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * modifyGroup({ payload }, { call, put, select }) {
      const poiGroup = yield select(store => store.bussiness.poiGroup);
      const { addGroupParams } = poiGroup;
      const response = yield call(modifyGroup, addGroupParams);
      if (isApiSuccess(response)) {
        cfApiSuccess();
        const result = apiData(response);
        yield put({ type: 'getGroupsList' });
        yield put({
          type: 'success',
          payload: {
            poiGroup: {
              ...poiGroup,
              addGroupParams: {
                id: '',
                type: '',
                name: '',
                memo: '',
                orgunitId: '',
                alarm_threshold: '',
                labelState: 1,
                labelName: '',
                labelColor: '',
              },
              addGroupModalVisiable: false
            }
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * deleteGroup({ payload }, { call, put, select }) {
      const poiGroup = yield select(store => store.bussiness.poiGroup);
      const params = poiGroup.deleteGroup;
      const response = yield call(deleteGroup, params);
      if (isApiSuccess(response)) {
        cfApiSuccess();
        yield put({
          type: 'success',
          payload: {
            poiGroup: {
              ...poiGroup,
              deleteGroup: {
                groupId: ''
              }
            },
            confirmVisiable2: false
          }
        });
        yield put({ type: 'getGroupsList' });
      } else {
        cfShowApiFail(response);
      }
    },

    // 规则管理
    * getAlarmRuleList({ payload }, { put, call, select }) {
      const rule = yield select(store => store.bussiness.rule);
      const { getRuleParams } = rule;

      if (getRuleParams.groupId) {
        getRuleParams.groupId.indexOf('-') > -1 ? getRuleParams.groupId = getRuleParams.groupId.split('-')[1] : getRuleParams.groupId
      } else {
        getRuleParams.groupId = ''
      }

      if (getRuleParams.poiGroupId) {
        getRuleParams.poiGroupId.indexOf('-') > -1 ? getRuleParams.poiGroupId = getRuleParams.poiGroupId.split('-')[1] : getRuleParams.poiGroupId
      } else {
        getRuleParams.poiGroupId = ''
      }

      const response = yield call(alarmRuleList, getRuleParams);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            rule: {
              ...rule,
              ruleTableList: result.list,
              ruleTablePage: result.page
            }
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
    * addAlarmRule({ payload }, { put, call, select }) {
      const rule = yield select(store => store.bussiness.rule);
      const { modifyRule } = rule;
      // const alarmTime = modifyRule.alarmTime.join(',');
      const response = yield call(addAlarmRule, { ...modifyRule });
      if (isApiSuccess(response)) {
        cfApiSuccess();
        yield put({ type: 'getAlarmRuleList' });
        yield put({
          type: 'success',
          payload: {
            rule: {
              ...rule,
              addRuleModule: false,
              modifyRule: {
                id: '',
                flag: 1,
                name: '',
                groupId: '',
                poiGroupId: '',
                configType: 1,
                alarmType: 1,
                alarmIndication: 1,
                alarmLevel: 1,
                configPriority: '0',
                memo: '',
              }
            }
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * modifyAlarmRule({ payload }, { put, call, select }) {
      const rule = yield select(store => store.bussiness.rule);
      const { modifyRule } = rule;
      // const alarmTime = modifyRule.alarmTime.join(',');
      const response = yield call(modifyAlarmRule, { ...modifyRule });
      if (isApiSuccess(response)) {
        cfApiSuccess();
        const result = apiData(response);
        yield put({ type: 'getAlarmRuleList' });
        yield put({
          type: 'success',
          payload: {
            rule: {
              ...rule,
              addRuleModule: false,
              modifyRule: {
                id: '',
                flag: 1,
                name: '',
                groupId: '',
                poiGroupId: '',
                configType: 1,
                alarmType: 1,
                alarmIndication: 1,
                alarmLevel: 1,
                configPriority: '0',
                memo: '',
              }
            }
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * deleteRule({ payload }, { put, call, select }) {
      const rule = yield select(store => store.bussiness.rule);
      const { deleteRule } = rule;
      const response = yield call(deleteAlarmRule, deleteRule);
      if (isApiSuccess(response)) {
        cfApiSuccess();
        yield put({ type: 'getAlarmRuleList' });
        yield put({
          type: 'success',
          payload: {
            confirmVisiable: false,
            rule: {
              ...rule,
              deleteRule: {
                ...deleteRule,
                id: ''
              }
            }
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * rolesListTranslate({ payload }, { put, select }) {
      const { pageNo, pageSize } = payload;
      const rule = yield select(store => store.bussiness.rule);
      const { getRuleParams } = rule;
      yield put({
        type: 'success',
        payload: {
          rule: {
            ...rule,
            getRuleParams: {
              ...getRuleParams,
              pageSize,
              pageNo
            }
          }
        }
      });
      yield put({
        type: 'getAlarmRuleList'
      });
    },
    * getPoiByOrgIdAndGroupId({ payload }, { put, call, select }) {
      const rule = yield select(store => store.bussiness.rule);
      const orgunitId = rule.modifyRule.poiOrgunitId;
      const poiGroupId = rule.modifyRule.poiGroupId;
      if (!orgunitId || !poiGroupId) {
        return false;
      }
      const response = yield call(getPoiByOrgIdAndGroupId, { orgunitId, poiGroupId });
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            rule: {
              ...rule,
              targetNameList: result
            }
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    // 服务器配置===识别端
    * getRecognizeList({ payload }, { put, call, select }) {
      const server = yield select(store => store.bussiness.server);
      const params = server.searchParams;
      const response = yield call(getRecognizeList, params);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            server: {
              ...server,
              tableList: result.list,
              page: result.page
            }
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * recognizeListTranslate({ payload }, { put, select }) {
      const { pageNo, pageSize } = payload;
      const server = yield select(store => store.bussiness.server);
      const { searchParams } = server;
      yield put({
        type: 'success',
        payload: {
          server: {
            ...server,
            searchParams: {
              ...searchParams,
              pageSize,
              pageNo
            }
          }
        }
      });
      yield put({
        type: 'getRecognizeList'
      });
    },
    * addServer({ payload }, { put, call, select }) {
      const server = yield select(store => store.bussiness.server);
      const params = server.addParams;
      const response = yield call(addServer, params);
      if (isApiSuccess(response)) {
        cfApiSuccess();
        yield put({
          type: 'success',
          payload: {
            server: {
              ...server,
              searchParams: {
                pageSize: 10, // TODO
                pageNo: 1,
                id_name_ip: '',
                orgunit: ''
              },
              addParams: {
                name: '',
                ipAddress: '',
                appconfig: '',
                orgunitId: '',
                memo: '',
              },
              addRecognizeModalVisiable: false,
            }
          }
        });
        const result = apiData(response);
        yield put({ type: 'getRecognizeList' });
      } else {
        cfShowApiFail(response);
      }
    },
    * modifyServer({ payload }, { put, call, select }) {
      const server = yield select(store => store.bussiness.server);
      const params = server.addParams;
      const response = yield call(modifyServer, params);
      if (isApiSuccess(response)) {
        cfApiSuccess();
        yield put({
          type: 'success',
          payload: {
            server: {
              ...server,
              searchParams: {
                pageSize: 10, // TODO
                pageNo: 1,
                id_name_ip: '',
                orgunit: ''
              },
              addParams: {
                name: '',
                ipAddress: '',
                appconfig: '',
                orgunitId: '',
                memo: '',
              },
              addRecognizeModalVisiable: false,
            }
          }
        });
        const result = apiData(response);
        yield put({ type: 'getRecognizeList' });
      } else {
        cfShowApiFail(response);
      }
    },
    * getAppDefaultConfig({ payload }, { put, call, select }) {
      const server = yield select(store => store.bussiness.server);
      const addParams = server.addParams;
      const response = yield call(getAppDefaultConfig);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            server: {
              ...server,
              addParams: {
                ...addParams,
                appconfig: result
              }
            }
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * deleteServer({ payload }, { put, call, select }) {
      const server = yield select(store => store.bussiness.server);
      const params = server.deleteParams;
      const response = yield call(deleteServer, params);
      if (isApiSuccess(response)) {
        cfApiSuccess();
        yield put({ type: 'getRecognizeList' });
        yield put({
          type: 'success',
          payload: {
            confirmVisiable: false,
            server: {
              ...server,
              deleteParams: {
                id: ''
              }
            }
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * getSrc({ payload }, { put, call, select }) {
      const server = yield select(store => store.bussiness.server);
      const params = server.searchCameraParam;
      const response = yield call(getSrc, params);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            server: {
              ...server,
              cameraList: result,
              modifyCameraParams: {
                id: result[0].id,
                config: result[0].config
              },
            }
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * modifyCamera({ payload }, { put, call, select }) {
      const server = yield select(store => store.bussiness.server);
      const params = server.modifyCameraParams;
      const response = yield call(modifyCamera, params);
      if (isApiSuccess(response)) {
        cfApiSuccess();
        yield put({
          type: 'success',
          payload: {
            server: {
              ...server,
              modifyCameraParams: {
                id: '',
                config: ''

              },
              DetailCameraVisiable: false
            }
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    // 服务器配置===采集端
    * getCollectList({ payload }, { put, call, select }) {
      const collectGroup = yield select(store => store.bussiness.collectGroup);
      const params = collectGroup.searchCollectParams;
      const response = yield call(getCollectList, params);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            collectGroup: {
              ...collectGroup,
              collectList: result.list,
              collectPage: result.page
            }
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * getAppnodeList({ payload }, { put, call, select }) {
      const collectGroup = yield select(store => store.bussiness.collectGroup);
      const response = yield call(getAppnodeList);
      if (isApiSuccess(response)) {
        // cfApiSuccess();
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            appnodeList: result,
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * addCollect({ payload }, { put, call, select }) {
      const collectGroup = yield select(store => store.bussiness.collectGroup);
      const params = collectGroup.addCollectParams;
      const response = yield call(addCollect, params);
      if (isApiSuccess(response)) {
        cfApiSuccess();
        yield put({
          type: 'success',
          payload: {
            collectGroup: {
              ...collectGroup,
              searchCollectParams: {
                pageSize: 10, // TODO
                pageNo: 1,
                id_name_ip: '',
                orgunit: ''
              },
              addCollectParams: {
                name: '',
                ipAddress: '',
                validstring: '',
                orgunitId: '',
                memo: '',
                appId: ''
              },
              addModalVisiable: false,
            }
          }
        });
        const result = apiData(response);
        yield put({ type: 'getCollectList' });
      } else {
        cfShowApiFail(response);
      }
    },
    * modifyCollect({ payload }, { put, call, select }) {
      const collectGroup = yield select(store => store.bussiness.collectGroup);
      const params = collectGroup.addCollectParams;
      const response = yield call(modifyCollect, params);
      if (isApiSuccess(response)) {
        cfApiSuccess();
        yield put({
          type: 'success',
          payload: {
            collectGroup: {
              ...collectGroup,
              searchCollectParams: {
                pageSize: 10, // TODO
                pageNo: 1,
                id_name_ip: '',
                orgunit: ''
              },
              addCollectParams: {
                name: '',
                ipAddress: '',
                validstring: '',
                orgunitId: '',
                memo: '',
                appId: ''
              },
              addModalVisiable: false,
            }
          }
        });
        const result = apiData(response);
        yield put({ type: 'getCollectList' });
      } else {
        cfShowApiFail(response);
      }
    },
    * deleteCollect({ payload }, { put, call, select }) {
      const collectGroup = yield select(store => store.bussiness.collectGroup);
      const params = collectGroup.deleteCollectParams;
      const response = yield call(deleteCollect, params);
      if (isApiSuccess(response)) {
        cfApiSuccess();
        yield put({ type: 'getCollectList' });
        yield put({
          type: 'success',
          payload: {
            confirmVisiable: false,
            collectGroup: {
              ...collectGroup,
              deleteCollectParams: {
                id: ''
              },
            }
          }
        });
      } else {
        cfShowApiFail(response);
      }
    },
    * collectListTranslate({ payload }, { put, select }) {
      const { pageNo, pageSize } = payload;
      const collectGroup = yield select(store => store.bussiness.collectGroup);
      const { searchCollectParams } = collectGroup;
      yield put({
        type: 'success',
        payload: {
          collectGroup: {
            ...collectGroup,
            searchCollectParams: {
              ...searchCollectParams,
              pageSize,
              pageNo
            }
          }
        }
      });
      yield put({
        type: 'getCollectList'
      });
    },
    // 目标分组==人员管理
    * okChange({ payload }, { put, call, select }) {
      const poiPerson = yield select(store => store.bussiness.poiPerson);
      const deleteArr = poiPerson.deleteArr;
      const faceImgsUrl = poiPerson.faceImgs;
      const originImgsUrl = poiPerson.originImgs;
      let collectParams = {};
      let collectUrls = {};
      let collectOriginUrls = {};
      deleteArr.map((v, i) => {
        collectParams[`img_name_${i + 1}`] = v.split('fn=')[1];
      })
      let params = {
        personId: poiPerson.personId,
        imgCount: poiPerson.deleteArr.length,
        ...collectParams
      };
      faceImgsUrl.map((v, i) => {
        collectUrls[`img_path_${i + 1}`] = v;
      })
      originImgsUrl.map((v, i) => {
        collectOriginUrls[`originImg_path_${i + 1}`] = v
      })
      let addPicParams = {
        personId: poiPerson.personId,
        faceCount: poiPerson.faceImgs.length,
        originCount: poiPerson.originImgs.length,
        ...collectUrls,
        ...collectOriginUrls
      };
      const deleteResponse = yield call(deletePicture, params);
      let response = undefined;
      if (addPicParams.faceCount !== 0) {
        response = yield call(addPicture, addPicParams);
      }
      if (response ? isApiSuccess(response) : true && isApiSuccess(deleteResponse)) {
        cfApiSuccess();
        yield put({
          type: 'success',
          payload: {
            poiPerson: {
              ...poiPerson,
              isShowModal: false,
              deleteArr: [],
              faceImgs: [],
              selectedListImg: [],
              originImgs: []
            }
          }
        })
      } else {
        cfShowApiFail(deleteResponse);
      }
      if (response ? isApiSuccess(response) : true || isApiSuccess(deleteResponse))
        yield put({ type: 'getPoiList' });
    },
    * getOrgCategory({ payload }, { put, call, select }) {
      let orgunitId = yield select(store => store.navigation.userMsg.orgunitId);
      if (!orgunitId) {
        yield call(delay, 1000)
        orgunitId = yield select(store => store.navigation.userMsg.orgunitId);
      }
      yield put({
        type: 'success',
        payload: {
          getPgParam: {
            orgunitId
          }
        }
      })
      const response = yield call(getOrgCategory, { orgunitId });
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            cameraGroupTree: [result]
          }
        })
      } else {

      }
    },
    * getOrgPersonGroup({ payload }, { put, call, select }) {
      let orgunitId = yield select(store => store.bussiness.getPgParam.orgunitId);
      if (!orgunitId) {
        yield call(delay, 1000)
        orgunitId = yield select(store => store.navigation.userMsg.orgunitId);
      }
      const response = yield call(getOrgPersonGroup, { orgunitId });
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            personGroupTree: [result]
          }
        })
      } else {

      }
    },
    * getcameradefaultconfig({ payload }, { put, call, select }) {
      const device = yield select(store => store.bussiness.device);
      const { modifyCamera } = device;
      const response = yield call(getCameraDefaultConfig, {});
      if (isApiSuccess(response)) {
        let result = apiData(response);
        result = JSON.parse(result);
        delete result.IPCameraParam.url;
        delete result.IPCameraParam.live_port;
        result = JSON.stringify(result, undefined, 2);
        yield put({
          type: 'success',
          payload: {
            device: {
              ...device,
              modifyCamera: {
                ...modifyCamera,
                config: result
              }
            }
          }
        })
      }
    },
    * matchPerson2Facetrack({ payload }, { put, call, select }) {
      const poiPerson = yield select(store => store.bussiness.poiPerson)
      const id = poiPerson.matchPersonId;
      const response = yield call(matchPerson2Facetrack, { personId: id });
      if (isApiSuccess(response)) {

        const result = apiData(response);
        console.log(result);
        yield put({
          type: 'getMatchPersonResult',
          payload: {
            result
          }
        })

      } else {
        cfShowApiFail(response);
      }
    },
    * getMatchPersonResult({ payload }, { call, put, select }) {
      const poiToFace = yield select(store => store.bussiness.poiToFace);
      let {processed} = poiToFace
      const params = JSON.stringify(payload.result);

      // 重新封装 后台需要参数为JSON格式的POST请求
      const ajax = () => {
        const xhr = axios.create();
        return xhr({
          method: 'post',
          url: conf.api.getMatchPersonResult,
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          },
          data: params
        })
          .then(response => ({ response }))
          .catch(err => { return { err }; });
      }

      const delay = timeout => {
        return new Promise(resolve => {
          setTimeout(resolve, timeout);
        });
      };

      while (!processed) {
        yield call(delay, 100);
        processed = yield select(store => store.bussiness.poiToFace.processed);
        if (!processed) {
          const response = yield call(ajax);
          if (isApiSuccess(response)) {
            const result = apiData(response);
            if(result.list){
              result.list.sort(function (a, b) {
                return a.captureTime > b.captureTime ? 1 : -1;
              })
            }
            result.list = result.list.filter(v => {
              return v.score > MATCH_THRESHOLD
            })
            yield put({
              type: 'success',
              payload: {
                poiToFace: {
                  ...poiToFace,
                  matchFaceList: result.list,
                  processed: result.processed
                }
              }
            });
          } else {
            cfShowApiFail(response);
          }
        }
      }
    },
    * bindFacetrack({ payload }, { put, call, select }) {
      const poiPerson = yield select(store => store.bussiness.poiPerson);
      const {bindFacetrack} = poiPerson;
      const response = yield call(bindFacetrackApi, bindFacetrack);

      if (isApiSuccess(response)) {
        const result = apiData(response);
        cfApiSuccess();
        yield put({
          type: 'success',
          payload: {
            poiPerson: {
              ...poiPerson,
              bindFacetrack: {
                facetrackId: '',
                personId: '',
              },
              checkTakeImgs: [],
              detailFaceModalVisible:false,
              trajectoryModalVisible: true
            }
          }
        });
        yield put({type: 'getPoiList'})
      } else {
        cfShowApiFail(response);
      }
    },

  },
  reducers: {
    success(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
