import React, { useContext } from 'react';
import { View } from 'react-native';
import { AlgorithmsDispatch } from '../../context/AlgorithmsDispatch';
import { AlgorithmsState } from '../../context/AlgorithmsState';
import { BUBBLE_SORT, CHARTS, QUICK_SORT, SNAPSHOTS, TREE } from '../helpers/types';
import ChartsMethod from './Charts/ChartsMethod';


const Vizualization = (): JSX.Element => {
    const { state } = useContext(AlgorithmsState);
    const { dispatch } = useContext(AlgorithmsDispatch);
    const chooseProcedure = (): number[][] => {
        switch (state.chosenSort) {
            case BUBBLE_SORT:
                return state.bubbleSortProcedure.procedure;
            case QUICK_SORT:
                return state.quickSortProcedure.procedure;
            default:
                return state.bubbleSortProcedure.procedure;
        }
    }
    const getVizualizationMethod = (): JSX.Element | null => {
        switch (state.vizualizationMethod) {
            case CHARTS:
                return <ChartsMethod procedure={chooseProcedure()}
                    isVizualizationPaused={state.isVizualizationPaused}
                    vizualizationFinished={() => dispatch({ type: "setIsPaused", isVizualizationPaused: true, isVizualizationFinished: true })} />
            case TREE:
                return null;
            case SNAPSHOTS:
                return null;
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