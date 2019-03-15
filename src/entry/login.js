import 'console-polyfill';
import 'babel-polyfill';
import dva from 'dva';
import {message} from 'antd';
import {hashHistory} from 'dva/router';
import createLoading from 'dva-loading';
import '../reset.less';
import '../index.less';

import '../login.less';

// 1. Initialize
const app = dva({
  history: hashHistory,
  onError(error) {
    message.error(error.message);
  }
});

// 2. Plugins app.use({});

app.use(createLoading());


// 3. Model
app.model(require('../models/login'));

// 4. Router
app.router(require('../routers/loginRouter'));

// 5. Start
app.start('#root');
