import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { IQuickSnapshots } from '../../../../helpers/interfaces';
import Snapshots from '../Snapshots';
import StepButton from '../../StepButton';

interface IProps {
    quickSortProcedureSnapshot: IQuickSnapshots;
    isVizualizationFinished: boolean;
}

const ManualQSSnapshots = ({ quickSortProcedureSnapshot, isVizualizationFinished }: IProps): JSX.Element => {
    const [currentFieldIndex, setCurrentFieldIndex] = useState<number>(0);
    const { snapshots } = quickSortProcedureSnapshot;
    useEffect(() => {
        if (isVizualizationFinished === true) {
            setCurrentFieldIndex(0);
        }
    }, [isVizualizationFinished])
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
        <>
            <View style={styles.stepButtonsContainer}>
                <StepButton iconName="ios-chevron-back-outline" onPress={decrementIndex} />
                <StepButton iconName="chevron-forward-sharp" onPress={incrementIndex} />
            </View>
            <View style={styles.mainContainer}>
                {snapshots.length > 0 && <Snapshots currentFieldIndex={currentFieldIndex} quickSortProcedureSnapshots={quickSortProcedureSnapshot} />}
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        height: 300,
    },
    stepButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5
    }
})
export default React.memo(ManualQSSnapshots, (prevProps, currentProps) => {
    return prevProps.isVizualizationFinished === currentProps.isVizualizationFinished;
});