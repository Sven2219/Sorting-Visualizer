import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { IMerge, IMergeSnapshots } from '../../../helpers/interfaces';
import ElementBox from '../mergeSort/ElementBox';
import { getTopPosition } from '../quickSort/getMethods';
import { getMinIndex, getRowContainerWidth } from './getMethods';

interface IProps {
    currentFieldIndex: number;
    mergeSortSnapshotProcedure: IMergeSnapshots;
}

const Snapshot = ({ currentFieldIndex, mergeSortSnapshotProcedure }: IProps): JSX.Element => {
    const { snapshots, levels } = mergeSortSnapshotProcedure;
    const slicedSnapshot: (IMerge | undefined)[][] = snapshots.slice(0, currentFieldIndex + 1);

    return (
            <View style={[styles.mainContainer, { height: (levels[snapshots.length - 1] * 30) + 200, }]}>
                {slicedSnapshot.length > 0 && slicedSnapshot.map((snapshot, index) => {
                    return (
                        <View key={index}
                            style={[styles.rowContainer, {
                                width: getRowContainerWidth(index, snapshots[0].length, levels),
                                top: getTopPosition(index, levels),
                            }]}>
                            {snapshot.map((element, i) => {
                                return (
                                    <ElementBox
                                        currentElement={element}
                                        firstHalf={Math.floor(snapshots[0].length / 2)}
                                        isHighlited={slicedSnapshot.length === index + 1}
                                        key={i}
                                        startIndex={getMinIndex(index, snapshots[index])} />
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
        width: "100%",
        alignItems: 'center',
    },
    rowContainer: {
        flexDirection: 'row',
        position: 'absolute',
    }
})
export default Snapshot;