import React, { useContext } from 'react';
import { View } from 'react-native';
import { AlgorithmsDispatch } from '../../context/AlgorithmsDispatch';
import { AlgorithmsState } from '../../context/AlgorithmsState';
import { BUBBLE_SORT, CHARTS, QUICK_SORT, SNAPSHOTS, TREE } from '../helpers/types';
import ChartsMethod from './ChartsMethod';


const Vizualization = () => {
    const { state } = useContext(AlgorithmsState);
    const { dispatch } = useContext(AlgorithmsDispatch);
    const chooseProcedure = () => {
        switch (state.chosenSort) {
            case BUBBLE_SORT:
                return state.bubbleSortProcedure;
            case QUICK_SORT:
                return state.quickSortProcedure;
            default:
                return state.bubbleSortProcedure;
        }
    }
    const getVizualizationMethod = (): JSX.Element | null => {
        switch (state.vizualizationMethod) {
            case CHARTS:
                return <ChartsMethod procedureOfSorting={chooseProcedure()} isVizualizationPaused={state.isVizualizationPaused}
                    vizualizationFinished={() => dispatch({ type: "setIsPaused", isVizualizationPaused: true, isVizualizationFinished: true })}
                    chosenSort={state.chosenSort} />
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