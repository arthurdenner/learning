import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, StatusBar, View } from 'react-native';
import { ListItem, Separator } from '../components/List';
import currencies from '../data/currencies';

const TEMP_CURRENT_CURRENCY = 'CAD';

class CurrencyList extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  handlePress = () => {
    const { navigation: { goBack } } = this.props;

    goBack(null);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="default" translucent={false} />
        <FlatList
          data={currencies}
          renderItem={({ item }) => (
            <ListItem
              onPress={this.handlePress}
              selected={item === TEMP_CURRENT_CURRENCY}
              text={item}
            />
          )}
          keyExtractor={item => item}
          ItemSeparatorComponent={Separator}
        />
      </View>
    );
  }
}

export default CurrencyList;
