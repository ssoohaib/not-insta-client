import axiosInstance from "../axiosInstance";
import {saveTokens} from "../../utils";

export const signIn = async (payload) => {
    try {
        const response = await axiosInstance.post('/signin', payload);
        const data = response.data;
        console.log('[OK] => SignIn', data);
        await saveTokens(data.tokens);
        return data.data;
    } catch (error) {
        console.error('[FAIL] => SignIn', error.response.data);
        throw error.response.data.message;
    }
}

export const signUp = async (email) => {
    try {
        const response = await axiosInstance.post('/signup', {email});
        console.log('[OK] => SignUp', response.data);
        return response.data;
    } catch (error) {
        console.error('[FAIL] => SignUp', error);
        throw error?.response?.data?.message;
    }
}

// verify-otp-rp (reset password)
export const verifyOTPRP = async (payload) => {
    console.log('verifyOTPRP payload', payload);
    try {
        const response = await axiosInstance.post('/verify-otp-rp', payload);
        console.log('[OK] => Verify OTP RP', response.data);
        return response.data;
    } catch (error) {
        console.error('[FAIL] => Verify OTP RP', error);
        throw error?.response?.data?.message;
    }
}

// verify-otp
export const verifyOTP = async (payload) => {
    console.log('verifyOTP payload', payload);
    try {
        const response = await axiosInstance.post('/verify-otp', payload);
        console.log('[OK] => Verify OTP', response.data);
        return response.data;
    } catch (error) {
        console.error('[FAIL] => Verify OTP', error);
        throw error?.response?.data?.message;
    }
}

// resend-otp
export const resendOTP = async (payload) => {
    console.log('resendOTP payload', payload);
    try {
        const response = await axiosInstance.post('/resend-otp', payload);
        console.log('[OK] => Resend OTP', response.data);
        return response.data;
    } catch (error) {
        console.error('[FAIL] => Resend OTP', error?.response?.data?.message);
        throw error?.response?.data?.message;
    }
}

// set-new-password
export const setNewPassword = async (payload) => {
    console.log('setNewPassword payload', payload);
    try {
        const response = await axiosInstance.patch('/set-new-password', payload);
        console.log('[OK] => Set New Password', response.data);
        return response.data;
    } catch (error) {
        console.error('[FAIL] => Set New Password', error);
        throw error?.response?.data?.message;
    }
}