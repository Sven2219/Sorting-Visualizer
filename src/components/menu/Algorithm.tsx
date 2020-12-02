import React, { useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { AlgorithmsState } from '../../context/AlgorithmsState';
const { width } = Dimensions.get("window")
interface IProps {
    title: string;
    onPress: () => void;
}

const Algorithm = ({ title, onPress }: IProps) => {
    const { state } = useContext(AlgorithmsState);
    const getBackgroundColor = (): string => {
        return title === state.chosenSort ? "rgba(34,139,34,0.6)" : "#fff"
    }
    return (
        <View style={[styles.algoContainer, { backgroundColor: getBackgroundColor() }]}>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.title}>
                    {title}
                </Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    algoContainer: {
        borderWidth: 0.5,
        width: width / 2,
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