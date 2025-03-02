import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import useThemeStore from '../../stores/useThemeStore'
import { Button1, Form, Header, OTPSection } from '../../components';
import { resendOTP, signIn, verifyOTP, verifyOTPRP } from '../../apis/authApis/authApis';
import {useNavigation} from '@react-navigation/native';

export default function AuthScreen({route}) {
  const navigation = useNavigation();
  const {email,name,password}=route.params.payload ? route.params.payload : {};
  const {intent}=route.params;
  const {theme}=useThemeStore();
  const [isOTPVerified,setIsOTPVerified]=useState(false)
  const styles = createStyles(theme);


  const handleOTPVerification=async(otp)=>{
    try{
      setIsOTPVerified(true)

      if (intent==='reset-password' || intent==='forgot-password') {
        try{
          await verifyOTPRP({
            email:route.params.payload.email,
            otp:otp.join('')
          })
          navigation.navigate('reset-password',{
            intent:'forgot-password',
            payload:{
              email:route.params.payload.email
            }
          })
        }
        catch(e){
          setIsOTPVerified(false)
          Alert.alert('Error', e, [{text:'OK'}])
          return
        }
      }else if(intent==='sign-up'){
        await verifyOTP({
          ...route.params.payload,
          otp:otp.join('')
        })

        const data=await signIn({
          email,
          password
        })
        console.log('>>>>',data)
        navigation.reset({
          index: 0,
          routes: [{ name: 'preference', params: { intent:'sign-up', payload:{...data} } }]
        })
      }

    }catch(e){
      setIsOTPVerified(false)
      Alert.alert('Error', e, [{text:'OK'}])
    }
  }

  const handleOTPResend=async()=>{
    try{
      await resendOTP({
        email
      })
      Alert.alert('Success', 'OTP sent successfully', [{text:'OK'}])
    }catch(e){
      Alert.alert('Error', e.message, [{text:'OK'}])
    }
  }
  
  return (
    <View style={styles.container}>
      <Header />
        <OTPSection 
          payload={{email,name,password}} 
          verificationState={isOTPVerified} 
          onSubmit={handleOTPVerification}
          onOTPResend={handleOTPResend}  
        />
    </View>
  )
}

const createStyles = (theme) => StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:theme.bgColor1,
    padding:24,
    paddingTop:0
    
  },
})