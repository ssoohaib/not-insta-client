import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {Logo} from '../../components';
import useThemeStore from '../../stores/useThemeStore';
import { getTokens, removeTokens } from '../../utils';
import useUserStore from '../../stores/useUserStore';
import { getUserDetails } from '../../apis/userApis/userApis';

export default function SplashScreen() {
  const navigation = useNavigation();
  const {theme} = useThemeStore();
  const {setUser} = useUserStore();

  useEffect(() => {
    const initializer = async () => {
      const {accessToken}=await getTokens()

      if (accessToken){
        try{
          const data = await getUserDetails();
          setUser(data);
        }catch(e){
          console.error('Failed to get user details:', e);
          await removeTokens();
          navigation.replace('auth');
        }
      }else{
        setTimeout(() => {
          navigation.replace('auth');
        }, 1000);
      }
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