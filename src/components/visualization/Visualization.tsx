import React, { useContext } from 'react';
import { AlgorithmsDispatch } from '../../context/AlgorithmsDispatch';
import { AlgorithmsState } from '../../context/AlgorithmsState';
import { BUBBLE_SORT, CHARTS, MANUAL, QUICK_SORT, SNAPSHOTS, TIMING } from '../helpers/types';
import BubbleChartsMethod from './charts/bubbleSort/BubbleSortCharts';
import QuickChartsMethod from './charts/quickSort/QuickSortCharts';
import ManualMSSnapshots from './snapshots/mergeSort/manual/ManualMSSnapshots';
import TimedMSSnapshots from './snapshots/mergeSort/timed/TimedMSSnapshots';
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
                        isMenuModalOpen={state.isMenuModalOpen}
                        isVisualizationPaused={state.isVisualizationPaused}
                        visualizationFinished={() => dispatch({ type: "setIsPaused", isVisualizationPaused: true, isVisualizationFinished: true })} />
                }
                else if (state.sortingAlgorithm === QUICK_SORT) {
                    return <QuickChartsMethod quickSortProcedure={state.quickSortProcedureCharts}
                        isMenuModalOpen={state.isMenuModalOpen}
                        isVisualizationPaused={state.isVisualizationPaused}
                        visualizationFinished={() => dispatch({ type: "setIsPaused", isVisualizationPaused: true, isVisualizationFinished: true })} />
                }
            case SNAPSHOTS:
                if (state.sortingAlgorithm === QUICK_SORT) {
                    if (state.snapshotDisplayMethod === MANUAL) {
                        return <ManualQSSnapshots
                            snapshotDisplayMethod={state.snapshotDisplayMethod}
                            quickSortSnapshotsProcedure={state.quickSortSnapshotsProcedure}
                            isVisualizationFinished={state.isVisualizationFinished} />
                    }
                    else {
                        return <TimedQSSnapshots
                            snapshotDisplayMethod={state.snapshotDisplayMethod}
                            isVisualizationPaused={state.isVisualizationPaused}
                            quickSortSnapshotsProcedure={state.quickSortSnapshotsProcedure}
                            visualizationFinished={() => dispatch({ type: "setIsPaused", isVisualizationPaused: true, isVisualizationFinished: true })} />
                    }
                }
                else {
                    if (state.snapshotDisplayMethod === MANUAL) {
                        return <ManualMSSnapshots mergeSortSnapshotsProcedure={state.mergeSortSnapshotsProcedure}
                            isVisualizationFinished={state.isVisualizationFinished}
                            snapshotDisplayMethod={state.snapshotDisplayMethod}
                        />
                    }
                    else {
                        return <TimedMSSnapshots />
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