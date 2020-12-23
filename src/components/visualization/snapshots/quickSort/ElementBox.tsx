import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SNAPSHOT_BOX_SIZE } from '../../../helpers/Constants';
import { getBackgroundColor, getLeftPosition } from './getMethods';

interface IProps {
    currentIndex: number;
    pivotIndex: number;
    currentElement: number;
    startIndex: number;
    isSorted: boolean;
}

const ElementBox = ({ currentElement, pivotIndex, currentIndex, startIndex, isSorted }: IProps): JSX.Element => {
    return (
        <View style={[styles.numberContainer, { backgroundColor: getBackgroundColor(pivotIndex, currentIndex, isSorted), left: getLeftPosition(startIndex) }]}>
            <Text style={styles.boldedText}>{currentElement}</Text>
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
        marginLeft: 0.5,
    },
    boldedText: {
        fontFamily: 'Sura-Bold'
    }
})

export default ElementBox;