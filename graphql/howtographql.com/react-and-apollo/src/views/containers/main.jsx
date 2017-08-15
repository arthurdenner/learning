import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import * as selectors from '~/store/selectors';
import FlexElement from '~/views/components/flex-element';
import CreateLink from './create-link';
import Links from './links';
import Login from './login';
import Search from './search';
import Topbar from './topbar';
import styles from './main.less';

const { Content } = Layout;

const Main = ({ isAppLoaded }) => (
  <Layout
    style={{
      background: '#f8f8f8',
      position: 'absolute',
      overflow: 'hidden',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }}
  >
    {isAppLoaded && (
      <FlexElement full column>
        <Topbar />
        <Content className={styles.content}>
          <Switch>
            <Route path="/" exact component={Links} />
            <Route path="/submit" component={CreateLink} />
            <Route path="/login" component={Login} />
            <Route path="/search" component={Search} />
          </Switch>
        </Content>
      </FlexElement>
    )}

  </Layout>
);

Main.propTypes = {
  isAppLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAppLoaded: selectors.isAppLoaded(state),
});

export default connect(mapStateToProps)(Main);
