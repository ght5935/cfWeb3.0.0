/**
 * Created by Jason on 2018/2/5.
 */
import request from '../utils/request';
import config from '../utils/config';
import {toQueryString} from '../utils/constant';

export async function getIshomeModuleByRid(params) {
  return request(`${config.api.getIshomeModuleByRid}?${toQueryString(params)}`);
}
