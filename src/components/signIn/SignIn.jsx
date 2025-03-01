import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Button1, Divider, Form, H1, Paragraph } from '../../components'
import useThemeStore from '../../stores/useThemeStore';

export default function SignIn({schema, setState, onOAuth, onSubmit, handleForgotPassword}) {
    const {theme, themeTag}=useThemeStore();
    const [oAuthState, setOAuthState]=useState(false);
    const [signInState, setSignInState]=useState(false);
    const styles = createStyles(theme);

    const handleStateChange=()=>{
      setState('sign-up');
    }

    const handleSignIn=async()=>{
      setSignInState(true);
      await onSubmit();
      setSignInState(false);
    }

    const handleForgotPasswordPress=()=>{
      handleForgotPassword();
    }

  return (
    <>
        <H1 customStyles={styles.h1}>Sign In</H1>
        <Paragraph customStyles={styles.p}>Show the world, one photo at a time.</Paragraph>
        <Button1 
            title='Sign in with google' 
            customStyles={{marginBottom:16, backgroundColor: themeTag ==='dark'? theme.white:theme.black}}
            titleStyles={{color:themeTag ==='dark'? theme.black:theme.white}}
            onPress={onOAuth}
            state={oAuthState}
        />
        <Divider customStyles={{marginBottom:16}} title={'or'} />
        <Form schema={schema} />
        <TouchableOpacity onPress={handleForgotPasswordPress}>
          <Paragraph customStyles={{color:theme.textColor2, textAlign:'right', marginBottom:16}}>
            Forgot password?
          </Paragraph>
        </TouchableOpacity>
        <Button1 
          title='Sign In' 
          customStyles={{backgroundColor:theme.textColor2}} 
          state={signInState} 
          onPress={handleSignIn}
        />
        <View style={{alignItems:'center', flexDirection:'row', justifyContent:'center', marginTop:12}}>
            <Paragraph customStyles={{fontSize:12}}>Don't have an account?</Paragraph>
            <Button1 
                title=' Sign up' 
                customStyles={{padding:0, backgroundColor:theme.bgColor2, padding:4}} 
                titleStyles={{color:theme.textColor2, fontSize:12}} 
                onPress={handleStateChange}   
            />
        </View>
    </>
  )
}

const createStyles=(theme)=>StyleSheet.create({
    h1:{
        marginBottom:16,
      },
      p:{
        marginBottom:16,
      }
})