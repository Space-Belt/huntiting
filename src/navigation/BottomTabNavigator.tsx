import React, {ReactElement} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HuntRequestScreen from '../screens/HuntRequestScreen';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import HuntListScreen from '../screens/HuntListScreen';
import MyPageScreen from '../screens/MyPageScreen';
import {COLORS, SPACING} from '../theme/theme';
import HomeIcon from '../assets/icons/homeIcon.svg';
import Request from '../assets/icons/request.svg';
import PersonIcon from '../assets/icons/personIcon.svg';
import ChatList from '../screens/ChatList';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const iconRendering = (iconName: string, focus: boolean) => {
    const focusedColor: TextStyle = {
      color: '#000',
    };
    if (iconName === 'home') {
      return <HomeIcon style={[styles.iconStyle, focus ? focusedColor : {}]} />;
    }
    if (iconName === 'request') {
      return <Request style={[styles.iconStyle, focus ? focusedColor : {}]} />;
    }
    if (iconName === 'profile') {
      return (
        <PersonIcon style={[styles.iconStyle, focus ? focusedColor : {}]} />
      );
    }
  };
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: styles.bottomTabStyle,
      }}>
      <BottomTab.Screen
        name="list"
        component={HuntListScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => {
            return iconRendering('home', focused);
          },
        }}
      />

      <BottomTab.Screen
        name="request"
        component={HuntRequestScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => {
            return iconRendering('request', focused);
          },
        }}
      />
      <BottomTab.Screen
        name="chatList"
        component={ChatList}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => {
            return iconRendering('request', focused);
          },
        }}
      />
      <BottomTab.Screen
        name="my_page"
        component={MyPageScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => {
            return iconRendering('profile', focused);
          },
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  bottomTabStyle: {
    // backgroundColor: 'black',
    borderTopWidth: 0,
  },
  activeTabBackground: {
    backgroundColor: COLORS.Black,
    padding: SPACING.space_18,
    borderRadius: SPACING.space_18 * 10,
  },
  iconStyle: {
    width: 55,
    height: 55,
    color: '#eee',
  },
});
