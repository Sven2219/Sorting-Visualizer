import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { getScaledHeight } from '../../helpers/scalingCharts';

interface IProps {
    currentFieldIndex: number;
    currentField: number[];
    maxElement: number;
    minElement: number;
    procedure: number[][];
    backgroundColor: (element: number, index: number) => string

}
const Charts = ({ currentFieldIndex, currentField, maxElement, minElement, procedure, backgroundColor }: IProps): JSX.Element => {

    return (
        <View style={styles.mainContainer}>
            { procedure.length > 0 && currentField?.map((element, index) => {
                return (
                    <View key={index}>
                        <View style={[styles.oneChartContainer,
                        {
                            height: getScaledHeight(element, minElement, maxElement, procedure[currentFieldIndex].length),
                            backgroundColor: backgroundColor(element, index)
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