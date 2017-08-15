import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Icon, Layout, Menu } from 'antd';
import actions from '~/store/actions';
import * as selectors from '~/store/selectors';
import FlexElement from '~/views/components/flex-element';
import styles from './topbar.less';

const { Header } = Layout;

const Topbar = ({ handleClick, isUserLogged, logout, selectedTab }) => (
  <Header className={styles.header}>
    <FlexElement full justify="space-between">
      <Menu
        className={styles.menu}
        onClick={handleClick}
        selectedKeys={selectedTab}
        mode="horizontal"
      >
        <Menu.Item key="links">
          <NavLink to="/">
            <span>
              <Icon type="link" />
              <span className="nav-text">Links</span>
            </span>
          </NavLink>
        </Menu.Item>
        {isUserLogged && (
          <Menu.Item key="submit">
            <NavLink to="/submit">
              <span>
                <Icon type="plus" />
                <span className="nav-text">Submit a link</span>
              </span>
            </NavLink>
          </Menu.Item>
        )}
        <Menu.Item key="search">
          <NavLink to="/search">
            <span>
              <Icon type="search" />
              <span className="nav-text">Search</span>
            </span>
          </NavLink>
        </Menu.Item>
      </Menu>
      {isUserLogged ? (
        <Menu
          className={styles.menu}
          onClick={logout}
          selectedKeys={selectedTab}
          mode="horizontal"
        >
          <Menu.Item>
            <span>
              <Icon type="logout" />
              <span className="nav-text">Logout</span>
            </span>
          </Menu.Item>
        </Menu>
      ) : (
        <Menu
          className={styles.menu}
          onClick={handleClick}
          selectedKeys={selectedTab}
          mode="horizontal"
        >
          <Menu.Item key="login">
            <NavLink to="/login">
              <span>
                <Icon type="login" />
                <span className="nav-text">Login</span>
              </span>
            </NavLink>
          </Menu.Item>
        </Menu>
      )}
    </FlexElement>
  </Header>
);

Topbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isUserLogged: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  selectedTab: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  isUserLogged: selectors.isUserLogged(state),
  selectedTab: selectors.getSelectedTab(state),
});

const mapDispatchToProps = dispatch => ({
  handleClick: ({ key }) => dispatch(actions.app.selectTab([key])),
  logout: () => dispatch(actions.auth.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Topbar);
