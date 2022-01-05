import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import LandLordHome from '../screens/LandLord/LandLordHome';
import Add from '../screens/LandLord/Add';
import Profile from '../screens/LandLord/Profile';
import {Ionicons, AntDesign} from '../helper/Icons';
import {Colors} from '../helper/Index';

const Tab = createMaterialTopTabNavigator();

const HomeStack = createSharedElementStackNavigator();
const AddStack = createSharedElementStackNavigator();
const ProfileStack = createSharedElementStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="ownerDashboard"
      screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="ownerDashboard" component={LandLordHome} />
    </HomeStack.Navigator>
  );
};
const AddStackScreen = () => {
  return (
    <AddStack.Navigator
      initialRouteName="Add"
      screenOptions={{headerShown: false}}>
      <AddStack.Screen name="AddHouse" component={Add} />
    </AddStack.Navigator>
  );
};
const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator
      initialRouteName="Profile"
      screenOptions={{headerShown: false}}>
      <ProfileStack.Screen name="Profile" component={Profile} />
    </ProfileStack.Navigator>
  );
};

const LandLordTopNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="LandlordHome"
      tabBarPosition="bottom"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarIndicatorStyle: {
          backgroundColor: 'white',
        },
        swipeEnabled: false,
      }}>
      <Tab.Screen
        name="LandlordHome"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({color, focused}) => (
            <Ionicons
              name="home"
              size={20}
              color={focused ? color : '#542e22'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddStackScreen}
        options={{
          tabBarIcon: ({color, focused}) => (
            <Ionicons
              name="add-circle-outline"
              size={20}
              color={focused ? color : '#542e22'}
              onPress={() => navigation.navigate('Details')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileStackScreen}
        options={{
          tabBarIcon: ({color, focused}) => (
            <AntDesign
              name="user"
              size={20}
              color={focused ? color : '#542e22'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default LandLordTopNavigation;
