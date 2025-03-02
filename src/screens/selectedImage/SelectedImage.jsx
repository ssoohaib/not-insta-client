import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import { uploadImage } from '../../apis/userApis/userApis';
import { H1, Header, InterestsSelector, Paragraph } from '../../components';
import useThemeStore from '../../stores/useThemeStore';
import { compressImage } from '../../utils';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

export default function SelectedImage({route, navigation}) {
    const {theme}=useThemeStore()
    const [imageUri] = useState(route.params.payload.uri);
    const [selectedCategories, setSelectedCategories]=useState([])
    const [isUploaded, setIsUploaded]=useState(false)

    const handleUploadImage = useCallback(async () => {
        if(selectedCategories.length < 3){
            Alert.alert('Alert', "Please select at least 3 categories")
            return
        }
        if (!imageUri) return;

        setIsUploaded(true)
        const newUri = await compressImage(imageUri);
        
        const formData = new FormData();
        formData.append("image", {
            uri: newUri,
            name: `image.jpg`, // Unique filename
            type: "image/jpeg",
        });
        formData.append("categories", JSON.stringify(selectedCategories));

        try {
            await uploadImage('/upload-image', formData);
        } catch (error) {
            console.error('Upload failed: ', error);
        }
        setIsUploaded(false)
        navigation.goBack()
    }, [selectedCategories, imageUri, navigation]);

    const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <View style={{marginBottom:-32}}>
                <Header onPress={()=>navigation.goBack()} />
            </View>
            <TouchableOpacity onPress={handleUploadImage} style={{backgroundColor:theme.textColor2, padding:8, borderRadius:100}} disabled={isUploaded}>
                {
                    isUploaded ?
                    <ActivityIndicator color={theme.white} />
                    :
                    <Paragraph customStyles={{color:theme.white, fontWeight:'bold'}}>Upload</Paragraph>   
                }
            </TouchableOpacity>
        </View>

        {
            imageUri && 
            <Image source={{ uri: imageUri }} style={styles.image} />
        }  
        <H1 customStyles={{marginBottom:8}}>Choose categories</H1>
        <Paragraph customStyles={{color:theme.white2, marginBottom:8}}>Choose at least 3 that best defines your image</Paragraph>
        <InterestsSelector selected={selectedCategories} setSelected={setSelectedCategories} />
    </View>
  )
}

const createStyles =(theme)=> StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:24
    },
    header:{
        flexDirection:'row',
        alignItems:"center",
        justifyContent:'space-between',
    },
    image: {
        width: screenWidth-48,
        height: screenWidth,
        resizeMode:'contain',
    },
});