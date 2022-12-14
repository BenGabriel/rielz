import React from 'react';
import HouseDetails from '../screens/home/HouseDetails';
import Direction from '../screens/home/Direction';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import FullImages from '../screens/home/FullImages';
import LandlordDetails from '../screens/home/LandlordDetails';
import Register from '../screens/Auth/Register';
import Login from '../screens/Auth/Login';
import EditProfile from '../screens/profile/EditProfile';

const Stack = createSharedElementStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="HouseDetails" component={HouseDetails} />
      <Stack.Screen name="Direction" component={Direction} />
      <Stack.Screen name="FullImages" component={FullImages} />
      <Stack.Screen name="LandlordDetails" component={LandlordDetails} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
