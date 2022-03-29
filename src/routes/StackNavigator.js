import React from 'react';
import HouseDetails from '../screens/home/HouseDetails';
import Direction from '../screens/home/Direction';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import FullImages from '../screens/home/FullImages';
import LandlordDetails from '../screens/home/LandlordDetails';
import LandLordTopNavigation from './LandLordTopNavigation';
import Register from '../screens/LandlordAuth/Register';
import Login from '../screens/LandlordAuth/Login';
import LandlordHouseDetails from '../screens/LandLord/LandlordHouseDetails';
import EditHouse from '../screens/LandLord/EditHouse';
import AddTenant from '../screens/LandLord/AddTenant';

const Stack = createSharedElementStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HouseDetails" component={HouseDetails} />
      <Stack.Screen name="Direction" component={Direction} />
      <Stack.Screen name="FullImages" component={FullImages} />
      <Stack.Screen name="LandlordDetails" component={LandlordDetails} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="LandLord" component={LandLordTopNavigation} />
      <Stack.Screen
        name="LandlordHouseDetails"
        component={LandlordHouseDetails}
      />
      <Stack.Screen name="EditHouse" component={EditHouse} />
      <Stack.Screen name="AddTenant" component={AddTenant} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
