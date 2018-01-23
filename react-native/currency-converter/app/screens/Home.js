import React from 'react';
import { StatusBar } from 'react-native';
import { Container, Logo } from '../components';

export default () => (
  <Container>
    <StatusBar barStyle="light-content" translucend={false} />
    <Logo />
  </Container>
);
