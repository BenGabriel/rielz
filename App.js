import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';
import TopTabNavigator from './src/routes/TopTabNavigator';
import StackNavigator from './src/routes/StackNavigator';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
// import Styles from './src/helper/Styles';

const Stack = createSharedElementStackNavigator();

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({fade: true});
    }, 5000);
  });
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Stack" component={TopTabNavigator} />
        <Stack.Screen
          name="Details"
          component={StackNavigator}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
