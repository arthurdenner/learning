import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, Route, Switch } from 'react-router-dom';
import { Icon, Layout, Menu } from 'antd';
import actions from '~/store/actions';
import * as selectors from '~/store/selectors';
import { MENU_OPTIONS } from '~/constants';
import FlexElement from '~/views/components/flex-element';
import CreateLink from './create-link';
import Links from './links';
import styles from './main.less';

const { Content, Header } = Layout;

const Main = ({ handleClick, isAppLoaded, selectedTab }) => (
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
        <Header className={styles.header}>
          <Menu
            className={styles.menu}
            onClick={handleClick}
            selectedKeys={selectedTab}
            mode="horizontal"
          >
            {MENU_OPTIONS.map(option => (
              <Menu.Item key={option.key}>
                <NavLink to={option.route}>
                  <span>
                    <Icon type={option.icon} />
                    <span className="nav-text">{option.name}</span>
                  </span>
                </NavLink>
              </Menu.Item>
            ))}
          </Menu>
        </Header>
        <Content className={styles.content}>
          <Switch>
            <Route path="/" exact component={Links} />
            <Route path="/submit" component={CreateLink} />
          </Switch>
        </Content>
      </FlexElement>
    )}

  </Layout>
);

Main.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isAppLoaded: PropTypes.bool.isRequired,
  selectedTab: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  selectedTab: selectors.getSelectedTab(state),
  isAppLoaded: selectors.isAppLoaded(state),
});

const mapDispatchToProps = dispatch => ({
  handleClick: ({ key }) => dispatch(actions.app.selectTab([key])),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
