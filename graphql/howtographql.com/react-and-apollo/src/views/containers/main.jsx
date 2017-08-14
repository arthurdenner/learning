import React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';
import CreateLink from './create-link';
import Links from './links';

const Main = () => (
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
    <Route path="/" exact component={Links} />
    <Route path="/create" component={CreateLink} />
  </Layout>
);

export default Main;
