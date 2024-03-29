import React, {useEffect} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import TopTabNavigator from './src/routes/TopTabNavigator';
import StackNavigator from './src/routes/StackNavigator';
import Geolocation from 'react-native-geolocation-service';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {PermissionsAndroid, Platform} from 'react-native';
import {Provider} from 'react-redux';
import store, {persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import LandlordNavigator from './src/routes/LandlordNavigator';
// import {enableLatestRenderer} from 'react-native-maps';

const Stack = createSharedElementStackNavigator();

const App = () => {
  // enableLatestRenderer();
  useEffect(() => {
    requestPermissions();
  }, []);

  const appTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#fff',
    },
  };

  async function requestPermissions() {
    if (Platform.OS === 'ios') {
      const auth = await Geolocation.requestAuthorization('whenInUse');
      if (auth === 'granted') {
        // console.log(auth);
      }
    }

    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log(granted);
      }
    }
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer theme={appTheme}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Details" component={StackNavigator} />
            <Stack.Screen name="Stack" component={TopTabNavigator} />
            <Stack.Screen name="Landlord" component={LandlordNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
        {/* AIzaSyBe0id34NY__yLzir1MCkz0t-kWmj3GHEo */}
      </PersistGate>
    </Provider>
  );
};

export default App;
