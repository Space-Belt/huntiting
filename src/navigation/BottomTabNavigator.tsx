import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HuntRequestScreen from '../screens/HuntRequestScreen';
import {StyleSheet} from 'react-native';
import HuntListScreen from '../screens/HuntListScreen';
import MyPageScreen from '../screens/MyPageScreen';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: style.bottomTabStyle,
      }}>
      <BottomTab.Screen name="list" component={HuntListScreen} />
      <BottomTab.Screen name="request" component={HuntRequestScreen} />
      <BottomTab.Screen name="my_page" component={MyPageScreen} />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;

const style = StyleSheet.create({
  bottomTabStyle: {
    backgroundColor: 'black',
    borderTopWidth: 0,
  },
});
