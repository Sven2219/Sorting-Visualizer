import React, { useContext } from 'react';
import { View, Modal, StyleSheet, TouchableWithoutFeedback, Text } from 'react-native';
import { AlgorithmsDispatch } from '../../context/AlgorithmsDispatch';
import Algorithm from './Algorithm';
import { BUBBLE_SORT, QUICK_SORT, MERGE_SORT, HEAP_SORT, CHARTS, SNAPSHOTS, TREE } from '../helpers/types';
import { OrientationState } from '../../context/OrientationState';
import { getItemHeight, getItemWidth, getModalHeight, getModalWidth } from './getMethods';
import VizualizationMethod from './VizualizationMethod';
import { AlgorithmsState } from '../../context/AlgorithmsState';


interface IProps {
    onPress: () => void;
}

const AlgoMenu = ({ onPress }: IProps) => {
    const { state } = useContext(AlgorithmsState);
    const { dispatch } = useContext(AlgorithmsDispatch);
    const { orientation } = useContext(OrientationState);
    return (
        <Modal transparent>
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={[styles.modalOverlay, { width: getModalWidth(orientation), height: getModalHeight(orientation) }]} />
            </TouchableWithoutFeedback>
            <View style={[styles.itemPosition, { top: (getModalHeight(orientation) - getItemHeight(orientation)) / 1.8 }]}>
                <View style={[styles.itemContainer, { width: getItemWidth(orientation), height: getItemHeight(orientation) }]}>
                    <Text style={styles.title}>
                        VIZUALIZATION
                    </Text>
                    <View style={styles.vizualizationMethod}>
                        <VizualizationMethod methodName={CHARTS} />
                        <VizualizationMethod methodName={SNAPSHOTS} />
                        <VizualizationMethod methodName={TREE} />
                    </View>
                    <Text style={[styles.title, { top: 10 }]}>
                        ALGORITHMS
                    </Text>
                    <View style={styles.algorithmContainer}>
                        {state.vizualizationMethod === CHARTS && <Algorithm title={BUBBLE_SORT} onPress={() => dispatch({ type: "setChosenSort", payload: BUBBLE_SORT })} />}
                        {state.vizualizationMethod !== TREE && <Algorithm title={MERGE_SORT} onPress={() => dispatch({ type: "setChosenSort", payload: MERGE_SORT })} />}
                        {state.vizualizationMethod !== TREE && <Algorithm title={QUICK_SORT} onPress={() => dispatch({ type: "setChosenSort", payload: QUICK_SORT })} />}
                        {state.vizualizationMethod !== SNAPSHOTS && <Algorithm title={HEAP_SORT} onPress={() => dispatch({ type: "setChosenSort", payload: HEAP_SORT })} />}
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
    },
    vizualizationMethod: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',

    }
})
export default AlgoMenu;