import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, TextStyle} from 'react-native';
import HomeIcon from '../assets/icons/homeIcon.svg';
import PersonIcon from '../assets/icons/personIcon.svg';
import ChatIcon from '../assets/icons/chatting.svg';
import Request from '../assets/icons/requestAdd.svg';
import ChatList from '../screens/ChatList';
import HuntListScreen from '../screens/HuntListScreen';
import HuntRequestScreen from '../screens/HuntRequestScreen';
import MyPageScreen from '../screens/MyPageScreen';
import {COLORS, SPACING} from '../theme/theme';
import {RootStackParamList} from '../App';

const BottomTab = createBottomTabNavigator<RootStackParamList>();

const BottomTabNavigator = () => {
  const iconRendering = (iconName: string, focus: boolean) => {
    const focusedColor: TextStyle = {
      color: COLORS.Orange,
    };

    const unFocusesColor: TextStyle = {
      color: '#57545458',
    };

    if (iconName === 'home') {
      return (
        <HomeIcon
          style={[styles.iconStyle, focus ? focusedColor : unFocusesColor]}
        />
      );
    }
    if (iconName === 'request') {
      return (
        <Request
          style={[styles.iconStyle, focus ? focusedColor : unFocusesColor]}
        />
      );
    }
    if (iconName === 'chat') {
      return (
        <ChatIcon
          style={[styles.iconStyle, focus ? focusedColor : unFocusesColor]}
        />
      );
    }
    if (iconName === 'profile') {
      return (
        <PersonIcon
          style={[styles.iconStyle, focus ? focusedColor : unFocusesColor]}
        />
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
        name="home"
        component={HuntListScreen}
        options={{
          tabBarLabel: '홈',
          tabBarActiveTintColor: COLORS.Orange,
          headerPressColor: COLORS.Orange,
          headerTitleStyle: {
            color: COLORS.Orange,
          },
          tabBarShowLabel: true,
          tabBarIcon: ({focused}) => {
            return iconRendering('home', focused);
          },
        }}
      />

      <BottomTab.Screen
        name="request"
        component={HuntRequestScreen}
        options={{
          tabBarLabel: '요청',
          tabBarActiveTintColor: COLORS.Orange,
          tabBarShowLabel: true,
          tabBarIcon: ({focused}) => {
            return iconRendering('request', focused);
          },
        }}
      />
      <BottomTab.Screen
        name="chatList"
        component={ChatList}
        options={{
          tabBarLabel: '채팅',
          tabBarActiveTintColor: COLORS.Orange,
          tabBarShowLabel: true,
          tabBarIcon: ({focused}) => {
            return iconRendering('chat', focused);
          },
        }}
      />
      <BottomTab.Screen
        name="my_page"
        component={MyPageScreen}
        options={{
          tabBarLabel: '프로필',
          tabBarActiveTintColor: COLORS.Orange,
          tabBarShowLabel: true,
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
