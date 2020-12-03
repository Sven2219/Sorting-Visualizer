import React, { useContext } from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AlgorithmsState } from '../context/AlgorithmsState';
import BubbleTheory from './bubble/BubbleTheory';
import { BUBBLE_SORT, HEAP_SORT, MERGE_SORT, QUICK_SORT } from './helpers/sortingTypes';

import QuickTheroy from './quick/QuickTheroy';
interface IProps {
    onPress: () => void;
}

const Theory = ({ onPress }: IProps): JSX.Element => {
    const { state } = useContext(AlgorithmsState);
    const getSortingInfromation = () => {
        switch (state.chosenSort) {
            case BUBBLE_SORT:
                return <BubbleTheory />;
            case QUICK_SORT:
                return <QuickTheroy />;
            case MERGE_SORT:
                return <BubbleTheory />;
            case HEAP_SORT:
                return <BubbleTheory />;
            default:
                return <BubbleTheory />;
        }
    }

    return (
        <Modal >
            <ScrollView style={styles.mainModalContainer}>
                <View style={styles.headerContainer}>
                    <View style={styles.arrowBackContainer}>
                        <Ionicons name="arrow-back" size={35} color="#000" onPress={onPress} />
                    </View>
                    <Text style={styles.titleText}>
                        Theory
                </Text>
                </View>
                {getSortingInfromation()}
            </ScrollView>

        </Modal>
    )
}

const styles = StyleSheet.create({
    mainModalContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
    arrowBackContainer: {
        position: 'absolute',
        left: 20,
        top: 0
    },
    titleText: {
        fontSize: 24,
        fontFamily: 'Sura-Bold'
    },

})

export default Theory;