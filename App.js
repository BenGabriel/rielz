import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';
import TopTabNavigator from './src/routes/TopTabNavigator';
import StackNavigator from './src/routes/StackNavigator';
import Geolocation from 'react-native-geolocation-service';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {PermissionsAndroid, Platform} from 'react-native';
// import Styles from './src/helper/Styles';

const Stack = createSharedElementStackNavigator();

const App = () => {
  useEffect(() => {
    requestPermissions();
    setTimeout(() => {
      RNBootSplash.hide({fade: true});
    }, 2000);
  });

  async function requestPermissions() {
    if (Platform.OS === 'ios') {
      const auth = await Geolocation.requestAuthorization('whenInUse');
      if (auth === 'granted') {
        console.log(auth);
      }
    }

    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log(granted);
      }
    }
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="Details"
          component={StackNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Stack" component={TopTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
