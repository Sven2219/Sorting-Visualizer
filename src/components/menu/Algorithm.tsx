import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AlgorithmsState } from '../../context/AlgorithmsState';
import { OrientationState } from '../../context/OrientationState';
import { getItemWidth, getBackgroundColor } from './getMethods';
interface IProps {
    title: string;
    onPress: () => void;
}

const Algorithm = ({ title, onPress }: IProps): JSX.Element => {
    const { state } = useContext(AlgorithmsState);
    const { orientation } = useContext(OrientationState);

    return (
        <View style={[styles.mainContainer,
        { backgroundColor: getBackgroundColor(title, state.sortingAlgorithm), width: getItemWidth(orientation) * 0.8 }
        ]}>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.title}>
                    {title}
                </Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        borderWidth: 0.5,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 17,
        fontFamily: 'Sura-Regular',
        letterSpacing: 1.1
    }
})
export default Algorithm;