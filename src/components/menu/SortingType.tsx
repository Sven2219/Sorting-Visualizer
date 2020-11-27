import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface IProps {
    onPress: () => void;
    sortingType: string;
}

const SortingType = ({ onPress, sortingType }: IProps) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={styles.sortingTypeText}>{sortingType}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    sortingTypeText: {
        fontSize: 20,
        letterSpacing: 1.4,
        fontFamily: 'Sura-Regular'
    }
})

export default SortingType;