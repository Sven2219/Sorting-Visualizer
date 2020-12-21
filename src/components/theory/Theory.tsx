import React from 'react';
import { View, Text, Modal, StyleSheet,ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BUBBLE_SORT, MERGE_SORT, QUICK_SORT } from '../helpers/types';
import MergeSort from './MergeSort';
import QuickSort from './QuickSort';

import BubbleSort from './BubbleSort';
interface IProps {
    onPress: () => void;
    chosenSort: string;
}

const Theory = ({ onPress, chosenSort }: IProps): JSX.Element => {
    const getSortingInfromation = (): JSX.Element => {
        switch (chosenSort) {
            case BUBBLE_SORT:
                return <BubbleSort />;
            case QUICK_SORT:
                return <QuickSort />;
            case MERGE_SORT:
                return <MergeSort />;
            default:
                return <BubbleSort />;
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