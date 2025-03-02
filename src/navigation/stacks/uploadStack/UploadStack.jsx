import React from 'react'
import {SelectedImage, UploadScreen} from '../../../screens';
import { createStackNavigator } from '@react-navigation/stack';
import useThemeStore from '../../../stores/useThemeStore';

const Stack = createStackNavigator();

export default function UploadStack(){
  const {theme} = useThemeStore();
  return (
    <Stack.Navigator screenOptions={{cardStyle:{backgroundColor:theme.bgColor1}}}>
      <Stack.Screen name="upload" component={UploadScreen} options={{headerShown: false}} />
      <Stack.Screen name="selected-image" component={SelectedImage} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}