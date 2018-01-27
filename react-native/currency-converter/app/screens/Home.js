import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { KeyboardAvoidingView, StatusBar } from 'react-native';
import { connect } from 'redux-zero/react';
import { actions as currencyActions } from '../store/currencies';
import {
  getConversionData,
  getConversionRate,
  getLastConvertedDate,
  getQuotePrice,
} from '../selectors/currencies';
import {
  ClearButton,
  Container,
  Header,
  InputWithButton,
  LastConverted,
  Logo,
} from '../components';

class Home extends Component {
  static propTypes = {
    amount: PropTypes.number.isRequired,
    baseCurrency: PropTypes.string.isRequired,
    changeAmount: PropTypes.func.isRequired,
    conversionRate: PropTypes.number.isRequired,
    isFetching: PropTypes.bool,
    lastConvertedDate: PropTypes.instanceOf(Date).isRequired,
    navigation: PropTypes.object.isRequired,
    quoteCurrency: PropTypes.string.isRequired,
    quotePrice: PropTypes.string.isRequired,
    swapCurrency: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isFetching: false,
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

  handleBaseAmount = amount => {
    const { changeAmount } = this.props;

    changeAmount(amount);
  };

  handleSwapCurrency = () => {
    const { swapCurrency } = this.props;

    swapCurrency();
  };

  handleOptionsPress = () => {
    const { navigation: { navigate } } = this.props;

    navigate('Options');
  };

  render() {
    const {
      amount,
      baseCurrency,
      conversionRate,
      isFetching,
      lastConvertedDate,
      quoteCurrency,
      quotePrice,
    } = this.props;

    return (
      <Container>
        <StatusBar barStyle="light-content" translucend={false} />
        <Header onPress={this.handleOptionsPress} />
        <KeyboardAvoidingView behavior="padding">
          <Logo />
          <InputWithButton
            buttonText={baseCurrency}
            keyboardType="numeric"
            onChangeText={this.handleBaseAmount}
            onPress={this.handlePressBaseCurrency}
            value={amount.toString()}
          />
          <InputWithButton
            buttonText={quoteCurrency}
            editable={false}
            onPress={this.handlePressQuoteCurrency}
            value={isFetching ? '...' : quotePrice}
          />
          <LastConverted
            base={baseCurrency}
            conversionRate={conversionRate}
            date={lastConvertedDate}
            quote={quoteCurrency}
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

const mapStateToProps = ({ currencies }) => ({
  amount: currencies.amount,
  baseCurrency: currencies.baseCurrency,
  conversionRate: getConversionRate(currencies),
  isFetching: getConversionData(currencies).isFetching,
  lastConvertedDate: getLastConvertedDate(currencies),
  quoteCurrency: currencies.quoteCurrency,
  quotePrice: getQuotePrice(currencies),
});

export default connect(mapStateToProps, currencyActions)(Home);
