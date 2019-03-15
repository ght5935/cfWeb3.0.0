/**
 * Created by Jason on 2018/2/2.
 */
import request from '../../src/utils/request';
import config from '../../src/utils/config';
import {toQueryString} from '../utils/constant';

export async function onlogin(params) {
  return request(config.api.onLogin, {
    method: 'post',
    data: params
  });
}
