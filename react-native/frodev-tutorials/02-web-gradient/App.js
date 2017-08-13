import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GradientsList from './components/gradients-list';

const App =() => (
  <View style={[styles.container]}>
    <View style={[styles.header]}>
      <Text style={[styles.h1]}>
        Web Gradients
      </Text>
      <Text style={[styles.h2]}>
        Colors from webgradients.com
      </Text>
    </View>
    <GradientsList />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  header: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  h1: {
    fontSize: 24,
  },
  h2: {
    fontSize: 18,
  }
});

export default App;
