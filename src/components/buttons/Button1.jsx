import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import useThemeStore from '../../stores/useThemeStore'
import { H3 } from '../appText'

export default function Button1({customStyles, titleStyles, onPress, icon, title='', state=false}) {
    const {theme}=useThemeStore()
    const styles = createStyles(theme)

  return (
    <TouchableOpacity onPress={onPress} disabled={state} style={[styles.container, customStyles && customStyles]}>
        {state && <View style={{marginRight:8}}><ActivityIndicator color={titleStyles?.color? titleStyles.color:theme.white} /></View>}
        <H3 customStyles={[styles.h3, titleStyles && titleStyles]}>{title}</H3>
    </TouchableOpacity>
  )
}

const createStyles = (theme) => StyleSheet.create({
    container:{
      backgroundColor: theme.dark1,
      padding:16,
      borderRadius:32,
      alignItems:'center',
      flexDirection:'row',
      justifyContent:'center'
    },
    h3:{
      color: theme.white,

    }
    
})