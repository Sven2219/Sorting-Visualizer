import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BubbleDispatch } from '../../../context/BubbleDispatch';
import { BubbleState } from '../../../context/BubbleState';
import { CHARTS_HEIGHT, CHART_MAX_HEIGHT, CHART_MIN_HEIGHT } from './Constants';
import { scaleBetween } from './scalingHelper';

const Vizualization = (): JSX.Element => {

    const { state: { isVizualizationPaused, procedureOfSorting } } = useContext(BubbleState);
    const { dispatch } = useContext(BubbleDispatch);

    //I need to have currentField for state and not counter because with counter I will get flickering effect when it comes to end.
    const [currentField, setCurrentField] = useState<number[]>([]);
    const currentFieldIndex = useRef<number>(0);
    //for scaling height
    const maxRange = useRef<number>(10);
    const minRange = useRef<number>(0);
    const swapedValue = useRef<number[][]>([]);
    //edge scenario for scaling
    const isWholeArraySame = useRef<boolean>(true);

    //for pausing timers(deleting)
    const timers = useRef<NodeJS.Timeout[]>([]);
    const [isFinished, setIsFinished] = useState<boolean>(false);

    //end of vizualization
    useEffect(() => {
        if (isFinished) {
            dispatch({ type: "setIsPaused", isVizualizationPaused: true, isVizualizationFinished: true })
        }
    }, [isFinished])
    //start of vizualization
    useEffect(() => {
        if (currentFieldIndex.current === 0) {
            swapedValue.current = [];
            maxRange.current = Math.max.apply(Math, procedureOfSorting.procedure[0]);
            minRange.current = Math.min.apply(Math, procedureOfSorting.procedure[0]);
            delayToAvoidFlickering();
        }
        timers.current = startProcedure();
        //cleanup 
        return () => {
            for (let i = 0; i < procedureOfSorting.procedure.length; i++) {
                clearTimeout(timers.current[i])
            }
            clearTimeout(delayToAvoidFlickering());
        }
    }, [procedureOfSorting])

    //when user pause vizualization
    useEffect(() => {
        if (isVizualizationPaused) {
            for (let i = 0; i < procedureOfSorting.procedure.length; i++) {
                clearTimeout(timers.current[i])
            }
        }
    }, [isVizualizationPaused])

    //for tracking swapedValues
    useEffect(() => {
        setSwapedValues();
    }, [currentField])


    const delayToAvoidFlickering = (): NodeJS.Timeout => {
        return setTimeout(() => {
            setIsFinished(false);
        }, 100)
    }

    const startProcedure = (): NodeJS.Timeout[] => {
        const start: number = currentFieldIndex.current > 0 ? currentFieldIndex.current + 1 : currentFieldIndex.current;
        const slicedData: number[][] = procedureOfSorting.procedure.slice(start, procedureOfSorting.procedure.length);
        return (slicedData.map((field, index) => {
            return setTimeout(() => {
                if (!isVizualizationPaused) {
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
    const getBackgroundColor = (element: number, index: number): string => {
        if (currentFieldIndex.current < 1) {//start
            return "#228b22";//green
        }
        if (currentFieldIndex.current + 1 === procedureOfSorting.procedure.length) {//end
            isWholeArraySame.current = false;
            currentFieldIndex.current = 0;
            setIsFinished(true)
            return "#228b22"//green
        }

        else if (element != procedureOfSorting.procedure[currentFieldIndex.current - 1][index]) {
            return "#b22222";//red
        }
        else if (index == procedureOfSorting.indexes[currentFieldIndex.current]) {
            return "#483d8b";//blue
        }
        else {
            return "#228b22"//green
        }
    }
    const getScaledHeight = (element: number): number => {
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

    const setSwapedValues = (): void => {
        let swaped: number[] = [];
        if (currentField.length > 0 && Array.isArray(procedureOfSorting.procedure[currentFieldIndex.current - 1])) {
            for (let i = 0; i < currentField.length; i++) {
                if (currentField[i] != procedureOfSorting.procedure[currentFieldIndex.current - 1][i]) {
                    swaped.push(procedureOfSorting.procedure[currentFieldIndex.current - 1][i])
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
                                height: getScaledHeight(element),
                                backgroundColor: getBackgroundColor(element, index)
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