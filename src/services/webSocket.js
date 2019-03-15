/**
 * Created by Riky on 2017/3/8.
 */

/**
 *  websocket 请求，socket.on('event',function(data){})  事件不能多次订阅，不然会出现多条重复数据
 */

import io from 'socket.io-client';

let socket;

export function watchList(config, cb) {
  if (!socket) {
    socket = io(config.url + config.namespace, {transports: ['polling', 'websocket']});
    socket.on('connect', () => {
    });
    socket.on('ftmsg', data => {
      cb(data);
    });
    socket.on('disconnect', () => {
    });
    socket.on('reconnect', () => {
    });
  } else {
  }
}
