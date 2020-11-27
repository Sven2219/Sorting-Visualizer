import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
interface IProps {
    onPress: () => void;
}

const StartButton = ({ onPress }: IProps) => {
    return (<TouchableOpacity onPress={onPress} style={styles.positionCenter}>
        <Ionicons name="caret-back-circle-outline" size={40} onPress={onPress}/>
    </TouchableOpacity>)
}
const styles = StyleSheet.create({
    positionCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    text: {
        fontSize: 18,
        letterSpacing: 1.5
    }
})
export default StartButton;