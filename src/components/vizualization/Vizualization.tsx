import React, { useContext } from 'react';
import { View } from 'react-native';
import { AlgorithmsDispatch } from '../../context/AlgorithmsDispatch';
import { AlgorithmsState } from '../../context/AlgorithmsState';
import { IBubble } from '../helpers/interfaces';
import { BUBBLE_SORT, CHARTS, HEAP_SORT, MERGE_SORT, QUICK_SORT, SNAPSHOTS, TREE } from '../helpers/types';
import BubbleChartsMethod from './Charts/BubbleSort/BubbleChartsMethod';
import QuickSortSnapshot from './Snapshots/QuickSortSnapshot';
interface IProps {
    vizualizationFinished: () => void;
    bubbleSortProcedure: IBubble;
    isVizualizationPaused: boolean;
}

const Vizualization = (): JSX.Element => {
    const { state } = useContext(AlgorithmsState);
    const { dispatch } = useContext(AlgorithmsDispatch);
    const getVizualizationMethod = (): JSX.Element | undefined => {
        switch (state.vizualizationMethod) {
            case CHARTS:
                if (state.chosenSort === BUBBLE_SORT) {
                    return <BubbleChartsMethod bubbleSortProcedure={state.bubbleSortProcedure}
                        isVizualizationPaused={state.isVizualizationPaused}
                        vizualizationFinished={() => dispatch({ type: "setIsPaused", isVizualizationPaused: true, isVizualizationFinished: true })} />
                }
                else if (state.chosenSort === QUICK_SORT) {
                    return;
                }
            case SNAPSHOTS:
                if (state.chosenSort === QUICK_SORT) {
                    return <QuickSortSnapshot />
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