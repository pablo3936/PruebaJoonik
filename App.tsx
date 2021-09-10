/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {navigationRef} from './src/helpers/navigation';

import AuthLoginEmailPage from './src/screens/auth/login-email';
import AuthLoginPasswordPage from './src/screens/auth/login-password';
import AppHomePage from './src/screens/app/home';

import UiToast from './src/components/_partials/toast';

import {toastRef} from './src/helpers/toast';

const AppStack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer ref={navigationRef}>
        <AppStack.Navigator>
          <AppStack.Screen
            name="LoginEmail"
            component={AuthLoginEmailPage}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <AppStack.Screen
            name="LoginPassword"
            component={AuthLoginPasswordPage}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <AppStack.Screen
            name="HomePage"
            component={AppHomePage}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
        </AppStack.Navigator>
      </NavigationContainer>
      <UiToast ref={toastRef} />
    </SafeAreaProvider>
  );
};

export default App;
