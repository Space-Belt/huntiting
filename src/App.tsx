import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {RecoilRoot} from 'recoil';
import MainStackNavigator from './navigation/MainStackNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import ToastMessage from './components/ToastMessage.tsx/ToastMessage';

export type RootStackParamList = {
  MainStackNavigator: undefined;
  SignInScreen: undefined;
  SignUpScreen: undefined;
  BottomTab: undefined;
  Setting: undefined;
  ProfileEdit: undefined;
  detail: {id?: number};
  MyHistoryScreen: undefined;
  NoticeScreen: undefined;
  chatRoom: undefined;
  Terms: undefined;
  list: undefined;
  request: {id?: number};
  chatList: undefined;
  my_page: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={styles.container}>
      <RecoilRoot>
        <NavigationContainer>
          <RootStack.Navigator screenOptions={{headerShown: false}}>
            <RootStack.Screen
              name="MainStackNavigator"
              component={MainStackNavigator}
            />
          </RootStack.Navigator>
          <ToastMessage />
        </NavigationContainer>
      </RecoilRoot>
    </GestureHandlerRootView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
