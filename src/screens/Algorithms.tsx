import React, { useContext, useReducer } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Actions, IState, reducer } from '../reducers/algorithms';
import Feather from 'react-native-vector-icons/Feather';
import InputArray from '../components/InputArray';

import Theory from '../components/Theory';
import { bubbleSort } from '../components/bubble/bubbleSort';
import { BUBBLE_SORT, QUICK_SORT, MERGE_SORT, HEAP_SORT, CHARTS, TIMING, MANUAL } from '../components/helpers/types';
import AlgoMenu from '../components/menu/AlgoMenu';
import { AlgorithmsDispatch } from '../context/AlgorithmsDispatch';
import { AlgorithmsState } from '../context/AlgorithmsState';
import { OrientationState } from '../context/OrientationState';
import Vizualization from '../components/vizualization/Vizualization';
import { transformTextToArray } from '../components/helpers/transformInputedArray';
import { IBubble, IQuickSnapshots } from '../components/helpers/interfaces';
import { quickSortChartProcedure } from '../components/vizualization/Charts/algorithms';
import { quickSortSnapshots } from '../components/quick/quickSort';

import VizualizationManagment from '../components/VizualizationManagment';


const Algorithms = (): JSX.Element => {
    const { orientation } = useContext(OrientationState);
    const [state, dispatch] = useReducer<React.Reducer<IState, Actions>>(reducer, {
        isVizualizationPaused: true, chosenSort: BUBBLE_SORT, isChoseSortModalOpen: false,
        isTheoryModalOpen: false, arrayForSort: "", isVizualizationFinished: true,
        bubbleSortProcedure: { indexes: [], procedure: [] },
        vizualizationMethod: CHARTS,
        vizualizationManagmentMethod: TIMING,
        quickSortProcedureCharts: { indexes: [], procedure: [], pivotIndex: [] },
        quickSortProcedureSnapshots: { snapshots: [], pivotIndexes: [], snapshotPosition: { levels: [], start: [] } }
    })


    //Charts
    const bubbleSortCharts = (elements: number[]): void => {
        const bubble: IBubble = bubbleSort(elements);
        dispatch({ type: "setBubbleSortProcedure", payload: bubble });
    }
    const quickSortCharts = (elements: number[]): void => {
        const quick = quickSortChartProcedure(elements)
        dispatch({ type: "setQuickSortProcedureCharts", payload: quick })
    }


    //Snapshots
    const quickSortSnapshotsProcedure = (elements: number[]): void => {
        const quick: IQuickSnapshots = { snapshots: [], pivotIndexes: [], snapshotPosition: { levels: [], start: [] } }
        const level: number = 0;
        quickSortSnapshots(elements, 0, elements.length - 1, quick, level);
        dispatch({ type: "setQuickSortProcedureSnapshots", payload: quick });
    }

    const callSortingAlgorithm = (): void => {
        const elements: number[] = transformTextToArray(state.arrayForSort, orientation);
        if (elements.length > 0) {
            switch (state.chosenSort) {
                case BUBBLE_SORT:
                    bubbleSortCharts(elements);
                    break;
                case QUICK_SORT:
                    if (state.vizualizationMethod === CHARTS) {
                        quickSortCharts(elements);
                        break;
                    }
                    quickSortSnapshotsProcedure(elements);
                    break;
                case MERGE_SORT:
                    break;
                case HEAP_SORT:
                    break;
                default:
                    break;
            }
        }
    }
    const getMenuIcon = (): JSX.Element => {
        if (state.isVizualizationFinished) {
            return (
                <Ionicons name="menu" size={35}
                    color="#000"
                    onPress={() => dispatch({ type: "setIsChoseSortModalOpen", payload: true })} />
            )
        }
        return <Ionicons name="menu"
            size={35}
            color="#d3d3d3" />
    }
    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                {getMenuIcon()}
                <Text style={styles.headerText}>{state.chosenSort}</Text>
                <Feather name="book" size={35} color="#000"
                    onPress={() => dispatch({ type: "setIsTheoryModalOpen", payload: true })} />
            </View>
            <InputArray arrayForSort={state.arrayForSort}
                onPress={(arrayForSort: string) => dispatch({ type: "setArrayForSort", payload: arrayForSort })}
                editable={state.isVizualizationFinished}
            />
            <VizualizationManagment isVizualizationPaused={state.isVizualizationPaused} vizualizationMethod={state.vizualizationMethod} callSortingAlgorithm={callSortingAlgorithm} paused={() => dispatch({ type: "setIsPaused", isVizualizationPaused: true })} />

            <AlgorithmsDispatch.Provider value={{ dispatch }}>
                <AlgorithmsState.Provider value={{ state }}>
                    <Vizualization />
                </AlgorithmsState.Provider>
            </AlgorithmsDispatch.Provider>

            {
                state.isChoseSortModalOpen &&
                <AlgorithmsDispatch.Provider value={{ dispatch }}>
                    <AlgorithmsState.Provider value={{ state }}>
                        <AlgoMenu />
                    </AlgorithmsState.Provider>
                </AlgorithmsDispatch.Provider>
            }
            {
                state.isTheoryModalOpen &&
                <Theory onPress={() => dispatch({ type: "setIsTheoryModalOpen", payload: false })}
                    chosenSort={state.chosenSort}
                />
            }
        </ScrollView >
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 20
    },
    headerText: {
        fontSize: 24,
        fontFamily: 'Sura-Bold',
        letterSpacing: 2
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
    buttonContainer: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        right: 50 / 2 - 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonPosition: {
        alignItems: 'flex-end',
        top: 50 / 2,
        zIndex: 2,
        justifyContent: 'space-between'
    },
})
export default Algorithms;