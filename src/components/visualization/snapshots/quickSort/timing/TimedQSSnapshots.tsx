import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { IQuickSnapshots } from '../../../../helpers/interfaces';
import TimingSnapshots from './TimingSnapshots';

interface IProps {
    quickSortSnapshotsProcedure: IQuickSnapshots;
    isVisualizationPaused: boolean;
    visualizationFinished: () => void;
    snapshotDisplayMethod: string;
    isMenuModalOpen: boolean;
    quitPorcedure: () => void;
}

const TimedQSSnapshots = ({ quickSortSnapshotsProcedure, isVisualizationPaused, visualizationFinished, quitPorcedure, snapshotDisplayMethod, isMenuModalOpen }: IProps): JSX.Element => {
    const { snapshots } = quickSortSnapshotsProcedure;
    const [currentField, setCurrentField] = useState<number[]>([]);
    const currentFieldIndex = useRef<number>(0);
    const timers = useRef<NodeJS.Timeout[]>([]);
    useEffect(() => {
        if (snapshots.length > 0) {
            timers.current = startProcedure();
        }
        return () => {
            for (let i = 0; i < snapshots.length; i++) {
                clearTimeout(timers.current[i]);
            }
        }
    }, [snapshots])
    useEffect(() => {
        if (isVisualizationPaused) {
            for (let i = 0; i < snapshots.length; i++) {
                clearTimeout(timers.current[i]);
            }
        }
    }, [isVisualizationPaused])

    useEffect(() => {
        quitPorcedure();
        setCurrentField([]);
    }, [isMenuModalOpen])
    const startProcedure = (): NodeJS.Timeout[] => {
        const start: number = currentFieldIndex.current > 0 ? currentFieldIndex.current + 1 : currentFieldIndex.current;
        const slicedData: number[][] = snapshots.slice(start, snapshots.length);
        return (slicedData.map((field, index) => {
            return setTimeout(() => {
                if (!isVisualizationPaused) {
                    if (index !== snapshots.length - 1 - start) {
                        if (start > 0) {
                            currentFieldIndex.current = currentFieldIndex.current + 1;
                            setCurrentField(field);
                        }
                        else {
                            currentFieldIndex.current = index;
                            setCurrentField(field);
                        }
                    }
                    else {
                        currentFieldIndex.current = 0;
                        visualizationFinished();
                    }
                }
            }, 700 * (index !== snapshots.length - 1 - start ? index : index - 0.9))
        }))
    }
    return (
        <View style={styles.mainContainer}>
            <View style={styles.snapshotContainer}>
                {currentField.length > 0 && <TimingSnapshots snapshotDisplayMethod={snapshotDisplayMethod} currentFieldIndex={currentFieldIndex.current}
                    quickSortProcedureSnapshots={quickSortSnapshotsProcedure}
                    currentField={currentField}
                />}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    snapshotContainer: {
        bottom: 50
    }
})
export default React.memo(TimedQSSnapshots, (prevProps, currentProps) => {
    return (prevProps.isVisualizationPaused == currentProps.isVisualizationPaused && prevProps.isMenuModalOpen == currentProps.isMenuModalOpen);
});