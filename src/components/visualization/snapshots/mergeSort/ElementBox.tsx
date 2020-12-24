import React from 'react';
import { View, Text } from 'react-native';
import { IMerge } from '../../../helpers/interfaces';
import { getBackgroundColor, getLeftPosition } from './getMethods';
import { elementBoxStyles as styles } from '../../../helpers/style';

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
            left: getLeftPosition(startIndex, firstHalf),
            marginLeft: 1
        }]}
        >
            <Text style={styles.boldedText}>{currentElement && currentElement.element}</Text>
        </View>
    )
}



export default ElementBox;