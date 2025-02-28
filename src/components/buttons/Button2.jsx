import { StyleSheet, TouchableOpacity, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import useThemeStore from "../../stores/useThemeStore";
import { Paragraph } from "../appText";

export default function IconButton({title, leftIcon, rightIcon, titleStyles, customStyles}){
    const {theme}=useThemeStore();
    const styles=createStyles(theme)

    return(
        <TouchableOpacity style={styles.container}>
            <View style={styles.left}>
                {leftIcon && <View style={styles.icon1}><AntDesign name={leftIcon.name} size={16} color={leftIcon.color || theme.textColor1} /></View>}
                {title && <Paragraph customStyles={[styles.h3, titleStyles && titleStyles]}>{title}</Paragraph>}
            </View>
            {rightIcon && <View><AntDesign name={rightIcon} size={16} color={theme.textColor1} /></View>}
        </TouchableOpacity>
    )
}

const createStyles=(theme)=>StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        // borderWidth:1
    },
    left:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    icon1:{
        marginRight:8,
        backgroundColor:theme.bgColor1,
        padding:8,
        borderRadius:8
    },
    h3:{

    }
})