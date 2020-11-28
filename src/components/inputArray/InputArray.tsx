import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { OrientationState } from '../../context/OrientationState';
import { INPUT_ARRAY_WIDTH_LANDSCAPE, INPUT_ARRAY_WIDTH_PORTRAIT, MARGIN_LEFT_LANDSCAPE, MARGIN_LEFT_PORTRAIT } from '../sorting/bubble/Constants';
interface IProps {
    onPress: (arrayForSort: string) => void;
    arrayForSort: string;
    editable: boolean;
}

const InputArray = ({ onPress, arrayForSort,editable }: IProps) => {
    const { orientation } = useContext(OrientationState);
    const widthDependOnOrientation = (): number => {
        return orientation === 'PORTRAIT' ? INPUT_ARRAY_WIDTH_PORTRAIT : INPUT_ARRAY_WIDTH_LANDSCAPE
    }
    const marginLeftDependOnOrientation = (): number => {
        return orientation === 'PORTRAIT' ? MARGIN_LEFT_PORTRAIT : MARGIN_LEFT_LANDSCAPE;
    }
    return (
        <View style={[styles.inputArrayContainer, { width: widthDependOnOrientation(), marginLeft: marginLeftDependOnOrientation() }]}>
            <Text style={styles.labelText}>Array: </Text>
            <TextInput editable={editable} value={arrayForSort} onChangeText={(arrayForSort) => onPress(arrayForSort)} style={styles.textInput} placeholder={"1, 2, 3, 4, 5, 6"} />
        </View>
    )
}
const styles = StyleSheet.create({
    inputArrayContainer: {
        borderWidth: 1,
        borderRadius: 10,
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        overflow: 'hidden'
    },
    labelText: {
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1.4,
        marginLeft: 10,
        width: 60,
    },
    textInput: {
        fontSize: 18,
    }
})
export default InputArray;