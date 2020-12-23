import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SNAPSHOT_BOX_SIZE } from '../../../helpers/Constants';
import { IMerge } from '../../../helpers/interfaces';
import { getBackgroundColor, getLeftPosition } from './getMethods';


interface IProps {
    isHighlited: boolean;
    currentElement: IMerge | undefined;
    startIndex: number | undefined;
    firstHalf: number;
}

const ElementBox = ({ currentElement, startIndex, isHighlited, firstHalf }: IProps): JSX.Element => {
    return (
        <View style={[styles.numberContainer,
        {
            backgroundColor: getBackgroundColor(isHighlited),
            left: getLeftPosition(startIndex, firstHalf)
        }]}
        >
            <Text style={styles.boldedText}>{currentElement && currentElement.element}</Text>
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
        marginLeft: 1,
    },
    boldedText: {
        fontFamily: 'Sura-Bold',
    }
})

export default ElementBox;