import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BubbleTheory from './bubble/BubbleSortTheory';
import { BUBBLE_SORT, MERGE_SORT, QUICK_SORT } from './helpers/types';
import QuickTheroy from './quick/QuickSortTheory';

interface IProps {
    onPress: () => void;
    chosenSort: string;
}

const Theory = ({ onPress, chosenSort }: IProps): JSX.Element => {
    const getSortingInfromation = (): JSX.Element => {
        switch (chosenSort) {
            case BUBBLE_SORT:
                return <BubbleTheory />;
            case QUICK_SORT:
                return <QuickTheroy />;
            case MERGE_SORT:
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