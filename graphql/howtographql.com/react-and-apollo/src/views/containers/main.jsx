import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
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
            <Route exact path="/" render={() => <Redirect to="/new/1" />} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/submit" component={CreateLink} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/top" component={Links} />
            <Route exact path="/new/:page" component={Links} />
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
