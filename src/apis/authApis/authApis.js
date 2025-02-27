import axiosInstance from "../axiosInstance";

export const signIn = async (payload) => {
    try {
        const response = await axiosInstance.post('/signin', payload);
        console.log('[OK] => SignIn', response.data);
        return response.data.data;
    } catch (error) {
        console.error('[FAIL] => SignIn', error?.response?.data?.message);
        throw error?.response?.data?.message;
    }
}

export const signUp = async (email) => {
    try {
        const response = await axiosInstance.post('/signup', {email});
        console.log('[OK] => SignUp', response.data);
        return response.data;
    } catch (error) {
        console.error('[FAIL] => SignUp', error?.response?.data?.message);
        throw error?.response?.data?.message;
    }
}