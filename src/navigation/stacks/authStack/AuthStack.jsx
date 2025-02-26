import React from 'react'
import {SplashScreen, AuthScreen} from '../../../screens';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function AuthStack({theme}) {
  return (
    <Stack.Navigator screenOptions={{cardStyle:{backgroundColor:theme.bgColor1}}}>
      <Stack.Screen name="splash" component={SplashScreen} options={{headerShown: false}} />
      <Stack.Screen name="auth" component={AuthScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}