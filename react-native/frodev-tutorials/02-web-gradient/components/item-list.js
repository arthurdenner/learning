import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo';
import find from 'lodash/find';
import tn from 'tinycolor2';

const calcColor = colors => !!find(colors, c => tn(c).isDark()) ? styles.white : {};

const ItemList = ({ item }) => (
  <LinearGradient
    style={[styles.container]}
    colors={item.colors}
    start={[0, 0.5]}
    end={[1, 0.5]}
  >
    <Text style={[styles.text, calcColor(item.colors)]}>
      {item.name}
    </Text>
    <View style={[styles.colors]}>
      <Text style={[styles.text, calcColor(item.colors)]}>
        {item.colors[0]}
      </Text>
      <Text style={[styles.text, calcColor(item.colors), { marginLeft: 10 }]}>
        {item.colors[1]}
      </Text>
    </View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  white: {
    color: '#fff',
  },
  colors: {
    flexDirection: 'row',
  },
  text: {
    backgroundColor: 'transparent',
  },
});

export default ItemList;
