import React from 'react';
import {View, Text} from 'react-native';
import Homescreen from './src/screens/Homescreen';
import Profile from './src/screens/Profile';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {legacy_createStore as createStore, applyMiddleware} from 'redux';
import reducer from './src/reducers/reducer';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

const Stack = createNativeStackNavigator();
const myStore = createStore(reducer, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={myStore}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Homescreen} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
