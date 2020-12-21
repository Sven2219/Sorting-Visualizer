import React, { useContext } from 'react';
import { AlgorithmsDispatch } from '../../context/AlgorithmsDispatch';
import { AlgorithmsState } from '../../context/AlgorithmsState';
import { BUBBLE_SORT, CHARTS, MANUAL, QUICK_SORT, SNAPSHOTS, TIMING } from '../helpers/types';
import BubbleChartsMethod from './charts/bubbleSort/BubbleSortCharts';
import QuickChartsMethod from './charts/quickSort/QuickSortCharts';
import ManualQSSnapshots from './snapshots/quickSort/manual/ManualQSSnapshots';
import TimedQSSnapshots from './snapshots/quickSort/timing/TimedQSSnapshots';

const Visualization = (): JSX.Element => {
    const { state } = useContext(AlgorithmsState);
    const { dispatch } = useContext(AlgorithmsDispatch);
    const getVizualizationMethod = (): JSX.Element | undefined => {
        switch (state.visualizationMethod) {
            case CHARTS:
                if (state.sortingAlgorithm === BUBBLE_SORT) {
                    return <BubbleChartsMethod bubbleSortProcedure={state.bubbleSortProcedure}
                        isVizualizationPaused={state.isVisualizationPaused}
                        vizualizationFinished={() => dispatch({ type: "setIsPaused", isVizualizationPaused: true, isVizualizationFinished: true })} />
                }
                else if (state.sortingAlgorithm === QUICK_SORT) {
                    return <QuickChartsMethod quickSortProcedure={state.quickSortProcedureCharts}
                        isVizualizationPaused={state.isVisualizationPaused}
                        vizualizationFinished={() => dispatch({ type: "setIsPaused", isVizualizationPaused: true, isVizualizationFinished: true })} />
                }
            case SNAPSHOTS:
                if (state.sortingAlgorithm === QUICK_SORT) {
                    if (state.snapshotDisplayMethod === MANUAL) {
                        return <ManualQSSnapshots
                            snapshotDisplayMethod={state.snapshotDisplayMethod}
                            quickSortSnapshotsProcedure={state.quickSortSnapshotsProcedure}
                            isVizualizationFinished={state.isVisualizationFinished} />
                    }
                    else if (state.snapshotDisplayMethod === TIMING) {
                        return <TimedQSSnapshots
                            snapshotDisplayMethod={state.snapshotDisplayMethod}
                            isVizualizationPaused={state.isVisualizationPaused}
                            quickSortSnapshotsProcedure={state.quickSortSnapshotsProcedure}
                            vizualizationFinished={() => dispatch({ type: "setIsPaused", isVizualizationPaused: true, isVizualizationFinished: true })} />
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

export default Visualization;