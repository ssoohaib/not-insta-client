import React from 'react'
import {HomeScreen} from '../../../screens';
import { createStackNavigator } from '@react-navigation/stack';
import useThemeStore from '../../../stores/useThemeStore';

const Stack = createStackNavigator();

export default function HomeStack(){
  const {theme} = useThemeStore();
  return (
    <Stack.Navigator screenOptions={{cardStyle:{backgroundColor:theme.bgColor1}}}>
      <Stack.Screen name="home" component={HomeScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}