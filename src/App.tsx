import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {RecoilRoot} from 'recoil';
import MainStackNavigator from './navigation/MainStackNavigator';
const RootStack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{headerShown: false}}>
          <RootStack.Screen
            name="MainStackNavigator"
            component={MainStackNavigator}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}

export default App;
