import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface IProps {
    procedureOfSorting: {
        procedure: number[][];
        indexes: number[];
    };
}


const Charts = ({procedureOfSorting}:IProps) => {
    return (
        <View style={[styles.chartsContainer, styles.shadow]}>

            {procedureOfSorting.procedure.length > 0 && partOfProcedure.oneElement?.map((element, index) => {
                return (
                    <View key={index}>
                        <View style={[styles.oneChartContainer, { height: scalingHeight(element), backgroundColor: checkBackgroundColor(element, index) }]} />
                        <Text style={styles.chartLabelText}>{element}</Text>
                    </View>
                )
            })}
        </View>
    )
}
const styles = StyleSheet.create({
    
})
export default Charts;