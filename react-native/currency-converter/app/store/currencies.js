export const initialState = {
  baseCurrency: 'USD',
  quoteCurrency: 'GBP',
  amount: 100,
  error: null,
  conversions: {},
};

export const actions = store => ({
  swapCurrency: ({ currencies }) => {
    store.setState({
      currencies: {
        ...currencies,
        baseCurrency: currencies.quoteCurrency,
        quoteCurrency: currencies.baseCurrency,
      },
    });
  },
  changeAmount: ({ currencies }, actionPayload) => {
    store.setState({
      currencies: {
        ...currencies,
        amount: parseFloat(actionPayload) || 0,
      },
    });
  },
});
