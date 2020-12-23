import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SNAPSHOT_BOX_SIZE } from '../../../helpers/Constants';
import { IMerge } from '../../../helpers/interfaces';


interface IProps {
    isHighlited: boolean;
    currentElement: IMerge | undefined;
    startIndex: number | undefined;
    level: number;
}

const ElementBox = ({ currentElement, startIndex, isHighlited, level }: IProps): JSX.Element => {
    const getBackgroundColor = (): string => {
        return isHighlited ? "#006400" : "#fff"
    }
    const getLeftPosition = (start: number): number => {
        return start*(SNAPSHOT_BOX_SIZE+8+level*2)
    }
    return (
        <View style={[styles.numberContainer, { backgroundColor: getBackgroundColor(), left: startIndex !== undefined ? getLeftPosition(startIndex) : 0 }]}>
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