import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SNAPSHOT_BOX_SIZE } from '../../../helpers/Constants';
import { getBackgroundColor, getLeftPosition } from './getMethods';

interface IProps {
    currentIndex: number;
    pivotIndex: number;
    currentNumber: number;
    startIndex: number;

}

const NumberBox = ({ currentNumber, pivotIndex, currentIndex, startIndex }: IProps): JSX.Element => {
    return (
        <View style={[styles.numberContainer, { backgroundColor: getBackgroundColor(pivotIndex, currentIndex), left: getLeftPosition(startIndex)}]}>
            <Text style={styles.boldedText}>{currentNumber}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    numberContainer: {
        width: SNAPSHOT_BOX_SIZE,
        height: SNAPSHOT_BOX_SIZE,
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:1,
    },
    boldedText: {
        fontFamily: 'Sura-Bold'
    }
})

export default NumberBox;