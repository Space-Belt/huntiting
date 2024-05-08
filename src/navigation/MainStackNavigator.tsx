import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import {StyleSheet} from 'react-native';

import BottomTabNavigator from './BottomTabNavigator';

const MainStack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="BottomTab">
      <MainStack.Screen name="BottomTab" component={BottomTabNavigator} />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;

const styles = StyleSheet.create({});
