/**
 * Created by Ethan on 2018/2/28.
 */
import request from '../utils/request';
import config from '../utils/config';
import {toQueryString} from '../utils/constant';

export async function getLogList(params) {
  return request(`${config.api.logList}?${toQueryString(params)}`);
}
