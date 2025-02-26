import { StyleSheet, Text } from 'react-native'
import React from 'react'
import useThemeStore from '../../stores/useThemeStore'

export default function H1({children, customStyles}) {
    const {theme}=useThemeStore()
    const styles = createStyles(theme)

  return (
    <Text style={[styles.text, customStyles && customStyles]}>{children}</Text>
  )
}

const createStyles = (theme) => StyleSheet.create({
    text:{
      fontSize:32,
      fontWeight:'700',
      color:theme.textColor1,
    }
})