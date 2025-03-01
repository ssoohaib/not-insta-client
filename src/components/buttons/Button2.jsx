import { StyleSheet, TouchableOpacity, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import useThemeStore from "../../stores/useThemeStore";
import { Paragraph } from "../appText";

export default function IconButton({onPress, title, leftIcon, rightIcon, titleStyles, customStyles, state=false}){
    const {theme}=useThemeStore();
    const styles=createStyles(theme)

    return(
        <TouchableOpacity onPress={onPress? onPress:()=>{}} style={styles.container} disabled={state}>
            <View style={styles.left}>
                {leftIcon && <View style={styles.icon1}><AntDesign name={leftIcon.name} size={leftIcon.size || 16} color={leftIcon.color || theme.textColor1} /></View>}
                {title && <Paragraph customStyles={[styles.h3, titleStyles && titleStyles]}>{title}</Paragraph>}
            </View>
            {rightIcon && <View><AntDesign name={rightIcon.name} size={leftIcon.size || 16} color={rightIcon.color || theme.textColor1} /></View>}
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