import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import {AuthStack} from './stacks';
import useThemeStore from "../stores/useThemeStore";

export default function Navigator() {
  const { theme } = useThemeStore();

  return (
    <NavigationContainer>
      <AuthStack theme={theme} />
    </NavigationContainer>
  )
}