import React, { useReducer } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Actions, IState, reducer } from '../reducers/algorithms';
import Feather from 'react-native-vector-icons/Feather';
import InputArray from '../components/InputArray';
import StartPauseButton from '../components/StartPauseButton';
import Vizualization from '../components/Vizualization';
import Theory from '../components/bubble/Theory';
import { bubbleSort } from '../components/bubble/bubbleSort';
import {BUBLE_SORT,QUICK_SORT,MERGE_SORT,HEAP_SORT} from '../components/sortingTypes'


const START_BUTTON_SIZE = 50;

const Algorithms = (): JSX.Element => {
    const [state, dispatch] = useReducer<React.Reducer<IState, Actions>>(reducer, {
        isVizualizationPaused: true, chosenSort: BUBLE_SORT, isChoseSortModalOpen: false,
        isTheoryModalOpen: false, arrayForSort: "", isVizualizationFinished: true,
        bubbleSortProcedure: { indexes: [], procedure: [] },
        quickSortProcedure: { indexes: [], procedure: [], pivot: [] },
    })

    const transformArrayInput = (): number[] => {
        if (state.arrayForSort !== "") {
            const elements: number[] = state.arrayForSort.split(",").map(Number);//transforming
            return elements;
        }
        return [];
    }
    const callSortingAlgorithm = () => {
        const elements = transformArrayInput();
        if (elements.length > 0) {
            switch (state.chosenSort) {
                case BUBLE_SORT:
                    const payload = bubbleSort(elements);
                    dispatch({ type: "setBubbleSortProcedure", payload: payload });
                case QUICK_SORT:
                    return
                case MERGE_SORT:
                    return;
                case HEAP_SORT:
                    return;
                default:
                    return;
            }
        }
    }

    const showButton = (): JSX.Element => {
        if (state.isVizualizationPaused) {
            return <StartPauseButton onPress={callSortingAlgorithm} iconName={"caret-forward"} />
        }
        return <StartPauseButton onPress={() => dispatch({ type: "setIsPaused", isVizualizationPaused: true })} iconName={"pause"} />
    }
    const chooseProcedure = () => {
        switch (state.chosenSort) {
            case BUBLE_SORT:
                return state.bubbleSortProcedure;
            default:
                return state.bubbleSortProcedure
        }
    }
    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <Ionicons name="menu" size={35} color="#000" onPress={() => dispatch({ type: "setIsChoseSortModalOpen", payload: true })} />
                <Text style={styles.headerText}>Bubble Sort</Text>
                <Feather name="book" size={35} color="#000" onPress={() => dispatch({ type: "setIsTheoryModalOpen", payload: true })} />
            </View>
            <InputArray arrayForSort={state.arrayForSort}
                onPress={(arrayForSort: string) => dispatch({ type: "setArrayForSort", payload: arrayForSort })}
                editable={state.isVizualizationFinished}
            />
            <View style={styles.startButtonPosition}>
                <View style={[styles.startButtonContainer, styles.shadow, { backgroundColor: state.isVizualizationPaused ? "#228b22" : "#b22222" }]}>
                    {showButton()}
                </View>
            </View>

            <Vizualization procedureOfSorting={chooseProcedure()} isVizualizationPaused={state.isVizualizationPaused}
                vizualizationFinished={() => dispatch({ type: "setIsPaused", isVizualizationPaused: true, isVizualizationFinished: true })}
            />

            {state.isTheoryModalOpen && <Theory onPress={() => dispatch({ type: "setIsTheoryModalOpen", payload: false })} />}
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