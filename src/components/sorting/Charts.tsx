import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { CHARTS_HEIGHT, CHART_MAX_HEIGHT, CHART_MIN_HEIGHT } from './bubble/Constants';
import { scaleBetween } from './scalingHelper';
interface IProps {
    procedureOfSorting: {
        procedure: number[][];
        indexes: number[]
    }
    currentFieldIndex: number;
    currentField: number[];
    maxRange: number;
    minRange: number;
}
const Charts = ({ procedureOfSorting: { indexes, procedure },
    currentFieldIndex, currentField, maxRange, minRange }: IProps): JSX.Element => {

    const getScaledHeight = (element: number): number => {
        if (minRange !== maxRange && procedure[currentFieldIndex].length > 1) {
            return scaleBetween(element, CHART_MIN_HEIGHT, CHART_MAX_HEIGHT, minRange, maxRange);
        }
        return CHART_MIN_HEIGHT;
    }
    const getBackgroundColor = (element: number, index: number): string => {
        if (currentFieldIndex < 1) {//start
            return "#228b22";//green
        }
        else if (currentFieldIndex + 1 === procedure.length) {//end
            return "#228b22"//green
        }
        else if (element != procedure[currentFieldIndex - 1][index]) {
            return "#b22222";//red
        }
        else if (index == indexes[currentFieldIndex]) {
            return "#483d8b";//blue
        }
        else {
            return "#228b22"//green
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