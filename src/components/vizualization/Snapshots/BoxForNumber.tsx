import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface IProps {
    number: number;
}

const BoxForNumber = ({ number }: IProps) => {
    return (
        <View style={styles.numberContainer}>
            <Text style={styles.boldedText}>{number}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    numberContainer: {
        width: 30,
        height: 30,
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 1
    },
    boldedText: {
        fontFamily: 'Sura-Bold'
    }
})

export default BoxForNumber;