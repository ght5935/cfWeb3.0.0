/**
 * Created by Ethan on 2018/1/22.
 */
import request from '../utils/request';
import config from '../utils/config';
import {toQueryString} from '../utils/constant';

export async function getCamreaList(params) {
  return request(`${config.api.getCamreaList}?${toQueryString(params)}`);
}
export async function getPoiList(params) {
  return request(`${config.api.getPoiList}?${toQueryString(params)}`);
}
export async function getAllGroups(params) {
  return request(`${config.api.getAllGroups}?${toQueryString(params)}`);
}
export async function getGroupsList(params) {
  return request(`${config.api.getGroupsList}?${toQueryString(params)}`);
}

export async function alarmRuleList(params) {
  return request(`${config.api.alarmRuleList}?${toQueryString(params)}`);
}

export async function getPoiByOrgIdAndGroupId(params) {
  return request(`${config.api.getPoiByOrgIdAndGroupId}?${toQueryString(params)}`);
}
export async function getGroupListAll(params) {
  return request(`${config.api.getGroupListAll}?${toQueryString(params)}`);
}
export async function getRecognizeList(params) {
  return request(`${config.api.getRecognizeList}?${toQueryString(params)}`);
}
export async function getSrc(params) {
  return request(`${config.api.getSrc}?${toQueryString(params)}`);
}
export async function getOrgCategory(params) {
  return request(`${config.api.getOrgCategory}?${toQueryString(params)}`);
}
export async function getOrgPersonGroup(params) {
  return request(`${config.api.getOrgPersonGroup}?${toQueryString(params)}`);
}
export async function getAppDefaultConfig(params) {
  return request(`${config.api.getAppDefaultConfig}?${toQueryString(params)}`);
}
export async function getCollectList(params) {
  return request(`${config.api.getCollectList}?${toQueryString(params)}`);
}
export async function getAppnodeList(params) {
  return request(`${config.api.getAppnodeList}?${toQueryString(params)}`);
}
export async function getCameraDefaultConfig(params) {
  return request(`${config.api.getCameraDefaultConfig}?${toQueryString(params)}`);
}
export async function getMatchPersonResult(params) {
  return request(`${config.api.getMatchPersonResult}?${toQueryString(params)}`);
}
export async function matchPerson2Facetrack(params) {
  return request(config.api.matchPerson2Facetrack, {
    method: 'post',
    data: params
  });
}

export async function addCamrea(params) {
  return request(config.api.addCamrea, {
    method: 'post',
    data: params
  });
}
export async function modifyCamrea(params) {
  return request(config.api.modifyCamrea, {
    method: 'post',
    data: params
  });
}
export async function delCamrea(params) {
  return request(config.api.deleteCamrea, {
    method: 'post',
    data: params
  });
}
export async function uploadFace(params) {
  return request(config.api.uploadFace, {
    method: 'post',
    data: params
  });
}
export async function addPoiByUpload(params) {
  return request(config.api.addPoiByUpload, {
    method: 'post',
    data: params
  });
}
export async function modifyPoi(params) {
  return request(config.api.modifyPoi, {
    method: 'post',
    data: params
  });
}
export async function deletePoi(params) {
  return request(config.api.deletePoi, {
    method: 'post',
    data: params
  });
}
export async function addGroup(params) {
  return request(config.api.addGroup, {
    method: 'post',
    data: params
  });
}
export async function modifyGroup(params) {
  return request(config.api.modifyGroup, {
    method: 'post',
    data: params
  });
}
export async function deleteGroup(params) {
  return request(config.api.deleteGroup, {
    method: 'post',
    data: params
  });
}
export async function addAlarmRule(params) {
  return request(config.api.addAlarmRule, {
    method: 'post',
    data: params
  });
}
export async function modifyAlarmRule(params) {
  return request(config.api.modifyAlarmRule, {
    method: 'post',
    data: params
  });
}
export async function deleteAlarmRule(params) {
  return request(config.api.deleteAlarmRule, {
    method: 'post',
    data: params
  });
}
export async function addServer(params) {
    return request(config.api.addServer, {
        method: 'post',
        data: params
    });
}
export async function modifyServer(params) {
    return request(config.api.modifyServer, {
        method: 'post',
        data: params
    });
}
export async function deleteServer(params) {
    return request(config.api.deleteServer, {
        method: 'post',
        data: params
    });
}
export async function modifyCamera(params) {
    return request(config.api.modifyCamera, {
        method: 'post',
        data: params
    });
}
export async function changeCameraStatus(params) {
  return request(config.api.changeCameraStatus, {
      method: 'post',
      data: params
  });
}
export async function addCollect(params) {
  return request(config.api.addCollect, {
      method: 'post',
      data: params
  });
}
export async function modifyCollect(params) {
  return request(config.api.modifyCollect, {
      method: 'post',
      data: params
  });
}
export async function deleteCollect(params) {
  return request(config.api.deleteCollect, {
      method: 'post',
      data: params
  });
}
export async function deletePicture(params){
  return request(config.api.deletePicture,{
    method: 'post',
    data:params
  })
}

export async function addPicture(params){
  return request(config.api.addPicture,{
    method: 'post',
    data:params
  })
}

// 摄像头 分组
export async function addCamreaGroup(params) {
  return request(config.api.addCamreaGroup, {
    method: 'post',
    data: params
  });
}

export async function getCameraGroupList(params) {
  return request(`${config.api.getCameraGroupList}?${toQueryString(params)}`);
}
export async function deleteCamreaGroup(params) {
  return request(config.api.deleteCamreaGroup, {
    method: 'post',
    data: params
  });
}

export async function modifyCamreaGroup(params) {
  return request(config.api.modifyCamreaGroup, {
    method: 'post',
    data: params
  });
}

export async function getGroupNameTree(params) {
  return request(`${config.api.getGroupNameTree}?${toQueryString(params)}`);
}
export async function modifyGroupNameTree(params) {
  return request(`${config.api.modifyGroupNameTree}?${toQueryString(params)}`);
}