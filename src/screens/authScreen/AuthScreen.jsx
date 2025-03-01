import { View, StyleSheet, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Logo, SignIn, SignUp } from '../../components'
import useThemeStore from '../../stores/useThemeStore'
import useUserStore from '../../stores/useUserStore'
import { emailValidator, passwordValidator } from '../../utils';
import {signIn, signUp} from '../../apis/authApis/authApis'

export default function AuthScreen({navigation}) {
  const {theme}=useThemeStore();
  const {setUser} = useUserStore();
  const [state, setState]=useState('sign-in');
  const styles = createStyles(theme);
  const [signInData, setSignInData]=useState({
    email:'',
    password:'',
  });
  const [signUpData, setSignUpData]=useState({
    name:'',
    email:'',
    password:'',
  });

  const signInSchema=[
    {
      type:'email',
      tag:'Email',
      placeholder:'Enter your email',
      value:signInData.email,
      onChangeText:(text)=>setSignInData({...signInData, email:text})
    },
    {
      type:'password',
      tag:'Password',
      placeholder:'Enter your password',
      value:signInData.password,
      onChangeText:(text)=>setSignInData({...signInData, password:text})
    }
  ]

  const signUpSchema=[
    {
      type:'text',
      tag:'Name',
      placeholder:'Enter your name',
      value:signUpData.name,
      onChangeText:(text)=>setSignUpData({...signUpData, name:text})
    },
    {
      type:'email',
      tag:'Email',
      placeholder:'Enter you email',
      value:signUpData.email,
      onChangeText:(text)=>setSignUpData({...signUpData, email:text})
    },
    {
      type:'password',
      tag:'Password',
      placeholder:'Enter your password',
      value:signUpData.password,
      onChangeText:(text)=>setSignUpData({...signUpData, password:text})
    }
  ]

  const handleSignIn=async ()=>{
    const emailError=emailValidator(signInData.email);
    const passwordError=signInData.password.length<8;
    if(!emailError || passwordError){
      Alert.alert('Error', 'Invalid email or password');
      return;
    } 

    try {
      const response = await signIn(signInData);
      setSignInData({email:'', password:''});
      setSignUpData({email:'', password:'', name:''});
      setUser(response);
    } catch (err) {
      Alert.alert('Error', err.message || err);
    }
  }

  const handleSignUp=async()=>{
    const emailError=emailValidator(signUpData.email);
    const passwordError=passwordValidator(signUpData.password);
    const nameError = !/^[A-Za-z]+$/.test(signUpData.name) || signUpData.name.trim() === '';
    if(nameError || !emailError || !passwordError){
      Alert.alert('Invalid Data', 'Please ensure the following:\n- Email is valid\n- Name is filled\n- Password is at least 8 characters long, contains 1 digit, 1 special character, and 1 uppercase & lowercase letter.');
      return;
    }

    try {
      await signUp(signUpData.email);
      navigation.navigate('otp', {
        intent: 'sign-up',
        payload:{
          email: signUpData.email,
          password: signUpData.password,
          name: signUpData.name
        }
      });
    } catch (err) {
      Alert.alert('Error', err.message || err);
    }
  }

  const handleForgotPassword=()=>{
    navigation.navigate('forgot-password')
  }
  
  const handleOAuthSignIn=()=>{

  }

  const handleOAuthSignUp=()=>{

  }
  
  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true} contentContainerStyle={styles.container}>
      <View style={styles.upper}>
        <Logo />
      </View>
      <View style={styles.lower}>
        {state === 'sign-in' && <SignIn setState={setState} schema={signInSchema} onOAuth={handleOAuthSignIn} onSubmit={handleSignIn} handleForgotPassword={handleForgotPassword} />}
        {state === 'sign-up' && <SignUp setState={setState} schema={signUpSchema}  onOAuth={handleOAuthSignUp} onSubmit={handleSignUp} />}
      </View>
    </ScrollView>
  )
}

const createStyles = (theme) => StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:theme.bgColor1,
    justifyContent:'space-between'
    
  },
  upper:{
    flex:1.5,
    justifyContent:'center',
    alignItems:'center',
  },
  lower:{
    // flex:1,
    backgroundColor:theme.bgColor2,
    borderTopRightRadius:32,
    borderTopLeftRadius:32,
    padding:32,

  },
})