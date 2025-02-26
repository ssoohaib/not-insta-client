import { View, StyleSheet, ScrollView, Switch } from 'react-native'
import React, { useState } from 'react'
import { Logo, SignIn, SignUp } from '../../components'
import useThemeStore from '../../stores/useThemeStore'

export default function AuthScreen() {
  const {theme, toggleTheme}=useThemeStore();
  const [state, setState]=useState('sign-in');
  const [signInData, setSignInData]=useState({
    email:'',
    password:'',
  });
  const [signUpData, setSignUpData]=useState({
    email:'',
    password:'',
  });
  const styles = createStyles(theme);

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
  
  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true} contentContainerStyle={styles.container}>
      <View style={styles.upper}>
        <Logo />
      </View>
        {/* <Switch onValueChange={toggleTheme} /> */}
      <View style={styles.lower}>
        {state === 'sign-in' && <SignIn setState={setState} schema={signInSchema} />}
        {state === 'sign-up' && <SignUp setState={setState} schema={signUpSchema} />}
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