import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BubbleDispatch } from '../../../context/BubbleDispatch';
import { BubbleState } from '../../../context/BubbleState';
import { CHARTS_HEIGHT, CHART_MAX_HEIGHT, CHART_MIN_HEIGHT } from './Constants';
import { scaleBetween } from './scalingHelper';

const Vizualization = () => {
    //I used this approach because if I use currentFieldIndex for state it will give me flickering effect
    //The reason for flickering effect is when this component get new procedureOfSorting the index is not able to change on time
    const { state: { isPaused, procedureOfSorting } } = useContext(BubbleState);
    const { dispatch } = useContext(BubbleDispatch);
    const [currentField, setCurrentField] = useState<number[]>([]);
    const currentFieldIndex = useRef<number>(0);
    const prevData = useRef<number[]>([]);//previous state
    //for scaling height
    const maxRange = useRef<number>(10);
    const minRange = useRef<number>(0);
    const swapedValue = useRef<number[][]>([]);
    //edge scenario for scaling
    const isWholeArraySame = useRef<boolean>(true);
    const timers = useRef<NodeJS.Timeout[]>([])
    const [isFinished, setIsFinished] = useState(false);
    useEffect(() => {
        if (isFinished) {
            dispatch({ type: "setIsPaused", isPaused: true, IsFinished: true })
        }
    }, [isFinished])
    const delayToAvoidFlickering = () => {
        return setTimeout(() => {
            setIsFinished(false);
        }, 100)
    }
    useEffect(() => {
        if (currentFieldIndex.current === 0) {
            swapedValue.current = [];
            maxRange.current = Math.max.apply(Math, procedureOfSorting.procedure[0]);
            minRange.current = Math.min.apply(Math, procedureOfSorting.procedure[0]);
            delayToAvoidFlickering();
        }
        timers.current = startProcedure();
        return () => {
            for (let i = 0; i < procedureOfSorting.procedure.length; i++) {
                clearTimeout(timers.current[i])
            }
            clearTimeout(delayToAvoidFlickering());

        }
    }, [procedureOfSorting])
    useEffect(() => {
        if (isPaused) {
            for (let i = 0; i < procedureOfSorting.procedure.length; i++) {
                clearTimeout(timers.current[i])
            }
        }
    }, [isPaused])
    useEffect(() => {
        if (!isPaused) {
            setSwapedValues();
            prevData.current = currentField;
        }
    }, [currentField])

    const startProcedure = () => {
        const start = currentFieldIndex.current > 0 ? currentFieldIndex.current + 1 : currentFieldIndex.current;
        const slicedData = procedureOfSorting.procedure.slice(start, procedureOfSorting.procedure.length);
        return (slicedData.map((field, index) => {
            return setTimeout(() => {
                if (!isPaused) {
                    if (start > 0) {
                        currentFieldIndex.current = currentFieldIndex.current + 1;
                    }
                    else {
                        currentFieldIndex.current = index;
                    }
                    setCurrentField(field)
                }
            }, 800 * (index))
        }))

    }
    const checkBackgroundColor = (element: number, index: number): string => {
        if (currentFieldIndex.current < 1) {//start
            return "#228b22";//green
        }
        if (currentFieldIndex.current + 1 === procedureOfSorting.procedure.length) {//end
            prevData.current = [];
            isWholeArraySame.current = false;
            currentFieldIndex.current = 0;
            setIsFinished(true)
            return "#228b22"//green
        }
        else if (element !== prevData.current[index]) {
            return "#b22222";//red
        }
        else if (index == procedureOfSorting.indexes[currentFieldIndex.current]) {
            return "#483d8b";//blue
        }
        else {
            return "#228b22"//green
        }
    }
    const scaleHeight = (element: number): number => {
        if (currentFieldIndex.current === 0 && procedureOfSorting.procedure[currentFieldIndex.current].length > 0) {
            isWholeArraySame.current = currentField.every((val, i, arr) => val === arr[0]);
        }
        if (!isWholeArraySame.current) {
            if (currentField.length > 1) {
                return scaleBetween(element, CHART_MIN_HEIGHT, CHART_MAX_HEIGHT, minRange.current, maxRange.current);
            }
            return CHART_MAX_HEIGHT;
        }
        return CHART_MIN_HEIGHT;
    }
    const setSwapedValues = () => {
        let swaped: number[] = [];
        if (currentField.length > 0 && Array.isArray(prevData.current)) {
            for (let i = 0; i < currentField.length; i++) {
                if (currentField[i] != prevData.current[i]) {
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
                {procedureOfSorting.procedure.length > 0 && currentField?.map((element, index) => {
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
                    Original array: [{currentField.length > 0 && procedureOfSorting.procedure[0].join(", ")}]
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

export default Vizualization