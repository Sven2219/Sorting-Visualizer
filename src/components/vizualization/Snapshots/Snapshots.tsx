import React, { useContext, useRef } from 'react';
import { View, StyleSheet,ScrollView, Modal } from 'react-native';

import { AlgorithmsState } from '../../../context/AlgorithmsState';
import BoxForNumber from './BoxForNumber';
import { getLeftPosition, getTopPosition } from './getMethods';

interface IProps {
    currentFieldIndex: number;
}

const Snapshots = ({ currentFieldIndex }: IProps) => {
    const { state: { quickSortProcedureSnapshots: { snapshots, pivotIndexes, snapshotPosition: { start, levels } } } } = useContext(AlgorithmsState);
    const slicedSnapshot = snapshots.slice(0, currentFieldIndex + 1);
    return (
        <>

            {slicedSnapshot.length > 0 && slicedSnapshot.map((snapshot, index) => {
                return (
                    <View key={index} style={[styles.mainContainer, { left: getLeftPosition(start[index]), top:getTopPosition(index,levels) }]}>
                        {snapshot.map((number, ind) => {
                            return (
                                <BoxForNumber currentNumber={number} currentIndex={ind} key={ind} pivotIndex={pivotIndexes[index]} />
                            )
                        })}
                    </View>
                )
            })}
        </>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        position:'absolute'
    }
})
export default Snapshots;