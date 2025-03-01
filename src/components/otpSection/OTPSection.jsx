import { View, Text, TextInput, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { H1, Paragraph } from '../appText';
import { Button1 } from '../buttons';
import useThemeStore from '../../stores/useThemeStore';

export default function OTPSection({payload, onSubmit, onOTPResend}){
    const {email}=payload;
    const {theme}=useThemeStore();
    const [timer, setTimer] = useState(60);
    const [isOTPVerified, setIsOTPVerified]=useState(false);
    const [isOTPResent, setIsOTPResent]=useState(false);

    const otpLength = 6;
    const [otp, setOtp] = useState(new Array(otpLength).fill(""));
    const inputsRef = useRef([]);

    const handleChange = (value, index) => {
        if (/^[0-9]$/.test(value) || value === "") {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < otpLength - 1) {
            inputsRef.current[index + 1]?.focus();
        }
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
        inputsRef.current[index - 1]?.focus();
        }
    };

    useEffect(() => {
      if (timer > 0) {
        const interval = setInterval(() => {
          setTimer(prevTimer => prevTimer - 1);
        }, 1000);
        return () => clearInterval(interval);
      }
    }, [timer]);

    const handleOTPVerification=async()=>{
      if (otp.join('').length !== otpLength) {
        Alert.alert('Invalid OTP', 'Please enter a valid OTP', [{ text: 'OK' }])
        return
      }
      setIsOTPVerified(true)
      await onSubmit(otp)
      setIsOTPVerified(false)
    }

    const handleOTPResend=async()=>{
      setIsOTPResent(true)
      await onOTPResend()
      setIsOTPResent(false)
      setTimer(60)
    }

    return (
      <>
        <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center§'}}>
          <H1 customStyles={{marginBottom:16}}>Enter code</H1>
          <H1 customStyles={{marginBottom:16, color:theme.textColor2}}>00:{timer}</H1>
        </View>
        <Paragraph customStyles={{marginBottom:16}}>We sent verification code to <Paragraph customStyles={{color:theme.textColor2}}>{email || 'abc@abc.com'}</Paragraph></Paragraph>
        
        <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:32}}>
            {otp.map((digit, index) => (
            <TextInput
                key={index}
                ref={(ref) => (inputsRef.current[index] = ref)}
                style={
                    {
                        width: 50,
                        height: 50,
                        borderWidth: 1,
                        borderRadius: 10,
                        textAlign: "center",
                        borderWidth:0.5,
                        borderColor:theme.white2,
                        borderRadius:8,
                        color:theme.textColor1,
                        fontSize:16,
                        padding:8,
                        paddingVertical:16,
                    }
                }
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(value) => handleChange(value, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                autoFocus={index === 0} // Auto-focus on first input
            />
            ))}
        </View>
        
        <Button1 
          title='Verify' 
          customStyles={{marginBottom:16, backgroundColor: theme.textColor2}}
          titleStyles={{color:theme.white}}
          onPress={handleOTPVerification}
          state={isOTPVerified}
        />
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <Paragraph customStyles={{color:theme.white2}}>Didn't recieve any code? </Paragraph>
          <Button1 
            title='Resend Code' 
            customStyles={{padding:0, backgroundColor: theme.bgColor1}}
            titleStyles={{color:theme.textColor2}}
            onPress={handleOTPResend}
            state={isOTPResent}
          />
        </View>
      </>
    )
  }