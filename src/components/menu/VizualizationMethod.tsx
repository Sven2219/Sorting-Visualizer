import React, { useContext } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AlgorithmsState } from '../../context/AlgorithmsState';
import { AlgorithmsDispatch } from '../../context/AlgorithmsDispatch';
import { VIZUALIZATION_METHOD_WIDTH } from '../Constants';
import { getBackgroundColor } from './getMethods';

interface IProps {
    methodName: string;
}

const VizualizationMethod = ({ methodName }: IProps) => {
    const { state } = useContext(AlgorithmsState);
    const { dispatch } = useContext(AlgorithmsDispatch)
    return (
        <TouchableOpacity onPress={() => dispatch({ type: "setVizualizationMethod", payload: methodName })}
            style={[styles.methodContainer, { backgroundColor: getBackgroundColor(methodName, state.vizualizationMethod) }]}>
            <Text>{methodName}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    methodContainer: {
        borderWidth: 0.5,
        width: VIZUALIZATION_METHOD_WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        borderRadius: 5
    }
})
export default VizualizationMethod;