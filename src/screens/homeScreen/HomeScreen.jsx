import { View, Text, ScrollView, FlatList, StyleSheet, TouchableOpacity, Image, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CategoryItem, Divider, FeedImageCard, H3, InterestsSelector, Logo, Paragraph } from '../../components'
import {INTERESTS} from '../../utils'
import useThemeStore from '../../stores/useThemeStore';
import useUserStore from '../../stores/useUserStore';
import { Dimensions } from 'react-native';
import { getImagesByCategory } from '../../apis/userApis/userApis';

export default function HomeScreen() {
  const {theme}=useThemeStore();
  const {user}=useUserStore();
  
  const styles=createStyles(theme);

  const [selectedCategroy, setSelectedCategory]=useState(user.interests)
  const [currentImages, setCurrentImages]=useState([])
  const [fetchingImages, setFetchingImages]=useState(false)
  const [trigger, setTrigger]=useState(false)
  
  const handleRefresh=()=>{
    setTrigger(prev=>!prev)
  }

  useEffect(()=>{
    const fetchImages=async()=>{
      setFetchingImages(true);
      try {
        const data = await getImagesByCategory(selectedCategroy);
        setCurrentImages(data);
      } catch (error) {
        setFetchingImages(false);
        console.error('Error fetching images:', error);
      } finally {
        setFetchingImages(false);
      }      
    }

    fetchImages();
  }, [selectedCategroy, trigger])

  const handleInterestSelection=(id)=>{
    setSelectedCategory([id])
  }

  const renderItem=({item})=>{
    const isSelected =  (user.interests.includes(item.id) && user.interests==selectedCategroy)? false:selectedCategroy.includes(item.id);
    
    return(
      <CategoryItem isSelected={isSelected} item={item} onPress={()=>{handleInterestSelection(item.id)}} icon={false}  />
    )
  }

  const renderImages=({item})=>{
    const categories = item.categories.map(catId => INTERESTS.find(interest => interest.id === catId)).filter(Boolean);
    return(
      <FeedImageCard item={item} categories={categories} />
    )
  }

  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal:24,marginBottom:16}}>
        <Logo size1={14} size2={24} />
      </View>
      <View style={{marginLeft:24, paddingVertical:8, flexDirection:'row', alignItems:"center"}}>
        <CategoryItem isSelected={selectedCategroy===user.interests} item={{name:'For you'}} onPress={()=>{setSelectedCategory(user.interests)}} icon={false}  />
        <CategoryItem isSelected={selectedCategroy.length===0} item={{name:'All'}} onPress={()=>{setSelectedCategory([])}} icon={false}  />
        <FlatList
          data={INTERESTS}
          renderItem={renderItem}
          keyExtractor={(item)=>item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <Divider customStyles={{backgroundColor:theme.bgColor2, marginBottom:16}} />
        <FlatList
          data={currentImages}
          keyExtractor={item=>item.uri}
          renderItem={renderImages}
          refreshControl={<RefreshControl refreshing={fetchingImages} onRefresh={handleRefresh} tintColor={theme.textColor1}/>}
          contentContainerStyle={{paddingBottom:100}}
        />
    </View>
  )
}

const createStyles = (theme) => StyleSheet.create({
  container:{
    flex:1
  }
})