import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { getBubbleBg, getQuickBg } from '../helpers/chartsBackgroundColor';
import { CHARTS_HEIGHT, CHART_MAX_HEIGHT, CHART_MIN_HEIGHT } from '../Constants';
import { scaleBetween } from '../helpers/scalingCharts';
import { IPivot } from '../quick/quickSort';
import { BUBBLE_SORT, QUICK_SORT } from '../helpers/types';
interface IProps {
    procedureOfSorting: {
        procedure: number[][];
        indexes: number[];
        pivots?: IPivot
    }
    currentFieldIndex: number;
    currentField: number[];
    maxRange: number;
    minRange: number;
    chosenSort: string;
}
const Charts = ({ procedureOfSorting: { indexes, procedure, pivots},
    currentFieldIndex, currentField, maxRange, minRange, chosenSort }: IProps): JSX.Element => {
    const getScaledHeight = (element: number): number => {
        if (minRange !== maxRange && procedure[currentFieldIndex].length > 1) {
            return scaleBetween(element, CHART_MIN_HEIGHT, CHART_MAX_HEIGHT, minRange, maxRange);
        }
        return CHART_MIN_HEIGHT;
    }
    const getBackgroundColor = (element: number, index: number) => {
        switch (chosenSort) {
            case BUBBLE_SORT:
                return getBubbleBg(element, index, currentFieldIndex, procedure, indexes);
            case QUICK_SORT:
                return getQuickBg(element, index, currentFieldIndex, procedure, indexes, pivots);
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
    chartsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginTop: 0,
        height: CHARTS_HEIGHT,
        backgroundColor: '#fff'
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
export default Charts;