import React, { Suspense, lazy, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import useUserStore from '../stores/useUserStore';
import useThemeStore from '../stores/useThemeStore';
import { Platform, StyleSheet, View } from 'react-native';

const AuthStack = lazy(() => import('./stacks'));
const AppTabs = lazy(() => import('./tabs'));

export default function Navigator() {
  const { user } = useUserStore();
  const { theme } = useThemeStore();

  const styles = useMemo(()=>{
    return createStyles(theme)
  },[theme]) 

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Suspense fallback={<View style={styles.suspense}></View>}>
          {user ? <AppTabs /> : <AuthStack />}
        </Suspense>
      </View>
    </NavigationContainer>
  );
}

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS=='ios' ? 40:24,
    backgroundColor: theme.bgColor1,
  },
  suspense:{
    flex:1,
    backgroundColor:theme.bgColor1
  }
});
