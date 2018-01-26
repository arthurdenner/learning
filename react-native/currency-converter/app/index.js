import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import CurrencyList from './screens/CurrencyList';
import Home from './screens/Home';
import Options from './screens/Options';
import Themes from './screens/Themes';

EStyleSheet.build({
  $border: '#E2E2E2',
  $darkText: '#343434',
  $inputText: '#797979',
  $lightGray: '#F0F0F0',
  $white: '#FFFFFF',

  $primaryBlue: '#4F6D7A',
  $primaryOrange: '#D57A66',
  $primaryGreen: '#00BD9D',
  $primaryPurple: '#9E768F',
});

export default () => <Themes />;
