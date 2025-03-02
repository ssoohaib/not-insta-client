import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, StyleSheet, Alert, ScrollView, Switch } from "react-native";
import useThemeStore from "../../stores/useThemeStore";
import { Button1, H1, H3, Header, InterestsSelector, Paragraph } from "../../components";
import { storeInterests, updateInterests } from "../../apis/userApis/userApis";
import useUserStore from "../../stores/useUserStore";

const InterestScreen = ({ navigation, route }) => {
    const { setUser, user } = useUserStore();
    const { theme, toggleTheme } = useThemeStore();
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [isEnable, setIsEnable] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    const styles = useMemo(()=>{
        return createStyles(theme)
    },[theme]) 

    useEffect(() => {
        setSelectedInterests(user?.interests || []);
    }, []);
    
    const handleSwitch = useCallback(() => {
        toggleTheme();
        setIsEnable(prev => !prev);
    }, []);

    const handleSubmit = useCallback(async () => {
        if (selectedInterests.length < 3) {
            Alert.alert('Alert', 'Please select at least 3 interests.');
            return;
        }

        setIsSubmitted(true);
        try {
            if (route.params.intent === 'profile') {
                await updateInterests(selectedInterests);
                Alert.alert('Success', 'Interests updated successfully.');
            } else {
                await storeInterests(selectedInterests);
            }
            const updatedUser = route.params.intent === 'profile' ? { ...user, interests: selectedInterests } : { ...route.params.payload, interests: selectedInterests };
            setUser(updatedUser);
            setIsSubmitted(false);
        } catch (error) {
            Alert.alert('Error', 'Failed to store/update interests. Please try again.');
            setIsSubmitted(false);
        }
    }, [selectedInterests, route.params.intent, route.params.payload, setUser, user]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View>
                {
                    route.params.intent === 'profile' &&
                    <Header onPress={() => navigation.goBack()} title='Profile' />
                }
                {
                    route.params.intent !== 'profile' &&
                    <>
                        <H1 customStyles={{ marginBottom: 16 }}>Preference</H1>
                        <View style={{ marginBottom: 32, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <H3>Dark Mode</H3>
                            <Switch onValueChange={handleSwitch} trackColor={{ true: theme.textColor2 }} value={isEnable} />
                        </View>
                    </>
                }

                <H1 customStyles={{ marginBottom: 16 }}>Tell us your interests</H1>
                <Paragraph customStyles={{ color: theme.white2, marginBottom: 16 }}>Choose at least 3 interests, and we'll curate the best events for your.</Paragraph>
                <InterestsSelector selected={selectedInterests} setSelected={setSelectedInterests} />
            </View>

            <Button1
                title={route.params.intent === 'profile' ? 'Update' : 'Done'}
                customStyles={{ backgroundColor: theme.textColor2 }}
                onPress={handleSubmit}
                state={isSubmitted}
            />
        </ScrollView>
    );
};

const createStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bgColor1,
        padding: 20,
        justifyContent: 'space-between',
    },
    interest: {
        backgroundColor: theme.bgColor2,
        padding: 8,
        paddingHorizontal: 12,
        borderRadius: 25,
        margin: 5,
    },
    selectedInterest: {
        backgroundColor: theme.textColor2,
    },
    interestText: {
        color: theme.white,
        fontSize: 16,
    },
    selectedText: {
        color: theme.bgColor1,
        fontWeight: "bold",
    },
});

export default InterestScreen;
