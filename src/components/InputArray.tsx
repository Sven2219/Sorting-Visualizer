import React, { useContext } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { OrientationState } from '../context/OrientationState';
import { INPUT_ARRAY_WIDTH_LANDSCAPE, INPUT_ARRAY_WIDTH_PORTRAIT, INPUT_ARRAY_MARGIN_LEFT_LANDSCAPE, INPUT_ARRAY_MARGIN_LEFT_PORTRAIT, LABEL_TEXT_WIDTH, INPUT_ARRAY_HEIGHT } from './helpers/Constants';
import { PORTRAIT } from './helpers/types';

interface IProps {
    onPress: (arrayForSort: string) => void;
    arrayForSort: string;
    editable: boolean;
}

const InputArray = ({ onPress, arrayForSort, editable }: IProps): JSX.Element => {
    const { orientation } = useContext(OrientationState);
    const getInputTextWidth = (): number => {
        return orientation === PORTRAIT ? INPUT_ARRAY_WIDTH_PORTRAIT : INPUT_ARRAY_WIDTH_LANDSCAPE
    }
    const getLeftMargin = (): number => {
        return orientation === PORTRAIT ? INPUT_ARRAY_MARGIN_LEFT_PORTRAIT : INPUT_ARRAY_MARGIN_LEFT_LANDSCAPE;
    }
    return (
        <View style={[styles.inputArrayContainer, { width: getInputTextWidth(), marginLeft: getLeftMargin() }]}>
            <Text style={[styles.labelText, { color: editable ? "#000" : "#d3d3d3" }]}>Array: </Text>
            <TextInput
                editable={editable}
                value={arrayForSort}
                onChangeText={(arrayForSort) => onPress(arrayForSort)}
                style={styles.textInput}
                placeholder={"1, 2, 3, 4, 5, 6"}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    inputArrayContainer: {
        borderWidth: 1,
        borderRadius: 10,
        height: INPUT_ARRAY_HEIGHT,
        alignItems: 'center',
        flexDirection: 'row',
        overflow: 'hidden'
    },
    labelText: {
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1.4,
        marginLeft: 10,
        width: LABEL_TEXT_WIDTH,
    },
    textInput: {
        fontSize: 18,
    }
})
export default InputArray;