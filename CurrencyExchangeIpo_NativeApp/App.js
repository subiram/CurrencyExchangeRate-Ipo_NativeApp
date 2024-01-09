import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from './redux/store';
import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ipo from './components/Ipo';
import CurrencyRate from './components/CurrencyRate';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Dashboard" component={DashboardTabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const DashboardTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="ExchangeRates" component={CurrencyRate} />
      <Tab.Screen name="UpcomingIPO" component={Ipo} />
    </Tab.Navigator>
  );
};

export default App;
