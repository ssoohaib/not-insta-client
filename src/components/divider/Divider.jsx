import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import useThemeStore from '../../stores/useThemeStore'

export default function Divider({title, customStyles, titleStyles}) {
    const {theme}=useThemeStore();
    const styles = createStyles(theme)
  return (
    <View style={{flexDirection:'row', alignItems:'center'}}>
      <View style={[styles.line, customStyles && customStyles]}></View>
      {title && <Text style={[styles.title, titleStyles && titleStyles]}>or</Text>}
      <View style={[styles.line, customStyles && customStyles]}></View>
    </View>
  )
}

const createStyles = (theme) => StyleSheet.create({
    line:{
      height:.5,
      backgroundColor:theme.textColor1,
      flex:1,
    },
    title:{
      color:theme.textColor1,
      fontSize:12,
      fontWeight:'300',
      marginHorizontal:4,
    }
})