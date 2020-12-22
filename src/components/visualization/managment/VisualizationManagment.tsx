import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { AlgorithmsDispatch } from '../../../context/AlgorithmsDispatch';
import { AlgorithmsState } from '../../../context/AlgorithmsState';
import { OrientationState } from '../../../context/OrientationState';
import { bubbleSort } from '../../algorithms/bubbleSort';
import { quickSortCharts } from '../../algorithms/quickSortCharts';
import { quickSortSnapshots } from '../../algorithms/quickSortSnapshots';
import { IBubble, IQuickSnapshots, IQuickCharts, IMergeSnapshots } from '../../helpers/interfaces';
import { transfromTextToArray } from '../../helpers/transformInputedArray';
import { mergeSortSnapshots } from '../../algorithms/mergeSort';
import { BUBBLE_SORT, CHARTS, MANUAL, MERGE_SORT, QUICK_SORT, SNAPSHOTS } from '../../helpers/types';
import ManualButton from './ManualButton';

import StartPauseButton from './TimedButton';



const BUTTON_SIZE = 50;
const VisualizationManagment = (): JSX.Element => {
    const { state } = useContext(AlgorithmsState);
    const { dispatch } = useContext(AlgorithmsDispatch);
    const { orientation } = useContext(OrientationState);

    //Charts
    const bubbleSortCharts = (elements: number[]): void => {
        const bubble: IBubble = bubbleSort(elements);
        dispatch({ type: "setBubbleSortProcedure", payload: bubble });
    }
    const quickSortChartsProcedure = (elements: number[]): void => {
        const quick: IQuickCharts = quickSortCharts(elements);
        dispatch({ type: "setQuickSortProcedureCharts", payload: quick })
    }

    //Snapshots
    const quickSortSnapshotProcedure = (elements: number[]): void => {
        const quick: IQuickSnapshots = quickSortSnapshots(elements, state.snapshotDisplayMethod)
        dispatch({ type: "setQuickSortSnapshotsProcedure", payload: quick });
    }
    const mergeSortSnapshotProcedure = (elements: number[]): void => {
        const merge: IMergeSnapshots = mergeSortSnapshots(elements);
        dispatch({ type: "setMergeSortSnapshotsProcedure", payload: merge });
    }

    const callSortingAlgorithm = (): void => {
        const elements: number[] = transfromTextToArray(state.arrayForSort, orientation, state.visualizationMethod);
        if (elements.length > 0) {
            switch (state.sortingAlgorithm) {
                case BUBBLE_SORT:
                    bubbleSortCharts(elements);
                    break;
                case QUICK_SORT:
                    if (state.visualizationMethod === CHARTS) {
                        quickSortChartsProcedure(elements);
                        break;
                    }
                    quickSortSnapshotProcedure(elements);
                    break;
                case MERGE_SORT:
                    if (state.visualizationMethod === CHARTS) {
                        break;
                    }
                    mergeSortSnapshotProcedure(elements)
                    break;
                default:
                    break;
            }
        }
    }


    const getTimedButton = (): JSX.Element => {
        if (state.isVisualizationPaused) {
            return <StartPauseButton onPress={callSortingAlgorithm}
                iconName={"caret-forward"} />
        }
        return <StartPauseButton onPress={() => dispatch({ type: "setIsPaused", isVisualizationPaused: true })} iconName={"pause"} />
    }

    const getManagmentMethod = (): JSX.Element => {
        if (state.snapshotDisplayMethod === MANUAL && state.visualizationMethod === SNAPSHOTS) {
            if (state.isVisualizationFinished) {
                return (<ManualButton onPress={callSortingAlgorithm} text={"START VISUALISING"} />)
            }
            return (<ManualButton onPress={() => dispatch({ type: "setQuitVisualization" })} text={"QUIT VISUALISING"} />)

        }
        else if (state.visualizationMethod === CHARTS) {
            return (<View style={styles.buttonPosition}>
                <View style={[styles.buttonContainer, styles.shadow,
                { backgroundColor: state.isVisualizationPaused ? "rgba(34,139,34,0.8)" : "rgba(178,34,34,0.8)" }]}>
                    {getTimedButton()}
                </View>
            </View>)

        }
        return (<View style={[styles.buttonPosition, { marginBottom: 30 }]}>
            <View style={[styles.buttonContainer, styles.smallerShadow,
            { backgroundColor: state.isVisualizationPaused ? "rgba(34,139,34,0.8)" : "rgba(178,34,34,0.8)" }]}>
                {getTimedButton()}
            </View>
        </View>)
    }
    return (
        <>
            {getManagmentMethod()}
        </>
    )
}
const styles = StyleSheet.create({
    buttonPosition: {
        alignItems: 'flex-end',
        top: BUTTON_SIZE / 2 - 10,
        zIndex: 2,
        justifyContent: 'space-between'
    },

    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    smallerShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10.00,
        elevation: 20,
    },
    buttonContainer: {
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        borderRadius: BUTTON_SIZE / 2,
        right: BUTTON_SIZE / 2 - 5,
        alignItems: 'center',
        justifyContent: 'center',
    },

})
export default VisualizationManagment;