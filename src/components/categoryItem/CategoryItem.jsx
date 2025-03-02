import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Paragraph } from '../appText'
import useThemeStore from '../../stores/useThemeStore'

export default function CategoryItem({item, onPress, disabled=false, icon, isSelected=false}) {
    const {theme}=useThemeStore()
  return (
    <TouchableOpacity 
        onPress={onPress} 
        style={{
            marginRight:8, 
            padding:8, 
            paddingHorizontal:12, 
            borderRadius:16, 
            backgroundColor: isSelected ? theme.textColor2 : theme.bgColor2
        }}
        >
        <Paragraph customStyles={{color:theme.textColor1}}>{icon ? (item.icon+' '):''}{item.name}</Paragraph>
    </TouchableOpacity>
  )
}