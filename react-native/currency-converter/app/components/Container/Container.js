import React from 'react';
import PropTypes from 'prop-types';
import { Keyboard, View, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';

const Container = ({ children }) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>{children}</View>
  </TouchableWithoutFeedback>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
