import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@tmp/history';
import { routerRedux } from 'dva';

const Router = routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/',
    exact: true,
    component: require('../index.js').default,
  },
  {
    path: '/phb',
    exact: true,
    component: require('../phb.js').default,
  },
  {
    path: '/playPage',
    exact: true,
    component: require('../playPage.js').default,
  },
  {
    path: '/search',
    exact: true,
    component: require('../search.js').default,
  },
  {
    path: '/SongDetail',
    exact: true,
    component: require('../SongDetail.js').default,
  },
  {
    path: '/songEr',
    exact: true,
    component: require('../songEr.js').default,
  },
  {
    path: '/users/login',
    exact: true,
    component: require('../users/login.js').default,
  },
  {
    path: '/users/register',
    exact: true,
    component: require('../users/register.js').default,
  },
  {
    path: '/users',
    exact: true,
    component: require('../users.js').default,
  },
  {
    component: () =>
      React.createElement(
        require('C:/Users/Administrator/AppData/Local/Yarn/Data/global/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: false },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen = () => {};

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    routeChangeHandler(history.location);
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return <Router history={history}>{renderRoutes(routes, props)}</Router>;
  }
}
