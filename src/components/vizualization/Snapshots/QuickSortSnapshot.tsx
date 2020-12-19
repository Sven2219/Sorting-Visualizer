import React, { useContext, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { AlgorithmsState } from '../../../context/AlgorithmsState';
import Snapshots from './Snapshots';
import StepButton from './StepButton';



const QuickSortSnapshot = () => {
    const timers = useRef<NodeJS.Timeout[]>([]);
    const [currentFieldIndex, setCurrentFieldIndex] = useState<number>(0);

    const { state: { quickSortProcedureSnapshots: { snapshots } } } = useContext(AlgorithmsState);

    return (
        <>
            <View style={styles.stepButtonsContainer}>
                <StepButton iconName="ios-chevron-back-outline" onPress={() => setCurrentFieldIndex((previouseIndex) => previouseIndex - 1)} />
                <StepButton iconName="chevron-forward-sharp" onPress={() => setCurrentFieldIndex((previouseIndex) => previouseIndex + 1)} />
            </View>

            <View style={styles.mainContainer}>
                {snapshots.length > 0 && <Snapshots currentFieldIndex={currentFieldIndex} />}
            </View>
        </>

    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        height: 300,

    },
    stepButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5
    }
})
export default QuickSortSnapshot;