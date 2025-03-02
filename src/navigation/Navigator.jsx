import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import {AuthStack} from './stacks';
import useUserStore from '../stores/useUserStore';
import AppTabs from './tabs';
import { View } from 'react-native';
import useThemeStore from '../stores/useThemeStore';

export default function Navigator() {
  const { user } = useUserStore();
  const {theme}=useThemeStore();

  return (
    <NavigationContainer>
      <View style={{flex:1, paddingTop:40, backgroundColor:theme.bgColor1}}>
        {user ? <AppTabs />:<AuthStack />}
      </View>
    </NavigationContainer>
  )
}