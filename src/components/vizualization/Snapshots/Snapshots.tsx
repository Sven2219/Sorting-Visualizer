import React, { useContext, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { AlgorithmsState } from '../../../context/AlgorithmsState';
import BoxForNumber from './BoxForNumber';
import { getLeftPosition, getTopPosition } from './getMethods';

interface IProps {
    currentFieldIndex: number;
}

const Snapshots = ({ currentFieldIndex }: IProps) => {
    const { state: { quickSortProcedureSnapshots: { snapshots, pivotIndexes, snapshotPosition: { start, levels } } } } = useContext(AlgorithmsState);
    const slicedSnapshot = snapshots.slice(0, currentFieldIndex + 1);
    let transformationCounter: number = 0;
    return (
        <View>
            {slicedSnapshot.length > 0 && slicedSnapshot.map((snapshot, index) => {
                if (levels[index] === levels[index - 1]) {
                    transformationCounter++;
                }
                return (
                    <View key={index} style={[styles.mainContainer, { left: getLeftPosition(start[index]), top: getTopPosition(index, levels, transformationCounter) }]}>
                        {snapshot.map((number, ind) => {
                            return (
                                <BoxForNumber currentNumber={number} currentIndex={ind} key={ind} pivotIndex={pivotIndexes[index]} />
                            )
                        })}
                    </View>
                )
            })}
        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
    }
})
export default Snapshots;