import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from 'antd';
import { AppContainer } from 'react-hot-loader';
import { ApolloProvider, createNetworkInterface, ApolloClient } from 'react-apollo';
import { store } from './store/configure-store';
import Application from './application';

const rootEl = document.querySelector('#root');

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj6be0a9h0fai01017lq6514z',
});

const client = new ApolloClient({
  networkInterface,
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
