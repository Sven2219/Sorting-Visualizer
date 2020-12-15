import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getBackgroundColor } from './getMethods';

interface IProps {
    currentIndex: number;
    pivotIndex: number;
    currentNumber: number;
}

const BoxForNumber = ({ currentNumber, pivotIndex, currentIndex }: IProps) => {
    return (
        <View style={[styles.numberContainer, { backgroundColor: getBackgroundColor(pivotIndex, currentIndex) }]}>
            <Text style={styles.boldedText}>{currentNumber}</Text>
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