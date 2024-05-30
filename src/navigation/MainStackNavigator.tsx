import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import {StyleSheet} from 'react-native';

import BottomTabNavigator from './BottomTabNavigator';
import Setting from '../screens/Setting';
import HuntDetail from '../screens/HuntDetail';
import ChatRoom from '../screens/ChatRoom';
import ProfileEdit from '../screens/ProfileEdit';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import NoticeScreen from '../screens/NoticeScreen';

const MainStack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="BottomTab">
      <MainStack.Screen name="SignInScreen" component={SignInScreen} />
      <MainStack.Screen name="SignUpScreen" component={SignUpScreen} />
      <MainStack.Screen name="BottomTab" component={BottomTabNavigator} />
      <MainStack.Screen name="Setting" component={Setting} />
      <MainStack.Screen name="ProfileEdit" component={ProfileEdit} />
      <MainStack.Screen name="detail" component={HuntDetail} />
      <MainStack.Screen name="NoticeScreen" component={NoticeScreen} />
      <MainStack.Screen name="chatRoom" component={ChatRoom} />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;

const styles = StyleSheet.create({});
