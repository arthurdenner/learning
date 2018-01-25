import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Container, InputWithButton, Logo } from '../components';

class Home extends Component {
  handlePressBaseCurrency = () => {
    console.log('press base');
  };

  handlePressQuoteCurrency = () => {
    console.log('press quote');
  };

  handleChangeText = text => {
    console.log('change text', text);
  };

  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" translucend={false} />
        <Logo />
        <InputWithButton
          buttonText="USD"
          defaultValue="100"
          keyboardType="numeric"
          onChangeText={this.handleChangeText}
          onPress={this.handlePressBaseCurrency}
        />
        <InputWithButton
          buttonText="GBP"
          editable={false}
          onPress={this.handlePressQuoteCurrency}
          value="79.74"
        />
      </Container>
    );
  }
}

export default Home;
