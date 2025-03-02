import React from 'react'
import {SplashScreen, AuthScreen, OTPScreen, PrefernceScreen, ForgotPassword, ResetPassword} from '../../../screens';
import { createStackNavigator } from '@react-navigation/stack';
import useThemeStore from '../../../stores/useThemeStore';

const Stack = createStackNavigator();

export default function AuthStack() {
  const {theme} = useThemeStore();
  return (
    <Stack.Navigator screenOptions={{cardStyle:{backgroundColor:theme.bgColor1}}}>
      <Stack.Screen name="splash" component={SplashScreen} options={{headerShown: false}} />
      <Stack.Screen name="auth" component={AuthScreen} options={{headerShown: false}} />
      <Stack.Screen name="forgot-password" component={ForgotPassword} options={{headerShown: false}} />
      <Stack.Screen name="otp" component={OTPScreen} options={{headerShown: false}} />
      <Stack.Screen name="reset-password" component={ResetPassword} options={{headerShown: false}} />
      <Stack.Screen name="preference" component={PrefernceScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}