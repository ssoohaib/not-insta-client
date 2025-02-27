import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import {AuthStack} from './stacks';
import useThemeStore from "../stores/useThemeStore";
import useUserStore from '../stores/useUserStore';
import { Text } from 'react-native';

export default function Navigator() {
  const { theme } = useThemeStore();
  const { user } = useUserStore();

  return (
    <NavigationContainer>
      {user ? <Text style={{color:'red'}}>lol</Text>:<AuthStack theme={theme} />}
    </NavigationContainer>
  )
}