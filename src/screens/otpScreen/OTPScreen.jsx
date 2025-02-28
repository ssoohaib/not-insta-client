import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import useThemeStore from '../../stores/useThemeStore'
import AntDesign from '@expo/vector-icons/AntDesign';
import { Button1, Form, OTPSection } from '../../components';

export default function AuthScreen({email}) {
  const {theme, themeTag}=useThemeStore();
  const [isOTPVerified,setIsOTPVerified]=useState(false)
  const styles = createStyles(theme);
  const [pass, setPass]=useState({
    password:'',
    confirmPassword:''
  })

  const resetPasswordSchema=[
    {
      type:'password',
      tag:'New Password',
      placeholder:'',
      value:pass.password,
      onChangeText:(text)=>setPass({...pass, password:text})
    },
    {
      type:'password',
      tag:'Password',
      placeholder:'',
      value:pass.password,
      onChangeText:(text)=>setPass({...pass, confirmPassword:text})
    }
  ]

  const handleOTPVerification=async()=>{
    setIsOTPVerified(true)
  }

  function Header({onPress, }){

    return(
      <View style={{marginBottom:32}}>
        <TouchableOpacity>
          <AntDesign name="left" size={24} color={theme.textColor1} />
        </TouchableOpacity>
      </View>
    )
  }
  
  return (
    <View style={styles.container}>
      <Header />
      {
        !isOTPVerified ?
        <OTPSection verificationState={isOTPVerified} onSubmit={handleOTPVerification} />
        :<View>
          <Form
            schema={resetPasswordSchema}
          />
          <Button1 
            title='Confirm' 
            customStyles={{marginVertical:16, backgroundColor: theme.textColor2}}
            titleStyles={{color:theme.white}}
            // onPress={onOAuth}
            // state={oAuthState}
        />
        </View>
      }
    </View>
  )
}

const createStyles = (theme) => StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:theme.bgColor1,
    padding:24
    
  },
})