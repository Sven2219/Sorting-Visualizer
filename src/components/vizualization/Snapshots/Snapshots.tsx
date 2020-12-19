import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';

import { AlgorithmsState } from '../../../context/AlgorithmsState';
import { IQuickSnapshots } from '../../helpers/interfaces';
import BoxForNumber from './BoxForNumber';
import { getLeftPosition, getTopPosition } from './getMethods';

interface IProps {
    currentFieldIndex: number;
    quickSortProcedureSnapshots: IQuickSnapshots;
}

const Snapshots = ({ currentFieldIndex, quickSortProcedureSnapshots }: IProps) => {
    const { snapshots, pivotIndexes, snapshotPosition: { start, levels } } = quickSortProcedureSnapshots;
    const slicedSnapshot = snapshots.slice(0, currentFieldIndex + 1);
    return (
        <>

            {slicedSnapshot.length > 0 && slicedSnapshot.map((snapshot, index) => {
                return (
                    <View key={index} style={[styles.mainContainer, { left: getLeftPosition(start[index]), top: getTopPosition(index, levels) }]}>
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
        position: 'absolute',
    }
})
export default Snapshots;