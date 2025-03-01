import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import useThemeStore from '../../stores/useThemeStore'
import { Button1, Form, Header } from '../../components';
import { passwordValidator } from '../../utils';
import { setNewPassword } from '../../apis/authApis/authApis';

export default function ResetPassword({route, navigation}) {
    const {theme}=useThemeStore();
    const styles=createStyles(theme);
    const [isChanged, setIsChanged]=useState(false);
    const [currentPassword, setCurrentPassword]=useState('');
    const [password1, setPassword1]=useState('');
    const [password2, setPassword2]=useState('');

    const schema=[
        {
            type:'password',
            tag:'New Password',
            placeholder:'',
            value:password1,
            onChangeText:setPassword1
        },
        {
            type:'password',
            tag:'Confirm Password',
            placeholder:'',
            value:password2,
            onChangeText:setPassword2
        }
    ]

    if(route.params.intent==='reset-password'){
        schema.unshift({
            type:'password',
            tag:'Current Password',
            placeholder:'',
            value:currentPassword,
            onChangeText:setCurrentPassword
        });
    }

    const handleSubmit=async()=>{
        if (route.params.intent==='reset-password' && currentPassword.length<8) {
            Alert.alert('Alert', 'Please enter a valid current password');
            return;
        }
        const isPass1=passwordValidator(password1);
        if(!isPass1){
            Alert.alert('Alert', 'Please enter a valid new password');
            return;
        }
        const isMatch=password1===password2;
        if (!isMatch) {
            Alert.alert('Alert', 'Passwords do not match');
            return;
        }
        if(currentPassword===password1){
            Alert.alert('Alert', 'New password cannot be same as old password');
            return;
        }
        console.log('------------', route.params)
        setIsChanged(true);
        try {
            await setNewPassword({
                intent:route.params.intent,
                payload:{
                    email:route.params.payload.email,
                    newPassword:password1,
                    oldPassword:route.params.intent==='reset-password'?currentPassword:null
                }
            });
            if (route.params.intent==='forgot-password') {
                navigation.reset({
                    index:0,
                    routes:[{name:'auth'}]
                });
            }else if(route.params.intent==='reset-password'){
                navigation.goBack();
            }
        } catch (error) {
            setIsChanged(false);
            Alert.alert('Error', error);
        }
    }

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Header onPress={()=>{navigation.goBack()}} />
        <Form schema={schema} />
        <Button1
            title='Confirm'
            customStyles={{marginTop:16, backgroundColor:theme.textColor2}}
            titleStyles={{color:theme.white}}
            state={isChanged}
            onPress={handleSubmit}

        />
    </ScrollView>
  )
}

const createStyles = (theme) => StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:24
    }
})