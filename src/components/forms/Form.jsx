import { View, Text } from 'react-native'
import React from 'react'
import CustomTextInput from '../customTextInput'

export default function Form({schema, customStyles={}}) {
  return (
    <View style={customStyles}>
      {
        schema?.map((item, index)=>{
            return <CustomTextInput key={index} {...item} />
        })
      }
    </View>
  )
}