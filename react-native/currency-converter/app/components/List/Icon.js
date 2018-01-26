import React from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';
import styles from './styles';

const Icon = ({ checkmark, visible }) => {
  const iconStyles = [styles.icon];

  if (visible) {
    iconStyles.push(styles.iconVisible);
  }

  return (
    <View style={iconStyles}>
      {checkmark && (
        <Image
          resizeMode="contain"
          source={require('./images/check.png')}
          style={styles.checkIcon}
        />
      )}
    </View>
  );
};

Icon.propTypes = {
  checkmark: PropTypes.bool,
  visible: PropTypes.bool,
};

Icon.defaultProps = {
  checkmark: true,
  visible: true,
};

export default Icon;
