import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SNAPSHOT_BOX_SIZE } from '../../../helpers/Constants';
import { IMerge, IMergeSnapshots } from '../../../helpers/interfaces';

import ElementBox from '../mergeSort/ElementBox';
import { getTopPosition } from '../quickSort/getMethods';

interface IProps {
    currentFieldIndex: number;
    mergeSortSnapshotProcedure: IMergeSnapshots;
    snapshotDisplayMethod: string;
}
const Snapshot = ({ currentFieldIndex, mergeSortSnapshotProcedure }: IProps): JSX.Element => {
    const { snapshots, levels } = mergeSortSnapshotProcedure;
    const slicedSnapshot: (IMerge | undefined)[][] = snapshots.slice(0, currentFieldIndex + 1);
    const getMinIndex = (index: number): number => {
        return Math.min.apply(null, snapshots[index].map((item) => {
            if (item !== undefined) {
                return item.index;
            }
            return -1;
        }))
    }
    const getWidth = (index:number) => {
        return (snapshots[0].length * (SNAPSHOT_BOX_SIZE * 1.1))
    }
    return (
        <View style={[styles.mainContainer, { height: (levels[snapshots.length - 1] * 30) + 200, }]}>
            {slicedSnapshot.length > 0 && slicedSnapshot.map((snapshot, index) => {
                return (
                    <View key={index}
                        style={[styles.boxContainer, {
                            width: getWidth(index),
                            top: getTopPosition(index, levels),
                        }]}>
                        {snapshot.map((element, i) => {
                            return (
                                <ElementBox
                                    currentElement={element}
                                    isHighlited={slicedSnapshot.length === index + 1}
                                    key={i}
                                    startIndex={getMinIndex(index)} />
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
        alignItems: 'center'
    },
    boxContainer: {
        flexDirection: 'row',
        position: 'absolute',
    }
})
export default Snapshot;