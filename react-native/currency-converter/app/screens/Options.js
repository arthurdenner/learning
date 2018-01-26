import React, { Component } from 'react';
import { ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ListItem, Separator } from '../components/List';

const ICON_PREFIX = Platform.OS === 'ios' ? 'ios' : 'md';
const ICON_COLOR = '#898989';
const ICON_SIZE = 23;

class Options extends Component {
  handleThemesPress = () => {
    console.log('handle themes');
  };

  handleSitePress = () => {
    console.log('handle site');
  };

  render() {
    return (
      <ScrollView>
        <ListItem
          customIcon={
            <Ionicons
              color={ICON_COLOR}
              name={`${ICON_PREFIX}-arrow-forward`}
              size={ICON_SIZE}
            />
          }
          onPress={this.handleThemesPress}
          text="Themes"
        />
        <Separator />
        <ListItem
          customIcon={
            <Ionicons
              color={ICON_COLOR}
              name={`${ICON_PREFIX}-link`}
              size={ICON_SIZE}
            />
          }
          onPress={this.handleSitePress}
          text="Fixer.io"
        />
        <Separator />
      </ScrollView>
    );
  }
}

export default Options;
