/**
 * Created by Ethan on 2018/1/9.
 */
import request from '../utils/request';
import config from '../utils/config';
import {toQueryString} from '../utils/constant';

export async function navList(params) {
  return request(`${config.api.navList}?${toQueryString(params)}`);
}
export async function getSubModule(params) {
  return request(`${config.api.getSubModule}?${toQueryString(params)}`);
}
export async function getRoleByUserName(params) {
  return request(`${config.api.getRoleByUserName}?${toQueryString(params)}`);
}
export async function getUserMsg(params) {
  return request(`${config.api.getUserName}?${toQueryString(params)}`);
}
