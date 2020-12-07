import React, { useContext, useReducer } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Actions, IState, reducer } from '../reducers/algorithms';
import Feather from 'react-native-vector-icons/Feather';
import InputArray from '../components/InputArray';
import StartPauseButton from '../components/StartPauseButton';
import Theory from '../components/Theory';
import { bubbleSort } from '../components/bubble/bubbleSort';
import { BUBBLE_SORT, QUICK_SORT, MERGE_SORT, HEAP_SORT, CHARTS } from '../components/helpers/types';
import AlgoMenu from '../components/menu/AlgoMenu';
import { AlgorithmsDispatch } from '../context/AlgorithmsDispatch';
import { AlgorithmsState } from '../context/AlgorithmsState';
import { OrientationState } from '../context/OrientationState';
import Vizualization from '../components/vizualization/Vizualization';
import { transformTextToArray } from '../components/helpers/transformInputedArray';
import { IBubble, IQuickSnapshots } from '../components/helpers/interfaces';
import { quickSortChartProcedure } from '../components/vizualization/Charts/algorithms';
import { quickSortSnapshots } from '../components/quick/quickSort';

const BUTTON_SIZE = 50;

const Algorithms = (): JSX.Element => {
    const { orientation } = useContext(OrientationState);
    const [state, dispatch] = useReducer<React.Reducer<IState, Actions>>(reducer, {
        isVizualizationPaused: true, chosenSort: BUBBLE_SORT, isChoseSortModalOpen: false,
        isTheoryModalOpen: false, arrayForSort: "", isVizualizationFinished: true,
        bubbleSortProcedure: { indexes: [], procedure: [] },
        vizualizationMethod: CHARTS,
        quickSortProcedureCharts: { indexes: [], procedure: [], pivotIndex: [] },
        quickSortProcedureSnapshots: { snapshots: [], pivotIndexes: [], sortedArray: [], directions: [] }
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
    const quickSortSnapshotsProcedure = (elements: number[]): void => {
        const quick: IQuickSnapshots = { snapshots: [], pivotIndexes: [], directions: [], sortedArray: [] }
        quickSortSnapshots(elements, 0, elements.length - 1, "neutral", quick);
        quick.sortedArray = [...elements];
        console.log(quick);
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
    const getButton = (): JSX.Element => {
        if (state.isVizualizationPaused) {
            return <StartPauseButton onPress={callSortingAlgorithm}
                iconName={"caret-forward"} />
        }
        return <StartPauseButton onPress={() => dispatch({ type: "setIsPaused", isVizualizationPaused: true })}
            iconName={"pause"} />
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
            <View style={styles.buttonPosition}>
                <View style={[styles.buttonContainer, styles.shadow,
                { backgroundColor: state.isVizualizationPaused ? "rgba(34,139,34,0.8)" : "rgba(178,34,34,0.8)" }]}>
                    {getButton()}
                </View>
            </View>
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
    buttonPosition: {
        alignItems: 'flex-end',
        top: BUTTON_SIZE / 2,
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
    buttonContainer: {
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        borderRadius: BUTTON_SIZE / 2,
        right: BUTTON_SIZE / 2 - 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
export default Algorithms;