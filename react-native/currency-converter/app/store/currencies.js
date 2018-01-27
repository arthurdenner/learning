export const initialState = {
  baseCurrency: 'USD',
  quoteCurrency: 'GBP',
  amount: 100,
  conversions: {},
  error: null,
};

const setConversions = ({ conversions }, action) => {
  let conversion = {
    isFetching: true,
    date: '',
    rates: {},
  };

  if (conversions[action.value]) {
    conversion = conversions[action.value];
  }

  return {
    ...conversions,
    [action.value]: conversion,
  };
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
  changeAmount: ({ currencies }, action) => {
    store.setState({
      currencies: {
        ...currencies,
        amount: parseFloat(action) || 0,
      },
    });
  },
  changeCurrency: ({ currencies }, action) => {
    store.setState({
      currencies: {
        ...currencies,
        [action.type]: action.value,
        conversions: setConversions(currencies, action),
      },
    });
  },
});
