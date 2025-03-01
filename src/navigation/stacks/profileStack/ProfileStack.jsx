import React from 'react'
import {PrefernceScreen, ProfileScreen, ResetPassword} from '../../../screens';
import { createStackNavigator } from '@react-navigation/stack';
import useThemeStore from '../../../stores/useThemeStore';

const Stack = createStackNavigator();

export default function ProfileStack() {
  const {theme} = useThemeStore();
  return (
    <Stack.Navigator screenOptions={{cardStyle:{backgroundColor:theme.bgColor1}}}>
      <Stack.Screen name="home" component={ProfileScreen} options={{headerShown: false}} />
      <Stack.Screen name="reset-password-rp" component={ResetPassword} options={{headerShown: false}} />
      <Stack.Screen name="preference-profile" component={PrefernceScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}