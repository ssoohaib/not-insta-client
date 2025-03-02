import React, { useCallback, useEffect, useState } from 'react';
import { View, TouchableOpacity, Dimensions, FlatList, Image, RefreshControl, ActivityIndicator } from 'react-native';
import { Button1, H1, Paragraph } from '../../components';
import AntDesign from '@expo/vector-icons/AntDesign';
import useThemeStore from '../../stores/useThemeStore';
import { getMyImages } from '../../apis/userApis/userApis';
import { pickImage } from '../../utils';
const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

export default function UploadScreen({navigation}) {
    const {theme}=useThemeStore()
    const [myImages,setMyImages]=useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [trigger, setTrigger]=useState(false)

    const handleRefresh = useCallback(() => {
        setTrigger(prev => !prev);
    }, []);

    useEffect(()=>{
        fetchMyImages();
    },[trigger])

    const fetchMyImages = useCallback(async () => {
        setRefreshing(true);
        try {
            const images = await getMyImages();
            setMyImages(images);
            setRefreshing(false);
        } catch (error) {
            setRefreshing(false);
            console.error("Failed to fetch images:", error);
        }
    }, []);

    const handleImagePick = useCallback(async () => {
        try {
            const uri = await pickImage();
            navigation.navigate('selected-image', {
                payload: {
                    uri: uri
                }
            });
        } catch (error) {
            console.error("Failed to pick image:", error);
        }
    }, [navigation]);

    const renderMyImagesCard=({item})=>{

        return(
            <Image source={{uri:item.uri}} style={{height:100, width:100, marginRight:8, marginBottom:8}} />
        )
    }
    return (
        <View style={{flex:1, paddingHorizontal:24}}>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginBottom:16}}>
                <H1>Share an image</H1>
            </View>
            <TouchableOpacity onPress={handleImagePick} style={{borderWidth:2, borderColor:theme.bgColor2, borderRadius:16, paddingVertical:24, alignItems:'center', justifyContent:'center', marginBottom:32}}>
                <AntDesign name="pluscircleo" size={40} color={theme.white2} />
                <Paragraph customStyles={{marginTop:16, fontWeight:'bold', color:theme.white2}}>Upload</Paragraph>
            </TouchableOpacity>    
            <View style={{flex:1}}>
                <H1 customStyles={{marginBottom:16}}>Your Images</H1>
                {
                    myImages.length?
                    <View style={{flex:1}}>
                        <FlatList
                            data={myImages}
                            renderItem={renderMyImagesCard}
                            keyExtractor={item=>item.uri}
                            numColumns={3}
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={theme.textColor1}/>}
                        />
                    </View>
                    :
                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        <Paragraph customStyles={{color:theme.textColor1, marginBottom:8}}>You have no images.</Paragraph>
                        <Paragraph customStyles={{color:theme.white2, marginBottom:16}}>Start uploading to see your images here.</Paragraph>
                        <Button1 
                            title='Refresh' 
                            customStyles={{padding:0, backgroundColor:theme.bgColor2, padding:6, paddingHorizontal:10}} 
                            titleStyles={{color:theme.textColor2, fontSize:12}} 
                            onPress={handleRefresh}   
                            state={refreshing}
                        />
                    </View>
                }
            </View>
        </View>
    );
}