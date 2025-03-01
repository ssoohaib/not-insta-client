import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveTokens = async (tokens) => {
  try {
    await AsyncStorage.setItem('accessToken', tokens.accessToken);
    await AsyncStorage.setItem('refreshToken', tokens.refreshToken);
    console.log('[OK] => Tokens saved');
  } catch (error) {
    console.error('Error saving token:', error);
  }
};

export const getTokens = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    console.log('[OK] => Tokens fetched');
    return { accessToken, refreshToken };
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

export const removeTokens = async () => {
  try {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    console.log('[OK] => Tokens removed');
  } catch (error) {
    console.error('Error removing token:', error);
  }
};
