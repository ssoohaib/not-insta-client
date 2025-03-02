import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import useThemeStore from '../../stores/useThemeStore';

export default function Header({onPress}){
    const {theme}=useThemeStore();
    return(
      <View style={{marginBottom:32}}>
        <TouchableOpacity onPress={onPress ? onPress:()=>{console.log('wow')}}>
          <AntDesign name="left" size={24} color={theme.textColor1} />
        </TouchableOpacity>
      </View>
    )
  }