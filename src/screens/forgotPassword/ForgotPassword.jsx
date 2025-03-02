import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { Button1, Form, Header } from '../../components'
import useThemeStore from '../../stores/useThemeStore';
import { resendOTP } from '../../apis/authApis/authApis';
import { emailValidator } from '../../utils';

export default function ForgotPassword({navigation}) {
    const {theme}=useThemeStore();
    const [email, setEmail]=useState('');
    const [isSent, setIsSent]=useState(false);

    const styles = React.useMemo(() => createStyles(theme), [theme]);

    const handleSubmit = React.useCallback(async () => {
        const isEmail = emailValidator(email);
        if (!isEmail) {
            Alert.alert('Alert', 'Please enter your email');
            return;
        }

        setIsSent(true);
        try {
            await resendOTP({ email });
            setIsSent(false);
            navigation.navigate('otp', { payload: { email }, intent: 'forgot-password' });
        } catch (error) {
            setIsSent(false);
            Alert.alert('Alert', error);
            console.error('Error resending OTP:', error);
        }
    }, [email, navigation]);

    const schema = React.useMemo(() => [
        {
            type: 'email',
            tag: 'Email',
            placeholder: 'Enter your email',
            value: email,
            onChangeText: setEmail
        }
    ], [email]);
  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Header onPress={()=>{navigation.goBack()}} />
        <Form schema={schema} />
        <Button1 
            title='Submit' 
            customStyles={{backgroundColor: theme.textColor2}} 
            titleStyles={{color:theme.white}} 
            onPress={handleSubmit} 
            state={isSent}
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