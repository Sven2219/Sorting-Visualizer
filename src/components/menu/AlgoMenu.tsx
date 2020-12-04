import React, { useContext } from 'react';
import { View, Modal, StyleSheet, Dimensions, TouchableWithoutFeedback, Text } from 'react-native';
import { AlgoritmhsDispatch } from '../../context/AlgorithmsDispatch';
import Algorithm from './Algorithm';
import { BUBBLE_SORT, QUICK_SORT, MERGE_SORT, HEAP_SORT } from '../helpers/sortingTypes';

import { OrientationState } from '../../context/OrientationState';
import { getItemHeight, getItemWidth, getModalHeight, getModalWidth } from './getMethods';


interface IProps {
    onPress: () => void;
}
const AlgoMenu = ({ onPress }: IProps) => {
    const { dispatch } = useContext(AlgoritmhsDispatch);
    const { orientation } = useContext(OrientationState);
    return (
        <Modal transparent>
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={[styles.modalOverlay, { width: getModalWidth(orientation), height: getModalHeight(orientation) }]} />
            </TouchableWithoutFeedback>
            <View style={[styles.itemPosition, { top: (getModalHeight(orientation) - getItemHeight(orientation)) / 1.8 }]}>
                <View style={[styles.itemContainer, { width: getItemWidth(orientation), height: getItemHeight(orientation) }]}>
                    <Text style={styles.title}>
                        ALGORITHMS
                    </Text>
                    <View style={styles.algorithmContainer}>
                        <Algorithm title={"Bubble Sort"} onPress={() => dispatch({ type: "setChosenSort", payload: BUBBLE_SORT })} />
                        <Algorithm title={"Merge Sort"} onPress={() => dispatch({ type: "setChosenSort", payload: MERGE_SORT })} />
                        <Algorithm title={"Quick Sort"} onPress={() => dispatch({ type: "setChosenSort", payload: QUICK_SORT })} />
                        <Algorithm title={"Heap Sort"} onPress={() => dispatch({ type: "setChosenSort", payload: HEAP_SORT })} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    modalOverlay: {
        backgroundColor: '#000000aa',
        position: 'absolute',
        top: 0,
    },
    itemContainer: {

        backgroundColor: '#fff'
    },
    itemPosition: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontFamily: 'Sura-Bold',
        padding: 5,
        letterSpacing: 1.3,
        alignSelf: 'center'
    },
    algorithmContainer: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flex: 1,
        marginBottom: 10
    }
})
export default AlgoMenu;