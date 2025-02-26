import { Text, StyleSheet } from 'react-native'
import React from 'react'
import useThemeStore from '../../stores/useThemeStore'

export default function Logo() {
  const {theme}=useThemeStore();
  const styles = createStyles(theme);

  return (
    <Text style={styles.text1}>not <Text style={styles.text2}>INSTA</Text></Text>
  )
}

const createStyles = (theme) => StyleSheet.create({
  text1:{
    color: theme.textColor1,
    fontWeight:'700',
    fontSize:18
  },
  text2:{
    color: theme.textColor2,
    fontSize:48,

  },
})