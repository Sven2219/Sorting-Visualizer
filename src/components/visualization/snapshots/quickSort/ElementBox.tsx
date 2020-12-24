import React from 'react';
import { View, Text } from 'react-native';
import { getBackgroundColor, getLeftPosition } from './getMethods';

import { elementBoxStyles as styles } from '../../../helpers/style';
interface IProps {
    currentIndex: number;
    pivotIndex: number;
    currentElement: number;
    startIndex: number;
    isSorted: boolean;
}

const ElementBox = ({ currentElement, pivotIndex, currentIndex, startIndex, isSorted }: IProps): JSX.Element => {
    return (
        <View style={[styles.numberContainer,
        {
            backgroundColor: getBackgroundColor(pivotIndex, currentIndex, isSorted),
            left: getLeftPosition(startIndex),
            marginLeft:0.5
        }
        ]}>
            <Text style={styles.boldedText}>{currentElement}</Text>
        </View>
    )
}



export default ElementBox;