import { StyleSheet, Text } from 'react-native'
import React from 'react'
import useThemeStore from '../../stores/useThemeStore'

export default function H3({children, customStyles}) {
    const {theme}=useThemeStore()
    const styles = createStyles(theme)

  return (
    <Text style={[styles.text, customStyles && customStyles]}>{children}</Text>
  )
}

const createStyles = (theme) => StyleSheet.create({
    text:{
      fontSize:16,
      color:theme.textColor1,
      fontWeight:"600"
    }
})