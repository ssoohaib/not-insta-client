import { View, StyleSheet, ScrollView, Alert, Text } from 'react-native'
import React, { useState, useMemo, useCallback, Suspense } from 'react'
import { Logo } from '../../components'
import useThemeStore from '../../stores/useThemeStore'
import useUserStore from '../../stores/useUserStore'
import { emailValidator, passwordValidator } from '../../utils';
import { signIn, signUp } from '../../apis/authApis/authApis'

const SignIn = React.lazy(() => import('../../components/signIn'));
const SignUp = React.lazy(() => import('../../components/signUp'));

export default function AuthScreen({ navigation }) {
  const { theme } = useThemeStore();
  const { setUser } = useUserStore();
  const [state, setState] = useState('sign-in');
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  });
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const styles = useMemo(() => createStyles(theme), [theme]);

  const signInSchema = useMemo(() => [
    {
      type: 'email',
      tag: 'Email',
      placeholder: 'Enter your email',
      value: signInData.email,
      onChangeText: (text) => setSignInData({ ...signInData, email: text })
    },
    {
      type: 'password',
      tag: 'Password',
      placeholder: 'Enter your password',
      value: signInData.password,
      onChangeText: (text) => setSignInData({ ...signInData, password: text })
    }
  ], [signInData]);

  const signUpSchema = useMemo(() => [
    {
      type: 'text',
      tag: 'Name',
      placeholder: 'Enter your name',
      value: signUpData.name,
      onChangeText: (text) => setSignUpData({ ...signUpData, name: text })
    },
    {
      type: 'email',
      tag: 'Email',
      placeholder: 'Enter your email',
      value: signUpData.email,
      onChangeText: (text) => setSignUpData({ ...signUpData, email: text })
    },
    {
      type: 'password',
      tag: 'Password',
      placeholder: 'Enter your password',
      value: signUpData.password,
      onChangeText: (text) => setSignUpData({ ...signUpData, password: text })
    }
  ], [signUpData]);

  const handleSignIn = useCallback(async () => {
    const emailError = emailValidator(signInData.email);
    const passwordError = signInData.password.length < 8;
    if (!emailError || passwordError) {
      Alert.alert('Error', 'Invalid email or password');
      return;
    }

    try {
      const response = await signIn(signInData);
      setSignInData({ email: '', password: '' });
      setSignUpData({ email: '', password: '', name: '' });
      setUser(response);
    } catch (err) {
      Alert.alert('Error', err.message || err);
    }
  }, [signInData, setUser]);

  const handleSignUp = useCallback(async () => {
    const emailError = emailValidator(signUpData.email);
    const passwordError = passwordValidator(signUpData.password);
    const nameError = !/^[A-Za-z]+$/.test(signUpData.name) || signUpData.name.trim() === '';
    if (nameError || !emailError || !passwordError) {
      Alert.alert('Invalid Data', 'Please ensure the following:\n- Email is valid\n- Name is filled\n- Password is at least 8 characters long, contains 1 digit, 1 special character, and 1 uppercase & lowercase letter.');
      return;
    }

    try {
      await signUp(signUpData.email);
      navigation.navigate('otp', {
        intent: 'sign-up',
        payload: {
          email: signUpData.email,
          password: signUpData.password,
          name: signUpData.name
        }
      });
    } catch (err) {
      Alert.alert('Error', err.message || err);
    }
  }, [signUpData, navigation]);

  const handleForgotPassword = useCallback(() => {
    navigation.navigate('forgot-password')
  }, [navigation]);

  const handleOAuthSignIn = useCallback(() => {
    Alert.alert("Apologies 🙏", "Enabling OAuth requires ejecting from Expo managed environment 😱😱, and since i dont own a physical android 😔😔, development became a nightmare when i started an emulator on my 🥔🥔windows.\n\nOther than this everything is an A+ Grade 😎😎")
  }, []);

  const handleOAuthSignUp = useCallback(() => {
    Alert.alert("Apologies 🙏", "Enabling OAuth requires ejecting from Expo managed environment 😱😱, and since i dont own a physical android 😔😔, development became a nightmare when i started an emulator on my 🥔🥔windows.\n\nOther than this everything is an A+ Grade 😎😎")
  }, []);

  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true} contentContainerStyle={styles.container}>
      <View style={styles.upper}>
        <Logo />
      </View>
      <View style={styles.lower}>
        <Suspense fallback={<View style={{flex:1, backgroundColor:theme.bgColor1}}></View>}>
          {state === 'sign-in' && <SignIn setState={setState} schema={signInSchema} onOAuth={handleOAuthSignIn} onSubmit={handleSignIn} handleForgotPassword={handleForgotPassword} />}
          {state === 'sign-up' && <SignUp setState={setState} schema={signUpSchema} onOAuth={handleOAuthSignUp} onSubmit={handleSignUp} />}
        </Suspense>
      </View>
    </ScrollView>
  )
}

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgColor1,
    justifyContent: 'space-between'
  },
  upper: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lower: {
    backgroundColor: theme.bgColor2,
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    padding: 32,
  },
})