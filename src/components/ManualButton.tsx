import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
interface IProps {
    text: string;
    onPress: () => void;
}

const ManualButton = ({ text, onPress }: IProps): JSX.Element => {
    return (
        <View style={styles.manualContainer}>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.manualText}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    manualContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        top: 40
    },
    manualText: {
        fontFamily: 'Sura-Bold'
    }
})
export default ManualButton;