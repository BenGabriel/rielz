import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import UserHome from '../screens/LandLord/UserHome';
import Add from '../screens/LandLord/Add';
import AddTenant from '../screens/LandLord/AddTenant';
import EditHouse from '../screens/LandLord/EditHouse';
import MyHouseDetails from '../screens/LandLord/MyHouseDetails';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import LandlordProfile from '../screens/LandLord/LandlordProfile';

const Stack = createSharedElementStackNavigator();

const LandlordNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="OwnerDashboard" component={UserHome} />
      <Stack.Screen name="AddHouse" component={Add} />
      <Stack.Screen name="MyHouseDetails" component={MyHouseDetails} />
      <Stack.Screen name="EditHouse" component={EditHouse} />
      <Stack.Screen name="AddTenant" component={AddTenant} />
      <Stack.Screen name="LandlordProfile" component={LandlordProfile} />
    </Stack.Navigator>
  );
};

export default LandlordNavigator;

const styles = StyleSheet.create({});
