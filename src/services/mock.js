/**
 * Created by Jason on 2018/1/10.
 */
import request from '../utils/request';
import config from '../utils/config';
import {toQueryString} from '../utils/constant';

export async function newPerson(params) {
    return request(config.api.navList, {
        method: 'get',
        data: params
    });
}
