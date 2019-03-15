/**
 * Created by Jason on 2018/1/16.
 */
import request from '../utils/request';
import config from '../utils/config';
import {toQueryString} from '../utils/constant';

export async function getRoleList(params) {
  return request(`${config.api.getRoleList}?${toQueryString(params)}`);
}
export async function getAllRoles(params) {
  return request(`${config.api.getAllRoles}?${toQueryString(params)}`);
}
export async function getUserList(params) {
  return request(`${config.api.getUserList}?${toQueryString(params)}`);
}
export async function getAllModule(params) {
  return request(`${config.api.getAllModule}?${toQueryString(params)}`);
}
export async function searchRolePower(params) {
  return request(`${config.api.searchRolePower}?${toQueryString(params)}`);
}
export async function getRoleExceptInit(params) {
  return request(`${config.api.getRoleExceptInit}?${toQueryString(params)}`);
}
export async function getGroupTree(params) {
  return request(`${config.api.getGroupTree}?${toQueryString(params)}`);
}
export async function getOrgunitById(params) {
  return request(`${config.api.getOrgunitById}?${toQueryString(params)}`);
}
export async function getParentByOrgId(params) {
  return request(`${config.api.getParentByOrgId}?${toQueryString(params)}`);
}

export async function addRole(params) {
  return request(config.api.addRole, {
    method: 'post',
    data: params
  });
}

export async function editRole(params) {
  return request(config.api.editRole, {
    method: 'post',
    data: params
  });
}
export async function deleteRole(params) {
  return request(config.api.deleteRole, {
    method: 'post',
    data: params
  });
}
export async function bindRoleModule(params) {
  return request(config.api.bindRoleModule, {
    method: 'post',
    data: params
  });
}
export async function addUser(params) {
  return request(config.api.addUser, {
    method: 'post',
    data: params
  });
}
export async function editUser(params) {
  return request(config.api.editUser, {
    method: 'post',
    data: params
  });
}
export async function deleteUser(params) {
  return request(config.api.deleteUser, {
    method: 'post',
    data: params
  });
}
export async function modifyOrgunit(params) {
  return request(config.api.modifyOrgunit, {
    method: 'post',
    data: params
  });
}
export async function deleteOrgunit(params) {
  return request(config.api.deleteOrgunit, {
    method: 'post',
    data: params
  });
}
export async function addSubOrgunit(params) {
  return request(config.api.addSubOrgunit, {
    method: 'post',
    data: params
  });
}

