import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IQuickSnapshots } from '../../../helpers/interfaces';
import BoxForNumber from './BoxForNumber';
import { getLeftPosition, getTopPosition } from './getMethods';

interface IProps {
    currentFieldIndex: number;
    quickSortSnapshotsProcedure: IQuickSnapshots;
}

const Snapshot = ({ currentFieldIndex, quickSortSnapshotsProcedure }: IProps): JSX.Element => {
    const { snapshots, pivotIndexes, snapshotPosition: { startIndexes, levels } } = quickSortSnapshotsProcedure;
    const slicedSnapshot: number[][] = snapshots.slice(0, currentFieldIndex + 1);
    return (
        <View style={{ width: "100%", height: "100%" }}>

            {slicedSnapshot.length > 0 && slicedSnapshot.map((snapshot, index) => {
                return (
                    <View key={index} style={[styles.mainContainer, { left: getLeftPosition(startIndexes[index]), top: getTopPosition(index, levels) }]}>
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
        position: 'absolute',
        width: "100%",
    }
})
export default Snapshot;