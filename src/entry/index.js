import 'console-polyfill';
import 'babel-polyfill';
import dva from 'dva';
import moment from 'moment';
import {message} from 'antd';
import {browserHistory} from 'dva/router';
import { createLogger } from 'redux-logger';
import createLoading from 'dva-loading';
import '../reset.less';
import '../index.less';
// import '../theme/swiper-4.3.3.min.css'

// 修改时间选择器语言为中文
moment.locale('zh-cn');

// 1. Initialize
const app = dva({
  history: browserHistory,
  onError(error) {
    // message.error(error.message);
  }
});
(function (doc, win) {
  // if(!document.cookie.cf_uname){
  //   window.location.href = 'http://192.168.1.157:8090/cfAdmin';
  // }  alert(document.cookie.cf_uname)
  var docEl = win.document.documentElement;
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  var refreshRem = function () {
    var clientWidth = win.innerWidth
                      || doc.documentElement.clientWidth
                      || doc.body.clientWidth;

    if (!clientWidth) return;
    var fz;
    var width = clientWidth;
    fz = 16 * width / 1920;
    docEl.style.fontSize = fz + 'px';
  };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, refreshRem, false);
  doc.addEventListener('DOMContentLoaded', refreshRem, false);
  refreshRem();
})(document, window);
// 2. Plugins
app.use(createLoading());

// 3. Model

app.model(require('../models/index'));
app.model(require('../models/navigation'));
app.model(require('../models/system'));
app.model(require('../models/bussiness'));
app.model(require('../models/basics'));
app.model(require('../models/basics_rt'));
app.model(require('../models/personal'));
app.model(require('../models/expand'));

// 4. Router
app.router(require('../routers/router'));

// 5. Start
app.start('#root');
