import axiosInstance from "../axiosInstance";

export const storeInterests = async (payload) => {
    try {
        const response = await axiosInstance.post('/store-interests', {interests:payload});
        console.log('[OK] => Storing interests:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error storing interests:', error);
        throw error;
    }
}

export const getUserDetails = async (userId) => {
    try {
        const response = await axiosInstance.get(`/user-details`);
        console.log('[OK] => Fetching user details:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
}

export const updateInterests = async (payload) => {
    try {
        const response = await axiosInstance.patch('/update-interests', {interests: payload});
        console.log('[OK] => Updating interests:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating interests:', error);
        throw error;
    }
}