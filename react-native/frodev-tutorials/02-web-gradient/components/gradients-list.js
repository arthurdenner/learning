import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import sampleSize from 'lodash/sampleSize';
import allGradients from '../assets/gradients.json';
import ItemList from './item-list';

export default class GradientsList extends React.Component {
  state = {
    gradients: [],
  };

  componentDidMount() {
    this.changeGradients();
  }

  changeGradients = () => this.setState({
    gradients: sampleSize(allGradients, 15),
  });

  render() {
    const { gradients } = this.state;

    return (
      <FlatList
        style={[styles.list]}
        data={gradients}
        keyExtractor={(item, idx) => idx}
        renderItem={ItemList}
        refreshing={false}
        onRefresh={this.changeGradients}
        ItemSeparatorComponent={() =>
          <View style={[styles.separator]} />
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  list: {
    marginBottom: 10,
  },
});
