import React from 'react';
import { StackNavigator } from 'react-navigation';
import Login from '~/screens/login';

export default StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login',
    },
  },
});
