import { View, StyleSheet, ScrollView, Switch, Alert } from 'react-native'
import React, { use, useEffect, useState } from 'react'
import { Logo, SignIn, SignUp } from '../../components'
import useThemeStore from '../../stores/useThemeStore'
import useUserStore from '../../stores/useUserStore'
import { emailValidator, passwordValidator } from '../../utils';
import {signIn, signUp} from '../../apis/authApis/authApis'

export default function AuthScreen() {
  const {theme, toggleTheme}=useThemeStore();
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
      placeholder:'Email',
      value:signInData.email,
      onChangeText:(text)=>setSignInData({...signInData, email:text})
    },
    {
      type:'password',
      tag:'Password',
      placeholder:'Password',
      value:signInData.password,
      onChangeText:(text)=>setSignInData({...signInData, password:text})
    }
  ]

  const signUpSchema=[
    {
      type:'text',
      tag:'Name',
      placeholder:'Jon Doe',
      value:signUpData.name,
      onChangeText:(text)=>setSignUpData({...signUpData, name:text})
    },
    {
      type:'email',
      tag:'Email',
      placeholder:'Email',
      value:signUpData.email,
      onChangeText:(text)=>setSignUpData({...signUpData, email:text})
    },
    {
      type:'password',
      tag:'Password',
      placeholder:'Password',
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

    signIn(signInData)
    .then(response => {
      setSignInData({email:'', password:''})
      setSignUpData({email:'', password:'', name:''})
      setUser(response)
    })
    .catch(err=>{
      Alert.alert('Error', err)
    })
  }

  const handleSignUp=()=>{
    const emailError=emailValidator(signUpData.email);
    const passwordError=passwordValidator(signUpData.password);
    if(!emailError || !passwordError){
      Alert.alert('Invalid', 'Email & Name is properly filled,\nPassword is at least 8 characters long,\ncontains 1 digit,\n1 special char,\n1 upper & lower case');
      return;
    }

    signUp(signUpData.email)
    .then(response=>{

    })
    .catch(err=>{
      Alert.alert('Error',err)
    })
  }
  
  const handleOAuthSignIn=()=>{

  }

  const handleOAuthSignUp=()=>{

  }

  useEffect(()=>{
    console.log(signInData);
  },[signInData])

  useEffect(()=>{
    console.log(signUpData);
  }
  ,[signUpData])


  
  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true} contentContainerStyle={styles.container}>
      <View style={styles.upper}>
        <Logo />
      </View>
        <Switch onValueChange={toggleTheme} />
      <View style={styles.lower}>
        {state === 'sign-in' && <SignIn setState={setState} schema={signInSchema} onOAuth={handleOAuthSignIn} onSubmit={handleSignIn} />}
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