import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { AlgorithmsDispatch } from '../../../context/AlgorithmsDispatch';
import { AlgorithmsState } from '../../../context/AlgorithmsState';
import { OrientationState } from '../../../context/OrientationState';
import { bubbleSort } from '../../algorithms/bubbleSort';
import { quickSortCharts } from '../../algorithms/quickSortCharts';
import { quickSortSnapshots } from '../../algorithms/quickSortSnapshots';
import { IBubble, IQuickSnapshots, IQuickCharts, IMergeSnapshots, IMerge } from '../../helpers/interfaces';
import { transformToObject, transfromTextToArray } from '../../helpers/transformInputedArray';
import { mergeSortSnapshots } from '../../algorithms/mergeSort';
import { BUBBLE_SORT, CHARTS, MANUAL, MERGE_SORT, SNAPSHOTS } from '../../helpers/types';
import ManualButton from './ManualButton';
import StartPauseButton from './TimedButton';
import { START_BUTTON_SIZE } from '../../helpers/Constants';


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
    const mergeSortSnapshotProcedure = (elements: IMerge[]): void => {
        const merge: IMergeSnapshots = mergeSortSnapshots(elements, state.snapshotDisplayMethod);
        dispatch({ type: "setMergeSortSnapshotsProcedure", payload: merge });
    }
    const callSortingAlgorithm = (): void => {
        if (state.sortingAlgorithm !== MERGE_SORT) {
            const elements: number[] = transfromTextToArray(state.arrayForSort, orientation, state.visualizationMethod);
            if (state.sortingAlgorithm === BUBBLE_SORT) {
                bubbleSortCharts(elements);
            }
            else {
                if (state.visualizationMethod === CHARTS) {
                    quickSortChartsProcedure(elements);
                }
                else {

                    quickSortSnapshotProcedure(elements);
                }
            }
        }
        else {
            const transformedElements: IMerge[] = transformToObject(state.arrayForSort);
            if (transformedElements.length > 0) {
                if (state.visualizationMethod === CHARTS) {
                }
                else {
                    mergeSortSnapshotProcedure(transformedElements)
                }
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
        return (<View style={[styles.buttonPosition, { marginBottom: state.visualizationMethod === CHARTS ? 0 : 30 }]}>
            <View style={[styles.buttonContainer, state.visualizationMethod === CHARTS ? styles.shadow : styles.smallerShadow,
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
        top: START_BUTTON_SIZE / 2 - 10,
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
        width: START_BUTTON_SIZE,
        height: START_BUTTON_SIZE,
        borderRadius: START_BUTTON_SIZE / 2,
        right: START_BUTTON_SIZE / 2 - 5,
        alignItems: 'center',
        justifyContent: 'center',
    },

})
export default VisualizationManagment;