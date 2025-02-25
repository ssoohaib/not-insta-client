import { View, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { Logo } from '../../components'
import useThemeStore from '../../stores/useThemeStore'

export default function AuthScreen() {
  const {theme, toggleTheme}=useThemeStore();
  const styles = createStyles(theme);
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.upper}>
        <Logo />
      </View>
      <View style={styles.lower}>

      </View>
    </ScrollView>
  )
}

const createStyles = (theme) => StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:theme.bgColor1,
    justifyContent:'space-between'
    
  },
  upper:{
    flex:2,
    justifyContent:'center',
    alignItems:'center',
  },
  lower:{
    flex:1,
    backgroundColor:theme.bgColor2,
    borderTopRightRadius:32,
    borderTopLeftRadius:32,
    height:100
  }
})