import * as ImageManipulator from "expo-image-manipulator";

export const compressImage=async(uri)=>{
    let compressedImage;
    try {
        compressedImage = await ImageManipulator.manipulateAsync(
            uri,
            [],
            { compress: 0.3, format: ImageManipulator.SaveFormat.JPEG }
        );
        return compressedImage.uri;
    } catch (error) {
        console.error('Image compression failed: ', error);
        throw error;
    }
}