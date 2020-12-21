import React, { useReducer } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Actions, IState, reducer } from '../reducers/algorithms';
import Feather from 'react-native-vector-icons/Feather';
import InputArray from '../components/InputArray';
import Theory from '../components/Theory';
import { BUBBLE_SORT, CHARTS, MANUAL, SNAPSHOTS, TIMING } from '../components/helpers/types';
import Menu from '../components/menu/Menu';
import { AlgorithmsDispatch } from '../context/AlgorithmsDispatch';
import { AlgorithmsState } from '../context/AlgorithmsState';
import Vizualization from '../components/visualization/Visualization';
import VizualizationManagment from '../components/visualization/managment/VisualizationManagment';
import SnapshotSettings from '../components/SnapshotSettings';
const ICON_SIZE = 50;

const Algorithms = (): JSX.Element => {
    const [state, dispatch] = useReducer<React.Reducer<IState, Actions>>(reducer, {
        isVisualizationPaused: true, sortingAlgorithm: BUBBLE_SORT, isMenuModalOpen: false,
        isTheoryModalOpen: false, arrayForSort: "", isVisualizationFinished: true,
        bubbleSortProcedure: { indexes: [], procedure: [] },
        visualizationMethod: CHARTS,
        snapshotDisplayMethod: MANUAL,
        quickSortProcedureCharts: { indexes: [], procedure: [], pivotIndexes: [] },
        quickSortSnapshotsProcedure: { snapshots: [], pivotIndexes: [], snapshotPosition: { levels: [], startIndexes: [] } }
    })

    const getMenuIcon = (): JSX.Element => {
        if (state.isVisualizationFinished) {
            return (
                <Ionicons name="menu" size={35}
                    color="#000"
                    onPress={() => dispatch({ type: "setIsMenuModalOpen", payload: true })} />
            )
        }
        return <Ionicons name="menu"
            size={35}
            color="#d3d3d3" />
    }

    return (
        <View style={styles.mainContainer}>
            <ScrollView >
                <View style={styles.headerContainer}>
                    {getMenuIcon()}
                    <Text style={styles.headerText}>{state.sortingAlgorithm}</Text>
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
                    state.isMenuModalOpen &&
                    <AlgorithmsDispatch.Provider value={{ dispatch }}>
                        <AlgorithmsState.Provider value={{ state }}>
                            <Menu />
                        </AlgorithmsState.Provider>
                    </AlgorithmsDispatch.Provider>
                }
                {
                    state.isTheoryModalOpen &&
                    <Theory onPress={() => dispatch({ type: "setIsTheoryModalOpen", payload: false })}
                        chosenSort={state.sortingAlgorithm}
                    />
                }
            </ScrollView >
            {(state.visualizationMethod === SNAPSHOTS && state.isVisualizationFinished) &&
                <SnapshotSettings manualMethod={() => dispatch({ type: "setSnapshotDisplayMethod", payload: MANUAL })}
                    snapshotVisualizationMethod={state.snapshotDisplayMethod}
                    timingMethod={() => dispatch({ type: "setSnapshotDisplayMethod", payload: TIMING })}
                />}

        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor:'#fff'
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
        width: ICON_SIZE,
        height: ICON_SIZE,
        borderRadius: ICON_SIZE / 2,
        right: ICON_SIZE / 2 - 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonPosition: {
        alignItems: 'flex-end',
        top: ICON_SIZE / 2,
        zIndex: 2,
        justifyContent: 'space-between'
    },

})
export default Algorithms;