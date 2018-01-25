import React, { Component } from 'react';
import { KeyboardAvoidingView, StatusBar } from 'react-native';
import {
  ClearButton,
  Container,
  InputWithButton,
  LastConverted,
  Logo,
} from '../components';

const TEMP_BASE_CURRENCY = 'USD';
const TEMP_BASE_PRICE = '100';
const TEMP_QUOTE_CURRENCY = 'GBP';
const TEMP_QUOTE_PRICE = '79.74';
const TEMP_CONVERSION_RATE = 0.8493;
const TEMP_CONVERSION_DATE = new Date();

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

  handleSwapCurrency = () => {
    console.log('press swap');
  };

  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" translucend={false} />
        <KeyboardAvoidingView behavior="padding">
          <Logo />
          <InputWithButton
            buttonText={TEMP_BASE_CURRENCY}
            defaultValue={TEMP_BASE_PRICE}
            keyboardType="numeric"
            onChangeText={this.handleChangeText}
            onPress={this.handlePressBaseCurrency}
          />
          <InputWithButton
            buttonText={TEMP_QUOTE_CURRENCY}
            editable={false}
            onPress={this.handlePressQuoteCurrency}
            value={TEMP_QUOTE_PRICE}
          />
        </KeyboardAvoidingView>
        <LastConverted
          base={TEMP_BASE_CURRENCY}
          conversionRate={TEMP_CONVERSION_RATE}
          date={TEMP_CONVERSION_DATE}
          quote={TEMP_QUOTE_CURRENCY}
        />
        <ClearButton
          onPress={this.handleSwapCurrency}
          text="Reverse Currencies"
        />
      </Container>
    );
  }
}

export default Home;
