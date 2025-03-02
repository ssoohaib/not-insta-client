import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStack, ProfileStack, UploadStack } from '../stacks';
import useThemeStore from '../../stores/useThemeStore';
import AntDesign from '@expo/vector-icons/AntDesign';
import useUserStore from '../../stores/useUserStore';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
    const {theme}=useThemeStore();
    const {user}=useUserStore();
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: theme.bgColor1,
                    borderTopColor: theme.bgColor2,
                },
                tabBarActiveTintColor: theme.textColor2,
                tabBarInactiveTintColor: theme.whit2,
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if(route.name === 'Upload') {
                        iconName = 'pluscircleo'
                    }else if (route.name === user.name || route.name === 'Profile') {
                        iconName = 'user';
                    }
                    return <AntDesign name={iconName} size={20} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Upload" component={UploadStack} />
            <Tab.Screen name={user.name? user.name:"Profile"} component={ProfileStack} />
        </Tab.Navigator>
    );
}