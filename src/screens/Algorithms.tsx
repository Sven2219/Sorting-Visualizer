import React, { useContext, useReducer } from 'react';
import { View, Text, StyleSheet, ScrollView, ToastAndroid } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Actions, IState, reducer } from '../reducers/algorithms';
import Feather from 'react-native-vector-icons/Feather';
import InputArray from '../components/InputArray';
import StartPauseButton from '../components/StartPauseButton';
import Vizualization from '../components/Vizualization';
import Theory from '../components/Theory';
import { bubbleSort, IBubble } from '../components/bubble/bubbleSort';
import { BUBBLE_SORT, QUICK_SORT, MERGE_SORT, HEAP_SORT } from '../components/helpers/sortingTypes';
import AlgoMenu from '../components/menu/AlgoMenu';
import { AlgorithmsDispatch } from '../context/AlgorithmsDispatch';
import { AlgorithmsState } from '../context/AlgorithmsState';
import { quickSort, IQuick } from '../components/quick/quickSort';
import { OrientationState } from '../context/OrientationState';

const BUTTON_SIZE = 50;

const Algorithms = (): JSX.Element => {
    const { orientation } = useContext(OrientationState);
    const [state, dispatch] = useReducer<React.Reducer<IState, Actions>>(reducer, {
        isVizualizationPaused: true, chosenSort: BUBBLE_SORT, isChoseSortModalOpen: false,
        isTheoryModalOpen: false, arrayForSort: "", isVizualizationFinished: true,
        bubbleSortProcedure: { indexes: [], procedure: [] },
        vizualizationMethod: "Charts",
        quickSortProcedure: { indexes: [], procedure: [], pivots: { pivot: [], pivotIndex: [] } },
    })

    const transformArrayInput = (): number[] => {
        if (state.arrayForSort !== "") {
            const elements: number[] = state.arrayForSort.split(",").map(Number);//transforming
            if (orientation === "PORTRAIT") {
                if (elements.length < 12) {
                    return elements;
                }
                else {
                    ToastAndroid.showWithGravityAndOffset('If you want to sort more than 12 elements change orientation to LANDSCAPE', ToastAndroid.LONG, ToastAndroid.BOTTOM, 0, 100);
                }
            }
            else {
                if (elements.length < 20) {
                    return elements;
                }
                else {
                    ToastAndroid.showWithGravityAndOffset(`You can't sort more than 20 elements`, ToastAndroid.LONG, ToastAndroid.BOTTOM, 0, 100);
                }
            }
        }
        return [];
    }
    const bubble = (elements: number[]) => {
        const bubble: IBubble = bubbleSort(elements);
        dispatch({ type: "setBubbleSortProcedure", payload: bubble });
    }
    const quick = (elements: number[]) => {
        const quick: IQuick = { procedure: [], pivots: { pivot: [], pivotIndex: [] }, indexes: [] };
        const { procedure, pivots, indexes } = quick;
        const { pivot, pivotIndex } = pivots;
        const high: number = elements.length - 1;
        procedure.push([...elements]);
        indexes.push(0);
        pivot.push(elements[high]);
        pivotIndex.push(high);
        quickSort(elements, 0, high, quick);
        procedure.push([...elements]);
        procedure.push([...elements]);
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
                case MERGE_SORT:
                    break;
                case HEAP_SORT:
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
            <View style={styles.buttonPosition}>
                <View style={[styles.buttonContainer, styles.shadow, { backgroundColor: state.isVizualizationPaused ? "rgba(34,139,34,0.8)" : "rgba(178,34,34,0.8)" }]}>
                    {showButton()}
                </View>
            </View>

            <Vizualization procedureOfSorting={chooseProcedure()} isVizualizationPaused={state.isVizualizationPaused}
                vizualizationFinished={() => dispatch({ type: "setIsPaused", isVizualizationPaused: true, isVizualizationFinished: true })}
                chosenSort={state.chosenSort}
            />
            {
                state.isChoseSortModalOpen &&
                <AlgorithmsDispatch.Provider value={{ dispatch }}>
                    <AlgorithmsState.Provider value={{ state }}>
                        <AlgoMenu onPress={() => dispatch({ type: "setIsChoseSortModalOpen", payload: false })} />
                    </AlgorithmsState.Provider>
                </AlgorithmsDispatch.Provider>
            }
            {
                state.isTheoryModalOpen &&
                <AlgorithmsState.Provider value={{ state }}>
                    <Theory onPress={() => dispatch({ type: "setIsTheoryModalOpen", payload: false })} />
                </AlgorithmsState.Provider>
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