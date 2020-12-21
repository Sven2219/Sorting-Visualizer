import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IQuickSnapshots } from '../../../helpers/interfaces';
import { TIMING } from '../../../helpers/types';
import NumberBox from './NumberBox';
import { getBoxContainerWidth, getTextTopPosition, getTopPosition } from './getMethods';

interface IProps {
    currentFieldIndex: number;
    quickSortSnapshotsProcedure: IQuickSnapshots;
    snapshotDisplayMethod: string;
}
const Snapshot = ({ currentFieldIndex, quickSortSnapshotsProcedure, snapshotDisplayMethod }: IProps): JSX.Element => {
    const { snapshots, pivotIndexes, snapshotPosition: { startIndexes, levels } } = quickSortSnapshotsProcedure;
    const slicedSnapshot: number[][] = snapshots.slice(0, currentFieldIndex + 1);

    const displaySortedArrayText = (): JSX.Element | null => {
        const snapshotsLength: number = snapshotDisplayMethod === TIMING ? snapshots.length - 2 : snapshots.length - 1;
        return snapshotsLength === currentFieldIndex
            ? <Text style={{ top: getTextTopPosition(levels), fontFamily: 'Sura-Bold' }}>Sorted Array</Text>
            : null;
    }
    return (
        <View style={[styles.mainContainer, { height: (levels[snapshots.length - 1] * 30) + 200 }]}>
            {slicedSnapshot.length > 0 && slicedSnapshot.map((snapshot, index) => {
                return (
                    <View key={index} style={[styles.boxContainer, { width: getBoxContainerWidth(snapshots[0].length), top: getTopPosition(index, levels) }]}>
                        {snapshot.map((number, ind) => {
                            return (
                                <NumberBox currentNumber={number} currentIndex={ind} key={ind} pivotIndex={pivotIndexes[index]} startIndex={startIndexes[index]} />
                            )
                        })}
                    </View>
                )
            })}
            {displaySortedArrayText()}
        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        alignItems: 'center'
    },
    boxContainer: {
        flexDirection: 'row',
        marginTop: 5,
        position: 'absolute',
    }
})
export default Snapshot;