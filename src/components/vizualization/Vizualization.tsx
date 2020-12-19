import React, { useContext } from 'react';
import { AlgorithmsDispatch } from '../../context/AlgorithmsDispatch';
import { AlgorithmsState } from '../../context/AlgorithmsState';
import { BUBBLE_SORT, CHARTS, QUICK_SORT, SNAPSHOTS } from '../helpers/types';
import BubbleChartsMethod from './Charts/BubbleSort/BubbleChartsMethod';
import QuickChartsMethod from './Charts/QuickSort/QuickChartsMethod';
import ManualQSSnapshots from './Snapshots/QuickSort/ManualQSSnapshots';

const Vizualization = (): JSX.Element => {
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
                    return <ManualQSSnapshots quickSortProcedureSnapshot={state.quickSortProcedureSnapshots} isVizualizationFinished={state.isVisualizationFinished}/>
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
export default Vizualization;