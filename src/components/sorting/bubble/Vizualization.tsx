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
    const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
    const prevData = useRef<number[]>([]);//previous state

    //for scaling height
    const maxRange = useRef<number>(0);
    const minRange = useRef<number>(0);
    const swapedValue = useRef<number[][]>([]);
    //edge scenario for scaling
    const isWholeArraySame = useRef<boolean>(true);


    useEffect(() => {
        if (procedureOfSorting.procedure.length !== 0) {
            swapedValue.current = [];
            maxRange.current = Math.max.apply(Math, procedureOfSorting.procedure[0]);
            minRange.current = Math.min.apply(Math, procedureOfSorting.procedure[0]);
            showProcedure();
        }
    }, [procedureOfSorting])

    useEffect(() => {
        if (procedureOfSorting.procedure.length !== 0) {
            setSwapedValues();
            prevData.current = procedureOfSorting.procedure[currentFieldIndex];
        }
    }, [currentFieldIndex])


    const showProcedure = () => {
        return (procedureOfSorting.procedure.map((field, index) => {
            setTimeout(() => {
                setCurrentFieldIndex(index);
            }, 1000 * (index))
        }))
    }
    const checkBackgroundColor = (element: number, index: number): string => {
        if (currentFieldIndex < 1) {//start
            return "#228b22";//green
        }
        if (currentFieldIndex + 1 === procedureOfSorting.procedure.length) {//end
            prevData.current = [];
            isWholeArraySame.current = false;
            return "#228b22"//green
        }
        else if (element !== prevData.current[index]) {
            return "#b22222";//red
        }
        else if (index == procedureOfSorting.indexes[currentFieldIndex]) {
            return "#483d8b";//blue
        }
        else {
            return "#228b22"//green
        }
    }
    const scaleHeight = (element: number): number => {
        if (currentFieldIndex === 0 && procedureOfSorting.procedure[currentFieldIndex].length > 0) {
            isWholeArraySame.current = procedureOfSorting.procedure[0].every((val, i, arr) => val === arr[0]);
        }
        if (!isWholeArraySame.current) {
            if (procedureOfSorting.procedure[0].length > 1) {
                return scaleBetween(element, CHART_MIN_HEIGHT, CHART_MAX_HEIGHT, minRange.current, maxRange.current);
            }
            return CHART_MAX_HEIGHT;
        }
        return CHART_MIN_HEIGHT;
    }
    const setSwapedValues = () => {
        let swaped: number[] = [];
        if (Array.isArray(prevData.current)) {
            for (let i = 0; i < procedureOfSorting.procedure[0].length; i++) {
                if (procedureOfSorting.procedure[currentFieldIndex][i] != prevData.current[i]) {
                    swaped.push(prevData.current[i])
                }
            }
            if (swaped.length === 2) {
                swapedValue.current = [...swapedValue.current, swaped];
            }
        }
    }
    return (
        <View style={styles.mainContainer}>
            <View style={[styles.chartsContainer, styles.shadow]}>
                {procedureOfSorting.procedure.length > 0 && procedureOfSorting.procedure[currentFieldIndex]?.map((element, index) => {
                    return (
                        <View key={index}>
                            <View style={[styles.oneChartContainer,
                            {
                                height: scaleHeight(element),
                                backgroundColor: checkBackgroundColor(element, index)
                            }]}
                            />
                            <Text style={styles.chartLabelText}>{element}</Text>
                        </View>
                    )
                })}
            </View>
            <View style={styles.procedureContainer}>
                <Text style={styles.originalArrayText}>
                    Original array: [{procedureOfSorting.procedure.length > 0 && procedureOfSorting.procedure[0].join(", ")}]
                </Text>
                {swapedValue.current.length > 0 && swapedValue.current.map((field, index) => {
                    return (
                        <Text key={index} style={styles.swapingText}>
                            {`Swaping ${field.join(" and ")}`}
                        </Text>
                    )
                })}
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    mainContainer: {
        zIndex: 1
    },
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