import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'
import useThemeStore from '../../stores/useThemeStore'
import { H3, Paragraph } from '../appText'

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

export default function FeedImageCard({item, categories}) {
    const {theme}=useThemeStore()
  return (
    <View style={{marginBottom:32}}>
        <View style={{marginBottom:16, paddingHorizontal:24, flexDirection:'row', alignItems:'center'}}>
            <View style={{height:30, width:30, borderRadius:15, backgroundColor:theme.textColor2, alignItems:'center', justifyContent:'center', marginRight:8}}>
                <View style={{height:26, width:26, borderRadius:15, backgroundColor:theme.bgColor1, alignItems:'center', justifyContent:'center',}}>
                    <Paragraph style={{fontWeight:'bold', fontSize:16}}>{item.uploaderName[0].toUpperCase()}</Paragraph>
                </View>
            </View>
            <H3>{item.uploaderName}</H3>
        </View>
        <Image source={{uri:item.uri}} style={{width:screenWidth, height:screenWidth, marginBottom:16}} />
        <View style={{paddingHorizontal:24,flexDirection:'row', flexWrap:"wrap"}}>
            {
                categories.map(i=>
                    <View key={i.id} style={{ marginRight:4, marginBottom:4, padding:8, backgroundColor:theme.bgColor2, borderRadius:16}}>
                        <Paragraph>{i.icon} {i.name}</Paragraph>
                    </View>
                )
            }
        </View>
    </View>
  )
}