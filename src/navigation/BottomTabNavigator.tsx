import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleProp, StyleSheet, TextStyle, ViewStyle} from 'react-native';
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

interface IIconType {
  tabBarLabel?: string;
  tabBarIcon?: ({
    focused: boolean,
    color: string,
    size: number,
  }) => React.ReactNode;
  tabBarAccessibilityLabel?: string;
  tabBarTestID?: string;
  tabBarAllowFontScaling?: boolean;
  tabBarShowLabel?: boolean;
  tabBarShowIcon?: boolean;
  tabBarActiveTintColor?: string;
  tabBarInactiveTintColor?: string;
  tabBarActiveBackgroundColor?: string;
  tabBarInactiveBackgroundColor?: string;
  tabBarStyle?: StyleProp<ViewStyle>;
  tabBarItemStyle?: StyleProp<ViewStyle>;
  tabBarLabelStyle?: StyleProp<TextStyle>;
  tabBarItemTestID?: string;
}

const BottomTabNavigator = (): IIconType => {
  const iconRendering = (iconName: string) => {
    const focusedColor: TextStyle = {
      color: COLORS.Orange,
    };

    const unFocusesColor: TextStyle = {
      color: '#57545458',
    };

    if (iconName === 'home') {
      return {
        tabBarLabel: '홈',
        tabBarActiveTintColor: COLORS.Orange,
        headerPressColor: COLORS.Orange,
        headerTitleStyle: {
          color: COLORS.Orange,
        },
        tabBarShowLabel: true,
        tabBarIcon: ({focused}) => {
          return (
            <HomeIcon
              style={[
                styles.iconStyle,
                focused ? focusedColor : unFocusesColor,
              ]}
            />
          );
        },
      };
    }
    if (iconName === 'request') {
      return {
        tabBarLabel: '요청',
        tabBarActiveTintColor: COLORS.Orange,
        tabBarShowLabel: true,
        tabBarIcon: ({focused}) => {
          return (
            <Request
              style={[
                styles.iconStyle,
                focused ? focusedColor : unFocusesColor,
              ]}
            />
          );
        },
      };
    }
    if (iconName === 'chat') {
      return {
        tabBarLabel: '채팅',
        tabBarActiveTintColor: COLORS.Orange,
        tabBarShowLabel: true,
        tabBarIcon: ({focused}) => (
          <ChatIcon
            style={[styles.iconStyle, focused ? focusedColor : unFocusesColor]}
          />
        ),
      };
    }
    if (iconName === 'profile') {
      return {
        tabBarLabel: '프로필',
        tabBarActiveTintColor: COLORS.Orange,
        tabBarShowLabel: true,
        tabBarIcon: ({focused}) => {
          return (
            <PersonIcon
              style={[
                styles.iconStyle,
                focused ? focusedColor : unFocusesColor,
              ]}
            />
          );
        },
      };
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
        options={iconRendering('home')}
      />

      <BottomTab.Screen
        name="request"
        component={HuntRequestScreen}
        options={iconRendering('request')}
      />
      <BottomTab.Screen
        name="chatList"
        component={ChatList}
        options={iconRendering('chat')}
      />
      <BottomTab.Screen
        name="my_page"
        component={MyPageScreen}
        options={iconRendering('profile')}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  bottomTabStyle: {
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
