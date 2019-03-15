/**
 * Created by Jason on 2018/2/2.
 */
import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from '../routes/login/Login';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
    </Router>
  );
}

export default RouterConfig;
