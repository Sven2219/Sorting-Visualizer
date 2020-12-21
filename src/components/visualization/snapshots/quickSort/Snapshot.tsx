import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IQuickSnapshots } from '../../../helpers/interfaces';
import { MANUAL, TIMING } from '../../../helpers/types';
import ElementBox from './ElementBox';
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
    const checkIsSorted = (index: number) => {
        if (snapshotDisplayMethod === MANUAL) {
            return snapshots.length - 1 === index;
        }
        else {
            return snapshots.length - 2 === index;
        }
    }
    return (
        <View style={[styles.mainContainer, { height: (levels[snapshots.length - 1] * 30) + 200 }]}>
            {slicedSnapshot.length > 0 && slicedSnapshot.map((snapshot, index) => {
                return (
                    <View key={index}
                        style={[styles.boxContainer, {
                            width: getBoxContainerWidth(snapshots[0].length),
                            top: getTopPosition(index, levels)
                        }]}>
                        {snapshot.map((element, i) => {
                            return (
                                <ElementBox isSorted={checkIsSorted(index)}
                                    currentElement={element}
                                    currentIndex={i}
                                    key={i}
                                    pivotIndex={pivotIndexes[index]}
                                    startIndex={startIndexes[index]} />
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