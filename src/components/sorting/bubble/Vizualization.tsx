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
    const [procedure, setProcedure] = useState<number[][]>([]);
    const currentIndex = useRef(0);
    const prevData = useRef<number[]>(procedureOfSorting.procedure[0]);//previous state
    //for scaling height
    const maxRange = useRef(10);
    const minRange = useRef(0);
    const swapedValue = useRef<number[][]>([]);
    const isEqual = useRef(true);

    useEffect(() => {
        swapedValue.current = [];
        maxRange.current = Math.max.apply(Math, procedureOfSorting.procedure[0]);
        minRange.current = Math.min.apply(Math, procedureOfSorting.procedure[0])
        showProcedure();
    }, [procedureOfSorting])

    useEffect(() => {
        setSwapedValue();
        prevData.current = procedure[currentIndex.current];
    }, [procedure])


    const showProcedure = () => {
        return (procedureOfSorting.procedure.map((element, index) => {
            setTimeout(() => {
                currentIndex.current = index
                setProcedure((prevState) => (
                    [...prevState, element]
                ))
            }, 1000 * (index))
        }))
    }
    const checkBackgroundColor = (element: number, index: number): string => {
        if (currentIndex.current < 1) {//start
            return "#228b22";//green
        }
        if (currentIndex.current + 1 === procedureOfSorting.procedure.length) {//end
            prevData.current = [];
            isEqual.current = false;
            currentIndex.current = 0;
            return "#228b22"//green
        }
        else if (element !== prevData.current[index]) {
            return "#b22222";//red
        }
        else if (index == procedureOfSorting.indexes[currentIndex.current]) {
            return "#483d8b";//blue
        }
        else {
            return "#228b22"//green
        }
    }
    const scalingHeight = (element: number): number => {
        if (currentIndex.current === 0 && procedure[currentIndex.current].length > 0) {
            isEqual.current = procedure[0].every((val, i, arr) => val === arr[0]);
        }
        if (!isEqual.current) {
            if (procedure[currentIndex.current].length > 1) {
                const val = scaleBetween(element, CHART_MIN_HEIGHT, CHART_MAX_HEIGHT, minRange.current, maxRange.current);
                return val;
            }
            return CHART_MAX_HEIGHT;
        }
        return CHART_MIN_HEIGHT;
    }
    const setSwapedValue = () => {
        let swaped: number[] = [];
        if (procedure.length > 0 && Array.isArray(prevData.current)) {
            for (let i = 0; i < procedure[currentIndex.current].length; i++) {
                if (procedure[currentIndex.current][i] != prevData.current[i]) {
                    swaped.push(prevData.current[i])
                }
            }
            if (swaped.length === 2) {
                swapedValue.current = [...swapedValue.current, swaped];
            }
        }
    }
    return (
        <View style={{ zIndex: 1 }}>
            <View style={[styles.chartsContainer, styles.shadow]}>
                {procedureOfSorting.procedure.length > 0 && procedure[currentIndex.current]?.map((element, index) => {
                    return (
                        <View key={index}>
                            <View style={[styles.oneChartContainer, { height: scalingHeight(element), backgroundColor: checkBackgroundColor(element, index) }]} />
                            <Text style={styles.chartLabelText}>{element}</Text>
                        </View>
                    )
                })}
            </View>
            <View style={styles.procedureContainer}>
                <Text style={styles.originalArrayText}>Original array: [{procedure.length > 0 && procedure[0].join(", ")}]</Text>
                {swapedValue.current.length > 0 && swapedValue.current.map((element, index) => {
                    return (
                        <Text key={index} style={styles.swapingText}>
                            {`Swaping ${element.join(" and ")}`}
                        </Text>
                    )
                })}
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    chartsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginTop: 0,
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
    },
    procedureContainer: {
        margin: 10
    },
    originalArrayText: {
        fontFamily: 'Sura-Regular',
        fontSize: 18,
        letterSpacing: 2
    },
    swapingText: {
        fontSize: 17,
        fontFamily: 'Sura-Regular',
        marginTop: 5
    }
})

export default React.memo(Charts, (prevState, currentState) => {

    return prevState.procedureOfSorting == currentState.procedureOfSorting;
});