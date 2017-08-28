import React from 'react';
import { Button, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Blogs from '~/screens/blogs';
import Login from '~/screens/login';
import NewBlog from '~/screens/new-blog';
import { SCREENS } from '~/constants';

export default StackNavigator({
  [SCREENS.LOGIN]: {
    screen: Login,
    navigationOptions: {
      title: SCREENS.LOGIN,
    },
  },
  [SCREENS.BLOGS]: {
    screen: Blogs,
    navigationOptions: ({ navigation: { navigate } }) => ({
      title: SCREENS.BLOGS,
      headerRight: (
        <View style={{ marginRight: 10 }}>
          <Button
            title="New blog"
            onPress={() => navigate(SCREENS.NEW_BLOG)}
          />
        </View>
      ),
    }),
  },
  [SCREENS.NEW_BLOG]: {
    screen: NewBlog,
    navigationOptions: {
      title: SCREENS.NEW_BLOG,
    },
  },
}, {
  initialRouteName: SCREENS.NEW_BLOG,
});
