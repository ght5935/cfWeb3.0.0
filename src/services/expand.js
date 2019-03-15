/**
 * Created by Jason on 2018/3/20.
 */
import request from '../utils/request';
import config from '../utils/config';
import {toQueryString} from '../utils/constant';

export async function matchFacetrackToFacetrack(params) {
  return request(`${config.api.matchFacetrackToFacetrack}?${toQueryString(params)}`);
}
export async function getMatchFaceToFaceResult(params) {
  return request(`${config.api.getMatchFaceToFaceResult}?${toQueryString(params)}`);
}
export async function matchFacetrackToPerson(params) {
  return request(`${config.api.matchFacetrackToPerson}?${toQueryString(params)}`);
}
export async function getMatchFaceToPoiResult(params) {
  return request(`${config.api.getMatchFaceToPoiResult}?${toQueryString(params)}`);
}
export async function gitALLCamreaList(params) {
  return request(`${config.api.gitALLCamreaList}?${toQueryString(params)}`);
}
export async function getOrgPersonGroup(params) {
  return request(`${config.api.getOrgPersonGroup}?${toQueryString(params)}`);
}
// export async function getAlarmTypeData(params) { // 改
//   return request(`${config.api.getAlarmTypeData}?${toQueryString(params)}`);
// }
// export async function getCultData(params) {
//   return request(`${config.api.getCultData}?${toQueryString(params)}`);
// }
export async function getMonthTypeData(params) {
  return request(`${config.api.getMonthTypeData}?${toQueryString(params)}`);
}

export async function getInitAlarmList(params) {
  return request(`${config.api.getInitAlarmList}?${toQueryString(params)}`);
}
export async function getGroupCaptureDataList(params) {
  return request(`${config.api.getGroupCaptureDataList}?${toQueryString(params)}`);
}
export async function createFacetrackByImg(params) {
  return request(config.api.createFacetrackByImg, {
    method: 'post',
    data: params
  });
}

 // 数据统计
export async function getCaptureData(params) {
  return request(`${config.api.getCaptureData}?${toQueryString(params)}`);
}
export async function getCameraData(params) {
  return request(`${config.api.getCameraData}?${toQueryString(params)}`);
}
export async function getTimeTypeCaptureData(params) {
  return request(`${config.api.getTimeTypeCaptureData}?${toQueryString(params)}`);
}

export async function addPicture(params){
  return request(config.api.addPicture,{
    method: 'post',
    data:params
  })
}

export async function match2images(params) {
  return request(`${config.api.match2images}?${toQueryString(params)}`);
}