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

export const uploadImage = async (route, formData) => {
    console.log(formData)
    try {
        const response = await axiosInstance.post(route, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('[OK] => Uploading image');
        return
    } catch (error) {
        console.error('Error uploading image:', error.response.data);
        throw error;
    }
}

export const getMyImages = async () => {
    try {
        const response = await axiosInstance.get('/get-my-images');
        console.log('[OK] => Fetching my images');
        return response.data;
    } catch (error) {
        console.error('Error fetching my images:', error);
        throw error;
    }
}

// not-mine
export const getImages = async () => { 
    try {
        const response = await axiosInstance.get('/get-images');
        console.log('[OK] => Fetching images:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
}

export const getImagesByCategory = async (interestIds) => {
    console.log(interestIds)
    try {
        const response = await axiosInstance.post('/get-images-by-category',  {interestIds} );
        console.log('[OK] => Fetching images by category');
        return response?.data;
    } catch (error) {
        console.error('Error fetching images by category:', error);
        throw error;
    }
}