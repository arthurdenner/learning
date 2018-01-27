import { StackNavigator } from 'react-navigation';
import Home from '../screens/Home';
import CurrencyList from '../screens/CurrencyList';

const Navigation = StackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: () => null,
      },
    },
    CurrencyList: {
      screen: CurrencyList,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.title,
      }),
    },
  },
  {
    mode: 'modal',
  }
);

export default Navigation;
