import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import useThemeStore from '../../stores/useThemeStore'

export default function CustomTextInput({type, tag, placeholder, value, onChangeText}) {
    const {theme}=useThemeStore();
    const styles = createStyles(theme);
  return (
    <View>
        {tag && <Text style={styles.tag}>{tag}</Text>}
        <TextInput
            style={styles.container}
            inputMode={type}
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholder}
            secureTextEntry={type==='password'}
            placeholderTextColor={theme.textColor1}
        />
    </View>
  )
}

const createStyles=(theme)=>StyleSheet.create({
    container:{
        borderWidth:0.5,
        borderColor:'#96959a',
        borderRadius:8,
        color:theme.textColor1,
        fontSize:16,
        padding:8,
        paddingVertical:16,
        marginBottom:16,

    },
    tag:{
        color:theme.textColor1,
        fontSize:16,
        marginBottom:8,
    }
})