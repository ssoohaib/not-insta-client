import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import useThemeStore from '../../stores/useThemeStore'
import { Button2, Divider, H1, H3, Paragraph } from '../../components';

export default function ProfileScreen() {
    const {theme}=useThemeStore();

    const styles=createStyles(theme)

  return (
    <ScrollView contentContainerStyle={{flex:1, justifyContent:'space-between'}} style={styles.container}>
        <View>
            <View style={styles.profileContainer}>
                <View style={{marginBottom:16,height:100,width:100, borderRadius:50, backgroundColor:theme.textColor2}}></View>
                <H1 customStyles={{marginBottom:8}}>Jamal</H1>
                <Paragraph customStyles={{color:theme.white2}}>abc@abc.com</Paragraph>
            </View>
            <View style={styles.optionsContainer}>
                <Button2 title='Change Preferences' leftIcon='heart' rightIcon='arrowright' />
                <Divider customStyles={{marginVertical:16}} />
                <Button2 title='Change Password' leftIcon='key' rightIcon='arrowright' />
            </View>
        </View>
        <View style={[styles.optionsContainer]}>
            <Button2 
                title='Sign out' 
                leftIcon={{
                    name:'logout',
                    color:theme.red
                }}
                rightIcon={{
                    name:'arrowright',
                    color:theme.red
                }}
            />
        </View>
    </ScrollView>
  )
}


const createStyles=(theme)=>StyleSheet.create({
    container:{
        backgroundColor:theme.bgColor1,
        paddingHorizontal:24,
        paddingBottom:64
        
    },
    profileContainer:{
        alignItems:'center',
        marginBottom:32
    },
    optionsContainer:{
        backgroundColor:theme.bgColor2,
        borderWidth:.5,
        borderColor:theme.white2,
        padding:16,
        borderRadius:16
    }
})