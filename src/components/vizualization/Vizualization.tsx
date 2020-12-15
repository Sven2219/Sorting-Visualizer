import React, { useContext } from 'react';
import { View } from 'react-native';
import { AlgorithmsDispatch } from '../../context/AlgorithmsDispatch';
import { AlgorithmsState } from '../../context/AlgorithmsState';
import { BUBBLE_SORT, CHARTS, HEAP_SORT, MERGE_SORT, QUICK_SORT, SNAPSHOTS, TREE } from '../helpers/types';
import ChartsMethod from './Charts/ChartsMethod';
import QuickSortSnapshot from './Snapshots/QuickSortSnapshot';


const Vizualization = (): JSX.Element => {
    const { state } = useContext(AlgorithmsState);
    const { dispatch } = useContext(AlgorithmsDispatch);
    const chooseChartProcedure = (): number[][] => {
        switch (state.chosenSort) {
            case BUBBLE_SORT:
                return state.bubbleSortProcedure.procedure;
            case QUICK_SORT:
                return state.quickSortProcedureCharts.procedure;
            case MERGE_SORT:
                return []
            case HEAP_SORT:
                return [];
            default:
                return state.bubbleSortProcedure.procedure;
        }
    }
    const getVizualizationMethod = (): JSX.Element | null => {
        switch (state.vizualizationMethod) {
            case CHARTS:
                return <ChartsMethod procedure={chooseChartProcedure()}
                    isVizualizationPaused={state.isVizualizationPaused}
                    vizualizationFinished={() => dispatch({ type: "setIsPaused", isVizualizationPaused: true, isVizualizationFinished: true })} />
            case TREE:
                return null;
            case SNAPSHOTS:
                if (state.chosenSort === QUICK_SORT) {
                    return <QuickSortSnapshot
                        isVizualizationPaused={state.isVizualizationPaused}
                        vizualizationFinished={() => dispatch({ type: "setIsPaused", isVizualizationPaused: true, isVizualizationFinished: true })} />;
                }
            default:
                return null;
        }
    }
    return (
        <View>
            {getVizualizationMethod()}
        </View>
    )
}
export default Vizualization;