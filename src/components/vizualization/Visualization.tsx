import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AlgorithmsDispatch } from '../../context/AlgorithmsDispatch';
import { AlgorithmsState } from '../../context/AlgorithmsState';
import { BUBBLE_SORT, CHARTS, MANUAL, QUICK_SORT, SNAPSHOTS, TIMING } from '../helpers/types';
import BubbleChartsMethod from './Charts/BubbleSort/BubbleChartsMethod';
import QuickChartsMethod from './Charts/QuickSort/QuickChartsMethod';
import ManualQSSnapshots from './Snapshots/QuickSort/Manual/ManualQSSnapshots';

const Visualization = (): JSX.Element => {
    const { state } = useContext(AlgorithmsState);
    const { dispatch } = useContext(AlgorithmsDispatch);
    const getVizualizationMethod = (): JSX.Element | undefined => {
        switch (state.visualizationMethod) {
            case CHARTS:
                if (state.chosenSort === BUBBLE_SORT) {
                    return <BubbleChartsMethod bubbleSortProcedure={state.bubbleSortProcedure}
                        isVizualizationPaused={state.isVisualizationPaused}
                        vizualizationFinished={() => dispatch({ type: "setIsPaused", isVizualizationPaused: true, isVizualizationFinished: true })} />
                }
                else if (state.chosenSort === QUICK_SORT) {
                    return <QuickChartsMethod quickSortProcedure={state.quickSortProcedureCharts}
                        isVizualizationPaused={state.isVisualizationPaused}
                        vizualizationFinished={() => dispatch({ type: "setIsPaused", isVizualizationPaused: true, isVizualizationFinished: true })} />
                }
            case SNAPSHOTS:
                if (state.chosenSort === QUICK_SORT) {
                    if (state.snapshotVisualizationMethod === MANUAL) {
                        return <ManualQSSnapshots quickSortProcedureSnapshot={state.quickSortProcedureSnapshots}
                            isVizualizationFinished={state.isVisualizationFinished} />
                    }
                    else if (state.snapshotVisualizationMethod === TIMING) {
                        return <View><Text>TIMING METHOD</Text></View>;
                    }
                }
            default:
                break;
        }
    }
    return (
        <>
            {getVizualizationMethod()}
        </>
    )
}

const styles = StyleSheet.create({
    menuContainer: {
        borderWidth: 1,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        height: 20
    }
})

export default Visualization;