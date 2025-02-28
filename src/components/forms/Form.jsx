import { View, Text } from 'react-native'
import React from 'react'
import CustomTextInput from '../customTextInput'

export default function Form({schema}) {
  return (
    <View>
      {
        schema?.map((item, index)=>{
            return <CustomTextInput key={index} {...item} />
        })
      }
    </View>
  )
}