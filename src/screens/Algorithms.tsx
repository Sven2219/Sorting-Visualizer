import React, { useReducer } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Actions, IState, reducer } from '../reducers/algorithms';
import Feather from 'react-native-vector-icons/Feather';
import InputArray from '../components/InputArray';
import StartPauseButton from '../components/StartPauseButton';
import Vizualization from '../components/Vizualization';
import Theory from '../components/Theory';
import { bubbleSort } from '../components/bubble/bubbleSort';
import { BUBBLE_SORT, QUICK_SORT, MERGE_SORT, HEAP_SORT } from '../components/helpers/sortingTypes';
import AlgoMenu from '../components/menu/AlgoMenu';
import { AlgoritmhsDispatch } from '../context/AlgorithmsDispatch';
import { AlgorithmsState } from '../context/AlgorithmsState';
import { quickSort } from '../components/quick/quickSort';
export interface IQuick {
    procedure: number[][];
    pivots: number[];
    indexes: number[];
}
const START_BUTTON_SIZE = 50;

const Algorithms = (): JSX.Element => {
    const [state, dispatch] = useReducer<React.Reducer<IState, Actions>>(reducer, {
        isVizualizationPaused: true, chosenSort: BUBBLE_SORT, isChoseSortModalOpen: false,
        isTheoryModalOpen: false, arrayForSort: "", isVizualizationFinished: true,
        bubbleSortProcedure: { indexes: [], procedure: [] },
        quickSortProcedure: { indexes: [], procedure: [], pivots: [] },
    })

    const transformArrayInput = (): number[] => {
        if (state.arrayForSort !== "") {
            const elements: number[] = state.arrayForSort.split(",").map(Number);//transforming
            return elements;
        }
        return [];
    }
    const bubble = (elements: number[]) => {
        const bubble: { procedure: number[][], indexes: number[] } = bubbleSort(elements);
        console.log(bubble.procedure.length, bubble.indexes.length)
        dispatch({ type: "setBubbleSortProcedure", payload: bubble });
    }
    const quick = (elements: number[]) => {
        const quick: IQuick = { procedure: [], pivots: [], indexes: [] };
        const { procedure, pivots, indexes } = quick;
        const high: number = elements.length - 1;
        procedure.push([...elements]);
        indexes.push(0);
        pivots.push(elements[high]);
        quickSort(elements, 0, high, quick);
        procedure.push([...elements]);
        procedure.push([...elements]);
        console.log(procedure.length, pivots.length, indexes.length, ":", procedure, indexes, pivots)
        dispatch({ type: "setQuickSortProcedure", payload: quick })
    }
    const callSortingAlgorithm = (): void => {
        const elements: number[] = transformArrayInput();
        if (elements.length > 0) {
            switch (state.chosenSort) {
                case BUBBLE_SORT:
                    bubble(elements);
                    break;
                case QUICK_SORT:
                    quick(elements);

                    break;
                default:
                    break;
            }
        }
    }
    const showMenuIcon = () => {
        if (state.isVizualizationFinished) {
            return (
                <Ionicons name="menu" size={35} color="#000" onPress={() => dispatch({ type: "setIsChoseSortModalOpen", payload: true })} />
            )
        }
        return <Ionicons name="menu" size={35} color="#d3d3d3" />
    }
    const showButton = (): JSX.Element => {
        if (state.isVizualizationPaused) {
            return <StartPauseButton onPress={callSortingAlgorithm} iconName={"caret-forward"} />
        }
        return <StartPauseButton onPress={() => dispatch({ type: "setIsPaused", isVizualizationPaused: true })} iconName={"pause"} />
    }
    const chooseProcedure = () => {
        switch (state.chosenSort) {
            case BUBBLE_SORT:
                return state.bubbleSortProcedure;
            case QUICK_SORT:
                return state.quickSortProcedure;
            default:
                return state.bubbleSortProcedure;
        }
    }
    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                {showMenuIcon()}
                <Text style={styles.headerText}>{state.chosenSort}</Text>
                <Feather name="book" size={35} color="#000" onPress={() => dispatch({ type: "setIsTheoryModalOpen", payload: true })} />
            </View>
            <InputArray arrayForSort={state.arrayForSort}
                onPress={(arrayForSort: string) => dispatch({ type: "setArrayForSort", payload: arrayForSort })}
                editable={state.isVizualizationFinished}
            />
            <View style={styles.startButtonPosition}>
                <View style={[styles.startButtonContainer, styles.shadow, { backgroundColor: state.isVizualizationPaused ? "rgba(34,139,34,0.8)" : "rgba(178,34,34,0.8)" }]}>
                    {showButton()}
                </View>
            </View>

            <Vizualization procedureOfSorting={chooseProcedure()} isVizualizationPaused={state.isVizualizationPaused}
                vizualizationFinished={() => dispatch({ type: "setIsPaused", isVizualizationPaused: true, isVizualizationFinished: true })}
                chosenSort={state.chosenSort}
            />
            {state.isChoseSortModalOpen &&
                <AlgoritmhsDispatch.Provider value={{ dispatch }}>
                    <AlgorithmsState.Provider value={{ state }}>
                        <AlgoMenu onPress={() => dispatch({ type: "setIsChoseSortModalOpen", payload: false })} />
                    </AlgorithmsState.Provider>
                </AlgoritmhsDispatch.Provider>
            }
            {state.isTheoryModalOpen &&
                <AlgorithmsState.Provider value={{ state }}>
                    <Theory onPress={() => dispatch({ type: "setIsTheoryModalOpen", payload: false })} />
                </AlgorithmsState.Provider>
            }
        </ScrollView>
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
    startButtonPosition: {
        alignItems: 'flex-end',
        right: START_BUTTON_SIZE / 2 - 5,
        top: START_BUTTON_SIZE / 2,
        zIndex: 2
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
    startButtonContainer: {
        width: START_BUTTON_SIZE,
        height: START_BUTTON_SIZE,
        borderRadius: START_BUTTON_SIZE / 2,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default Algorithms;