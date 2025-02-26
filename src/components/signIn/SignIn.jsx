import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Button1, Divider, Form, H1, Paragraph } from '../../components'
import useThemeStore from '../../stores/useThemeStore';

export default function SignIn({schema, setState}) {
    const {theme}=useThemeStore();
    const styles = createStyles(theme);

    const handleStateChange=()=>{
        setState('sign-up');
    }

  return (
    <>
        <H1 customStyles={styles.h1}>Sign In</H1>
        <Paragraph customStyles={styles.p}>Show the world, one photo at a time.</Paragraph>
        <Button1 
            title='Sign in with google' 
            customStyles={{marginBottom:16, backgroundColor:theme.white}}
            titleStyles={{color:theme.black}}
        />
        <Divider customStyles={{marginBottom:16}} title={'or'} />
        <Form schema={schema} />
        <Button1 title='Sign in' customStyles={{backgroundColor:theme.textColor2}} />
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