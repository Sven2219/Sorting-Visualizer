import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { IMergeSnapshots } from '../../../../helpers/interfaces';
import { PORTRAIT } from '../../../../helpers/types';
import StepButton from '../../general/StepButton';
import Snapshot from '../../mergeSort/Snapshot';
import { snapshotStyles as styles } from '../../../../helpers/style';

interface IProps {
    mergeSortSnapshotsProcedure: IMergeSnapshots;
    isVisualizationFinished: boolean;
    orientation: string;
    invalidOrientation: () => void;
}

const ManualQSSnapshots = ({ mergeSortSnapshotsProcedure, isVisualizationFinished, orientation, invalidOrientation }: IProps): JSX.Element => {
    const [currentFieldIndex, setCurrentFieldIndex] = useState<number>(0);
    const { snapshots } = mergeSortSnapshotsProcedure;
    useEffect(() => {
        if (orientation === PORTRAIT && snapshots[0] !== undefined) {
            if (snapshots[0].length > 5) {
                invalidOrientation();
                setCurrentFieldIndex(0);
            }
        }
    }, [orientation])
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
                    currentFieldIndex={currentFieldIndex}
                    mergeSortSnapshotProcedure={mergeSortSnapshotsProcedure} />
                }
            </View>
        </View>
    )
}

export default React.memo(ManualQSSnapshots, (prevProps, currentProps) => {
    return prevProps.isVisualizationFinished === currentProps.isVisualizationFinished && prevProps.orientation == currentProps.orientation
});