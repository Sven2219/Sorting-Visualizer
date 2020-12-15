import React, { useContext, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { AlgorithmsState } from '../../../context/AlgorithmsState';
import BoxForNumber from './BoxForNumber';
import { getRightPostion, getTopPosition } from './getMethods';

interface IProps {
    currentFieldIndex: number;
}

const Snapshots = ({ currentFieldIndex }: IProps) => {
    const { state: { quickSortProcedureSnapshots: { snapshots, pivotIndexes, directions } } } = useContext(AlgorithmsState);
    const slicedSnapshot = snapshots.slice(0, currentFieldIndex + 1);
    const directionFlag = useRef<boolean>(false);
    const checkDirection = (currentSnapshot: number[]) => {
        const firstTransformation: number[] = snapshots[1].slice(pivotIndexes[1] + 1, snapshots[1].length - 1);
        console.log(firstTransformation)
        if (firstTransformation.length === currentSnapshot.length) {
            const same = firstTransformation.every((element, index) => element === currentSnapshot[index]);
            if (same) {
                directionFlag.current = true;
            }
        }
    }
    return (
        <View>
            {slicedSnapshot.length > 0 && slicedSnapshot.map((snapshot, index) => {
                if (!directionFlag.current) {
                    checkDirection(snapshot);
                }
                if (currentFieldIndex + 1 === snapshots.length) {
                    directionFlag.current = false;
                }
                return (
                    <View key={index} style={[styles.mainContainer, { right: getRightPostion(index, directions), marginTop: getTopPosition(index, directions) }]}>
                        {snapshot.map((number, index) => {

                            return (
                                <BoxForNumber currentNumber={number} currentIndex={index} key={index} pivotIndex={pivotIndexes[currentFieldIndex]} />
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
        flexDirection: 'row'
    }
})
export default Snapshots;