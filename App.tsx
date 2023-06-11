/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Provider} from 'react-redux';
import {store, persistor} from './src/store/store';
import { PersistGate } from 'redux-persist/integration/react'

import {MainScreen} from './src/screens/main/index';
import {EditScreen} from './src/screens/edit/index';
import {AddScreen} from './src/screens/add/index';
import {LoginScreen} from './src/screens/login/index';

export type RootStackParamList = {
  Main: undefined;
  Edit: { taskId: number | null };
  Add: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="Edit" component={EditScreen} initialParams={{ taskId: null }} />
            <Stack.Screen name="Add" component={AddScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
