import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {Logo} from '../../components';
import useThemeStore from '../../stores/useThemeStore';

export default function SplashScreen() {
  const navigation = useNavigation();
  const {theme} = useThemeStore();

  useEffect(() => {
    const initializer = () => {
      setTimeout(() => {
        navigation.replace('auth');
      }, 1000);
    };

    initializer();
  }, []);

  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <View></View>
      <Logo />
      <ActivityIndicator color={theme.textColor1} />
    </View>
  )
}

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: theme.bgColor1,
  },
});