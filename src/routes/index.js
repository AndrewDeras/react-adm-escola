import React from 'react';

import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';

// components

import Login from '../pages/login/index';
import Page404 from '../pages/page404/index';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="*" component={Page404} />
    </Switch>
  );
}
