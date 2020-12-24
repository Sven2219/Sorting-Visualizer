import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { IQuickSnapshots } from '../../../../helpers/interfaces';
import StepButton from '../../general/StepButton';
import Snapshot from '../Snapshot';

interface IProps {
    quickSortSnapshotsProcedure: IQuickSnapshots;
    isVisualizationFinished: boolean;
    snapshotDisplayMethod: string;
}

const ManualQSSnapshots = ({ quickSortSnapshotsProcedure, isVisualizationFinished, snapshotDisplayMethod }: IProps): JSX.Element => {
    const [currentFieldIndex, setCurrentFieldIndex] = useState<number>(0);
    const { snapshots } = quickSortSnapshotsProcedure;
    useEffect(() => {
        if (isVisualizationFinished === true) {
            setCurrentFieldIndex(0);
        }
    }, [isVisualizationFinished])
    const decrementIndex = (): void => {
        setCurrentFieldIndex((previouseIndex: number) => {
            if (previouseIndex - 1 < 0) {
                return 0;
            }
            return previouseIndex - 1;
        })
    }
    const incrementIndex = (): void => {
        setCurrentFieldIndex((previouseIndex: number) => {
            if (previouseIndex + 1 > snapshots.length - 1) {
                return previouseIndex;
            }
            return previouseIndex + 1;
        })
    }
    return (
        <View style={styles.mainContainer}>
            <View style={styles.stepButtonsContainer}>
                <StepButton iconName="ios-chevron-back-outline" onPress={decrementIndex} />
                <StepButton iconName="chevron-forward-sharp" onPress={incrementIndex} />
            </View>
            <View style={styles.snapshotContainer}>

                {snapshots.length > 0 && <Snapshot
                    snapshotDisplayMethod={snapshotDisplayMethod}
                    currentFieldIndex={currentFieldIndex}
                    quickSortSnapshotsProcedure={quickSortSnapshotsProcedure}
                />}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    stepButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        bottom: 10
    },
    snapshotContainer: {
        bottom: 30
    }
})
export default React.memo(ManualQSSnapshots, (prevProps, currentProps) => {
    return prevProps.isVisualizationFinished === currentProps.isVisualizationFinished
});