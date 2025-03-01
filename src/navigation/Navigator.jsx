import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import {AuthStack} from './stacks';
import useUserStore from '../stores/useUserStore';
import AppTabs from './tabs';

export default function Navigator() {
  const { user } = useUserStore();

  return (
    <NavigationContainer>
      {user ? <AppTabs />:<AuthStack />}
    </NavigationContainer>
  )
}