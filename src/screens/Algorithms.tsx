import React, { useReducer } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Actions, IState, reducer } from '../reducers/algorithms';
import Feather from 'react-native-vector-icons/Feather';
import InputArray from '../components/InputArray';

import Theory from '../components/Theory';
import { BUBBLE_SORT, CHARTS, TIMING } from '../components/helpers/types';
import AlgoMenu from '../components/menu/AlgoMenu';
import { AlgorithmsDispatch } from '../context/AlgorithmsDispatch';
import { AlgorithmsState } from '../context/AlgorithmsState';
import Vizualization from '../components/vizualization/Vizualization';


import VizualizationManagment from '../components/VizualizationManagment';


const Algorithms = (): JSX.Element => {
    const [state, dispatch] = useReducer<React.Reducer<IState, Actions>>(reducer, {
        isVisualizationPaused: true, chosenSort: BUBBLE_SORT, isChoseSortModalOpen: false,
        isTheoryModalOpen: false, arrayForSort: "", isVisualizationFinished: true,
        bubbleSortProcedure: { indexes: [], procedure: [] },
        visualizationMethod: CHARTS,
        vizualizationManagmentMethod: TIMING,
        quickSortProcedureCharts: { indexes: [], procedure: [], pivotIndex: [] },
        quickSortProcedureSnapshots: { snapshots: [], pivotIndexes: [], snapshotPosition: { levels: [], start: [] } }
    })

    const getMenuIcon = (): JSX.Element => {
        if (state.isVisualizationFinished) {
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
                editable={state.isVisualizationFinished}
            />
            <AlgorithmsDispatch.Provider value={{ dispatch }}>
                <AlgorithmsState.Provider value={{ state }}>
                    <VizualizationManagment />
                </AlgorithmsState.Provider>
            </AlgorithmsDispatch.Provider>
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