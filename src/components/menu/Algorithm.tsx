import React, { useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { AlgorithmsState } from '../../context/AlgorithmsState';
import { OrientationState } from '../../context/OrientationState';
import { getItemWidth,getBackgroundColor} from './getMethods';
interface IProps {
    title: string;
    onPress: () => void;
}

const Algorithm = ({ title, onPress }: IProps) => {
    const { state } = useContext(AlgorithmsState);
    const { orientation } = useContext(OrientationState);
   
    return (
        <View style={[styles.algoContainer, { backgroundColor: getBackgroundColor(title,state.chosenSort), width: getItemWidth(orientation)*0.8 }]}>
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