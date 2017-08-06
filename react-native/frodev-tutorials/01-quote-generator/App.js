import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Font } from 'expo';
import quotes from './assets/quotes/quotes';

export default class App extends React.Component {
  state = {
    activeQuoteIndex: 0,
    isFontsLoaded: false,
  };

  componentDidMount() {
    Font.loadAsync({
      CreteRound: require('./assets/fonts/CreteRound-Regular.ttf'),
      Elsie: require('./assets/fonts/Elsie-Regular.ttf'),
    }).then(() => this.setState({
      isFontsLoaded: true,
    }));
  }

  nextQuote = () => {
    const { activeQuoteIndex } = this.state;
    if (activeQuoteIndex < quotes.length - 2) {
      this.setState({
        activeQuoteIndex: activeQuoteIndex + 1,
      });
    } else {
      this.setState({
        activeQuoteIndex: 0,
      });
    }
  }

  render() {
    const { activeQuoteIndex, isFontsLoaded } = this.state;
    const activeQuote = quotes[activeQuoteIndex];

    return (
      <View style={styles.container}>
        <Text style={[styles.message, isFontsLoaded && { fontFamily: 'Elsie' }]}>
          {activeQuote.message}
        </Text>
        <Text style={[styles.author, isFontsLoaded && { fontFamily: 'CreteRound' }]}>
          {activeQuote.author}
        </Text>
        <View style={styles.button}>
          <Button
            title="Next quote"
            onPress={this.nextQuote}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  message: {
    fontSize: 24,
    marginBottom: 10,
  },
  author: {
    fontSize: 18,
  },
  button: {
    position: 'absolute',
    bottom: 40,
  }
});
