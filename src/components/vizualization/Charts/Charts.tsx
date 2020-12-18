import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { getBubbleBg, getQuickBg } from '../../helpers/chartsBackgroundColor';
import { CHART_MAX_HEIGHT, CHART_MIN_HEIGHT } from '../../Constants';
import { scaleBetween } from '../../helpers/scalingCharts';
import { BUBBLE_SORT, QUICK_SORT } from '../../helpers/types';
import { AlgorithmsState } from '../../../context/AlgorithmsState';
interface IProps {
    currentFieldIndex: number;
    currentField: number[];
    maxRange: number;
    minRange: number;
    procedure: number[][];
}
const Charts = ({ currentFieldIndex, currentField, maxRange, minRange, procedure }: IProps): JSX.Element => {
    const { state } = useContext(AlgorithmsState);
    const getScaledHeight = (element: number): number => {
        if (minRange !== maxRange && procedure[currentFieldIndex].length > 1) {
            return scaleBetween(element, CHART_MIN_HEIGHT, CHART_MAX_HEIGHT, minRange, maxRange);
        }
        return CHART_MIN_HEIGHT;
    }
    const getBackgroundColor = (element: number, index: number):string => {
        switch (state.chosenSort) {
            case BUBBLE_SORT:
                return getBubbleBg(element, index, currentFieldIndex, state.bubbleSortProcedure);
            case QUICK_SORT:
                return getQuickBg(element, index, currentFieldIndex, state.quickSortProcedureCharts);
            default:
                return "#000";
        }
    }
    return (
        <View style={styles.mainContainer}>
            { procedure.length > 0 && currentField?.map((element, index) => {
                return (
                    <View key={index}>
                        <View style={[styles.oneChartContainer,
                        {
                            height: getScaledHeight(element),
                            backgroundColor: getBackgroundColor(element, index)
                        }]}
                        />
                        <Text style={styles.chartLabelText}>{element}</Text>
                    </View>
                )
            })}
        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    oneChartContainer: {
        width: 20,
        marginLeft: 2.5,
        marginRight: 5,
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: 'green'
    },
    chartLabelText: {
        fontSize: 14,
        fontFamily: 'Sura-Bold',
        marginTop: 5,
        alignSelf: 'center'
    },
})
export default React.memo(Charts, (prevProps, currentProps) => {
    return prevProps.currentField == currentProps.currentField;
});