import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { INTERESTS } from '../../utils';
import useThemeStore from '../../stores/useThemeStore';
import { Paragraph } from '../appText';

export default function InterestsSelector({selected, setSelected, disabled=false}) {
    const {theme}=useThemeStore();
    const handleToggleInterest = (id) => {
        setSelected(prev => 
            prev.includes(id) ? prev.filter(interestId => interestId !== id) : [...prev, id]
        );
    };

    const styles=createStyles(theme)
  return (
    <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {INTERESTS.map((item) => {
            const isSelected = selected.includes(item.id);
            return (
                <TouchableOpacity
                    key={item.id}
                    style={[styles.interest, isSelected && styles.selectedInterest]}
                    onPress={() => handleToggleInterest(item.id)}
                >
                    <Paragraph>
                        {item.icon} {item.name}
                    </Paragraph>
                </TouchableOpacity>
            );
        })}
    </ScrollView>
  )
}

const createStyles = (theme) => StyleSheet.create({
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