import React, { useContext } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AlgorithmsState } from '../../context/AlgorithmsState';
import { AlgorithmsDispatch } from '../../context/AlgorithmsDispatch';
import { VIZUALIZATION_METHOD_WIDTH } from '../helpers/Constants';
import { getBackgroundColor } from './getMethods';

interface IProps {
    methodName: string;
}

const VisualizationMethod = ({ methodName }: IProps): JSX.Element => {
    const { state } = useContext(AlgorithmsState);
    const { dispatch } = useContext(AlgorithmsDispatch)
    return (
        <TouchableOpacity onPress={() => dispatch({ type: "setVisualizationMethod", payload: methodName })}
            style={[styles.methodContainer, { backgroundColor: getBackgroundColor(methodName, state.visualizationMethod) }]}>
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
export default VisualizationMethod;