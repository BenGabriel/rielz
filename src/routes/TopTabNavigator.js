import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Home from '../screens/home/Home';
import Map from '../screens/maps/Map';
import Search from '../screens/search/Search';
import {Ionicons, AntDesign} from '../common/Icons';
import {Colors} from '../helper/Index';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import Profile from '../screens/LandLord/Profile';
import EditProfile from '../screens/LandLord/EditProfile';
import UserHome from '../screens/LandLord/UserHome';
import Add from '../screens/LandLord/Add';

const Tab = createMaterialTopTabNavigator();
const HomeStack = createSharedElementStackNavigator();
const SearchStack = createSharedElementStackNavigator();
const MapStack = createSharedElementStackNavigator();
const ProfileStack = createSharedElementStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="dashboard"
      screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="dashboard" component={Home} />
    </HomeStack.Navigator>
  );
};
const SearchStackScreen = () => {
  return (
    <SearchStack.Navigator
      initialRouteName="search"
      screenOptions={{headerShown: false}}>
      <SearchStack.Screen name="search" component={Search} />
    </SearchStack.Navigator>
  );
};
const MapStackScreen = () => {
  return (
    <MapStack.Navigator
      initialRouteName="mapview"
      screenOptions={{headerShown: false}}>
      <MapStack.Screen name="mapview" component={Map} />
    </MapStack.Navigator>
  );
};

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator screenOptions={{headerShown: false}}>
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen name="EditProfile" component={EditProfile} />
      <ProfileStack.Screen name="OwnerDashboard" component={UserHome} />
      <ProfileStack.Screen name="AddHouse" component={Add} />
    </ProfileStack.Navigator>
  );
};

const TopTabNavigator = ({navigation}) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
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
        name="Home"
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
        name="Search"
        component={SearchStackScreen}
        options={{
          tabBarIcon: ({color, focused}) => (
            <Ionicons
              name="search"
              size={20}
              color={focused ? color : '#542e22'}
              onPress={() => navigation.navigate('Details')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapStackScreen}
        options={{
          tabBarIcon: ({color, focused}) => (
            <AntDesign
              name="find"
              size={20}
              color={focused ? color : '#542e22'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
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

export default TopTabNavigator;
