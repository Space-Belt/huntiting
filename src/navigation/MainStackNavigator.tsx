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
import MyHistoryScreen from '../screens/MyHistoryScreen';
import Terms from '../screens/Terms';
import {RootStackParamList} from '../App';
import FindAuth from '../screens/FindAuth';
import FindUserNameResult from '../components/FindAuth/FindUserNameResult';
import ChangePassword from '../components/FindAuth/ChangePassword';
import ChangePasswordResult from '../components/FindAuth/ChangePasswordResult';
import HuntRequestScreen from '../screens/HuntRequestScreen';

const MainStack = createStackNavigator<RootStackParamList>();

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="SignInScreen">
      <MainStack.Screen name="SignInScreen" component={SignInScreen} />
      <MainStack.Screen name="SignUpScreen" component={SignUpScreen} />
      <MainStack.Screen name="FindAuth" component={FindAuth} />
      <MainStack.Screen
        name="FindUserNameResult"
        component={FindUserNameResult}
      />
      <MainStack.Screen name="ChangePassword" component={ChangePassword} />
      <MainStack.Screen
        name="ChangePasswordResult"
        component={ChangePasswordResult}
      />
      <MainStack.Screen name="BottomTab" component={BottomTabNavigator} />
      <MainStack.Screen name="Setting" component={Setting} />
      <MainStack.Screen name="ProfileEdit" component={ProfileEdit} />
      <MainStack.Screen name="detail" component={HuntDetail} />
      <MainStack.Screen name="request" component={HuntRequestScreen} />
      <MainStack.Screen name="MyHistoryScreen" component={MyHistoryScreen} />
      <MainStack.Screen name="NoticeScreen" component={NoticeScreen} />
      <MainStack.Screen name="chatRoom" component={ChatRoom} />
      <MainStack.Screen name="Terms" component={Terms} />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;

const styles = StyleSheet.create({});
