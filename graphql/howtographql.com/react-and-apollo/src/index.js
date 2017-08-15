import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from 'antd';
import { AppContainer } from 'react-hot-loader';
import { ApolloProvider, createNetworkInterface, ApolloClient } from 'react-apollo';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import { Cache } from '~/constants';
import { get } from 'lodash/fp';
import { store } from './store/configure-store';

import Application from './application';

const rootEl = document.querySelector('#root');

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj6be0a9h0fai01017lq6514z',
});

const wsClient = new SubscriptionClient('wss://subscriptions.graph.cool/v1/cj6be0a9h0fai01017lq6514z', {
  reconnect: true,
  connectionParams: {
    authToken: get('auth.token', localStorage.getItem(Cache.KEY)),
  },
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient,
);

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }
    const token = get('auth.token', localStorage.getItem(Cache.KEY));

    req.options.headers.authorization = token ? `Bearer ${token}` : null;
    next();
  },
}]);

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
});

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <LocaleProvider locale={require('antd/lib/locale-provider/pt_BR')}>
        <ApolloProvider client={client}>
          <Component store={store} />
        </ApolloProvider>
      </LocaleProvider>
    </AppContainer>,
    rootEl,
  );
};

render(Application);

if (module.hot) {
  module.hot.accept('./application', () => {
    const NextApp = require('./application').default;

    render(NextApp);
  });
}
