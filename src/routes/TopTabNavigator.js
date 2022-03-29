import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Home from '../screens/home/Home';
import Map from '../screens/maps/Map';
import Search from '../screens/search/Search';
import {Ionicons, AntDesign} from '../common/Icons';
import {Colors} from '../helper/Index';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

const Tab = createMaterialTopTabNavigator();
const HomeStack = createSharedElementStackNavigator();
const SearchStack = createSharedElementStackNavigator();
const MapStack = createSharedElementStackNavigator();

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
    </Tab.Navigator>
  );
};

export default TopTabNavigator;
