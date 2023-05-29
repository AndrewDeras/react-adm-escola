import React from 'react';

import { Switch } from 'react-router-dom/cjs/react-router-dom.min';

import MyRoute from './MyRoute';

// components

import Login from '../pages/login/index';
import Page404 from '../pages/page404/index';

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Login} />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
