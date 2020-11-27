import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
interface IProps {
    onPress: () => void;
}

const StartButton = ({ onPress }: IProps) => {
    return (<TouchableOpacity onPress={onPress} style={styles.positionCenter}>
        <Ionicons name="caret-forward" size={40} onPress={onPress} color={"#fff"}/>
    </TouchableOpacity>)
}
const styles = StyleSheet.create({
    positionCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        left:2
    },
})
export default StartButton;