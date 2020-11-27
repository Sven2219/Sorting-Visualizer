import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CHARTS_HEIGHT, CHART_MAX_HEIGHT, CHART_MIN_HEIGHT } from './Constants';
import { scaleBetween } from './scalingHelper';
interface IProps {
    procedureOfSorting: {
        procedure: number[][];
        indexes: number[];
    };
}

const Charts = ({ procedureOfSorting }: IProps) => {
    const [partOfProcedure, setPartOfProcedure] = useState<{ index: number, oneElement: number[] }>({ index: 0, oneElement: [] });

    const prevData = useRef(partOfProcedure.oneElement);//previouse state
    //for scaling height
    const maxRange = useRef(10);
    const minRange = useRef(0);
    const isEqual = useRef(true);


    useEffect(() => {
        maxRange.current = Math.max.apply(Math, procedureOfSorting.procedure[0]);
        minRange.current = Math.min.apply(Math, procedureOfSorting.procedure[0])
        showProcedure();

    }, [procedureOfSorting])

    useEffect(() => {
        prevData.current = partOfProcedure.oneElement;
    }, [partOfProcedure])


    const showProcedure = () => {
        return (procedureOfSorting.procedure.map((oneElement, index) => {
            setTimeout(() => {
                setPartOfProcedure({ oneElement, index });
            }, 1000 * (index))
        }))
    }
    const checkBackgroundColor = (element: number, index: number): string => {
        if (partOfProcedure.index < 1) {//start
            return "#228b22";//green
        }
        if (partOfProcedure.index + 1 === procedureOfSorting.procedure.length) {//end
            prevData.current = [];
            isEqual.current = false;
            setPartOfProcedure({ index: 0, oneElement: partOfProcedure.oneElement });
            return "#228b22"//green
        }
        else if (element !== prevData.current[index] && prevData.current.length > 0) {
            return "#b22222";//red
        }
        else if (index == procedureOfSorting.indexes[partOfProcedure.index]) {
            return "#483d8b";//blue
        }
        else {
            return "#228b22"//green
        }
    }
    const scalingHeight = (element: number): number => {
        if (partOfProcedure.index === 0 && partOfProcedure.oneElement.length > 0) {
            isEqual.current = partOfProcedure.oneElement.every((val, i, arr) => val === arr[0]);
        }
        if (!isEqual.current) {
            if (partOfProcedure.oneElement.length > 1) {
                const val = scaleBetween(element, CHART_MIN_HEIGHT, CHART_MAX_HEIGHT, minRange.current, maxRange.current);
                return val;
            }
            return CHART_MAX_HEIGHT;
        }
        return CHART_MIN_HEIGHT;
    }
    if (procedureOfSorting.procedure.length > 0) {
        return (
            <View>
                <View style={[styles.chartsContainer, styles.shadow]}>
                    {partOfProcedure.oneElement?.map((element, index) => {
                        return (
                            <View key={index}>
                                <View style={[styles.oneChartContainer, { height: scalingHeight(element), backgroundColor: checkBackgroundColor(element, index) }]} />
                                <Text style={styles.chartLabelText}>{element}</Text>
                            </View>
                        )
                    })}
                </View>
                <View>
                    <Text>Procedure</Text>
                </View>
            </View>
        )
    }
    return null;
}

const styles = StyleSheet.create({
    chartsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginTop: 25,
        height: CHARTS_HEIGHT,
        backgroundColor: '#fff'
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 3,
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
    }
})

export default React.memo(Charts, (prevState, currentState) => {

    return prevState.procedureOfSorting == currentState.procedureOfSorting;
});