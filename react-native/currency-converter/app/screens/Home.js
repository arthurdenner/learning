import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { KeyboardAvoidingView, StatusBar } from 'react-native';
import {
  ClearButton,
  Container,
  Header,
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
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  handlePressBaseCurrency = () => {
    const { navigation: { navigate } } = this.props;

    navigate('CurrencyList', {
      title: 'Base Currency',
    });
  };

  handlePressQuoteCurrency = () => {
    const { navigation: { navigate } } = this.props;

    navigate('CurrencyList', {
      title: 'Quote Currency',
    });
  };

  handleChangeText = text => {
    console.log('change text', text);
  };

  handleSwapCurrency = () => {
    console.log('press swap');
  };

  handleOptionsPress = () => {
    console.log('press options');
  };

  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" translucend={false} />
        <Header onPress={this.handleOptionsPress} />
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
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

export default Home;
