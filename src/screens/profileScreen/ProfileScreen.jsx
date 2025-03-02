import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Switch, Image } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import useThemeStore from '../../stores/useThemeStore'
import { Button2, Divider, H1, H3, Paragraph } from '../../components';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { compressImage, pickImage, removeTokens } from '../../utils';
import useUserStore from '../../stores/useUserStore';
import { signOut } from '../../apis/authApis/authApis';
import AntDesign from '@expo/vector-icons/AntDesign';
import { uploadImage } from '../../apis/userApis/userApis';

export default function ProfileScreen({navigation}) {
    const {theme, toggleTheme}=useThemeStore();
    const {setUser, user} = useUserStore();
    const [isEnable, setIsEnable]=useState(true);
    const [imageUri, setImageUri]=useState(user.profile_picture!=='N/A'?user.profile_picture:'N/A')

    const handleSwitch = useCallback(() => {
        toggleTheme();
        setIsEnable(prev => !prev);
    }, [toggleTheme]);

    const handleSignOut = useCallback(async () => {
        await signOut();
        await removeTokens();
        setUser(null);
    }, [setUser]);

    const handleChangePassword = useCallback(async () => {
        navigation.navigate('reset-password-rp', {
            intent: 'reset-password',
            payload: {
                email: user.email
            }
        });
    }, [navigation, user.email]);

    const handleChangePreferences = useCallback(() => {
        navigation.navigate('preference-profile', {
            intent: 'profile'
        });
    }, [navigation]);

    const handleImagePick = useCallback(async () => {
        try {
            const uri = await pickImage();
            const newUri = await compressImage(uri);
                    
            const formData = new FormData();
            formData.append("image", {
                uri: newUri,
                name: `image.jpg`, // Unique filename
                type: "image/jpeg",
            });

            await uploadImage('/upload-profile-picture', formData);
            setImageUri(uri);
        } catch (error) {
            console.error("Failed to pick image:", error);
        }
    }, []);

    const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <ScrollView contentContainerStyle={{flex:1, justifyContent:'space-between'}} style={styles.container}>
        <View>
            <View style={[styles.profileContainer]}>
                <TouchableOpacity onPress={handleImagePick} style={{backgroundColor:theme.bgColor1, padding:8, borderRadius:50, position:'relative', zIndex:999, top:30, left:32 }}>
                    <AntDesign name="edit" size={24} color={theme.textColor1} />
                </TouchableOpacity>
                {
                    imageUri ==='N/A' ?
                    <View style={{marginBottom:16,height:100,width:100, borderRadius:50, backgroundColor:theme.textColor2, alignItems:'center', justifyContent:'center'}}>
                        <H1 customStyles={{}}>{user.name? user.name[0].toUpperCase():'N/A'}</H1>
                    </View>
                    :
                    <View style={{borderRadius:50, overflow:'hidden'}}>
                        <Image source={{uri:imageUri}} style={{objectFit:'cover', height:100, width:100}} />
                    </View>
                }


                <H1 customStyles={{marginBottom:8}}>{user.name ? user.name:'N/A'}</H1>
                <Paragraph customStyles={{color:theme.white2}}>{user.email ? user.email:'N/A'}</Paragraph>
            </View>
            <View style={styles.optionsContainer}>
                <Button2 
                    title='Change Preferences'
                    onPress={handleChangePreferences}
                    leftIcon={{
                        name:'hearto'
                    }}
                    rightIcon={{
                        name:'arrowright'
                    }} 
                />
                <Divider customStyles={{marginVertical:16}} />
                <Button2 
                    title='Change Password' 
                    onPress={handleChangePassword}
                    leftIcon={{
                        name:'key'
                    }}
                    rightIcon={{
                        name:'arrowright'
                    }} 
                />
                <Divider customStyles={{marginVertical:16}} />
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        {
                            !isEnable ? 
                            <View style={{marginRight:8, marginRight:8, backgroundColor:theme.bgColor1, padding:8, borderRadius:8}}><FontAwesome name='sun-o' size={16} color={theme.textColor1} /></View> : 
                            <View style={{marginRight:8, marginRight:8, backgroundColor:theme.bgColor1, padding:8, borderRadius:8}}><FontAwesome name='moon-o' size={16} color={theme.textColor1} /></View>
                        }
                        <Paragraph>Dark Mode</Paragraph>
                    </View>
                    <Switch onValueChange={handleSwitch} trackColor={{true: theme.textColor2}} value={isEnable} />
                </View>
            </View>
        </View>
        <View style={[styles.optionsContainer, {borderColor:theme.red}]}>
            <Button2 
                title='Sign out' 
                onPress={handleSignOut}
                titleStyles={{color:theme.red}}
                leftIcon={{
                    name:'logout',
                    color:theme.red
                }}
                rightIcon={{
                    name:'arrowright',
                    color:theme.red
                }}
            />
        </View>
    </ScrollView>
  )
}


const createStyles=(theme)=>StyleSheet.create({
    container:{
        backgroundColor:theme.bgColor1,
        paddingHorizontal:24,
        paddingBottom:24
        
    },
    profileContainer:{
        alignItems:'center',
        marginBottom:32
    },
    optionsContainer:{
        backgroundColor:theme.bgColor2,
        borderWidth:.5,
        borderColor:theme.white2,
        padding:16,
        borderRadius:16
    }
})