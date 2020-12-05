import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { CHARTS_HEIGHT } from '../Constants';
import Charts from './Charts';
import { IPivot } from '../quick/quickSort';
interface IProps {
    procedureOfSorting: {
        procedure: number[][];
        indexes: number[];
        pivots?: IPivot
    }
    isVizualizationPaused: boolean;
    vizualizationFinished: () => void;
    chosenSort: string;
}

const ChartsMethod = ({ procedureOfSorting, isVizualizationPaused, vizualizationFinished, chosenSort }: IProps): JSX.Element => {
    const { procedure } = procedureOfSorting;
    const [currentField, setCurrentField] = useState<number[]>([]);
    const currentFieldIndex = useRef<number>(0);
    const timers = useRef<NodeJS.Timeout[]>([]);
    const swapedValue = useRef<number[][]>([]);
    const maxRange = useRef<number>(0);
    const minRange = useRef<number>(0);
    useEffect(() => {
        if (procedure.length > 0) {
            timers.current = startProcedure();
        }
        return () => {
            for (let i = 0; i < procedure.length; i++) {
                clearTimeout(timers.current[i]);
            }
        }
    }, [procedureOfSorting])
    useEffect(() => {
        maxRange.current = Math.max.apply(Math, procedure[0]);
        minRange.current = Math.min.apply(Math, procedure[0]);
        if (isVizualizationPaused) {
            for (let i = 0; i < procedure.length; i++) {
                clearTimeout(timers.current[i]);
            }
        }
    }, [isVizualizationPaused])

    useEffect(() => {
        setSwapedValues();
    }, [currentField])

    const startProcedure = (): NodeJS.Timeout[] => {
        if (currentFieldIndex.current === 0) {
            swapedValue.current = [];
        }
        const start: number = currentFieldIndex.current > 0 ? currentFieldIndex.current + 1 : currentFieldIndex.current;
        const slicedData: number[][] = procedure.slice(start, procedure.length);
        return (slicedData.map((field, index) => {
            return setTimeout(() => {
                if (!isVizualizationPaused) {
                    if (index !== procedure.length - 1 - start) {
                        if (start > 0) {
                            currentFieldIndex.current = currentFieldIndex.current + 1;
                            setCurrentField(field);
                        }
                        else {
                            currentFieldIndex.current = index;
                            setCurrentField(field);
                        }
                    }
                    else {
                        currentFieldIndex.current = 0;
                        vizualizationFinished();
                    }
                }
            }, 700 * (index !== procedure.length - 1 - start ? index : index - 0.9))
        }))
    }
    const setSwapedValues = (): void => {
        let swaped: number[] = [];
        if (currentField.length > 0 && Array.isArray(procedure[currentFieldIndex.current - 1])) {
            for (let i = 0; i < currentField.length; i++) {
                if (currentField[i] != procedure[currentFieldIndex.current - 1][i]) {
                    swaped.push(procedure[currentFieldIndex.current - 1][i])
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
                {currentField.length > 0 && <Charts procedureOfSorting={procedureOfSorting}
                    currentFieldIndex={currentFieldIndex.current}
                    currentField={currentField}
                    minRange={minRange.current}
                    maxRange={maxRange.current}
                    chosenSort={chosenSort}
                />}
            </View>
            <View style={styles.procedureContainer}>
                <Text style={styles.originalArrayText}>
                    Original array: [{currentField.length > 0 && procedure[0].join(", ")}]
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
export default React.memo(ChartsMethod, (prevState, currentState) => {
    return prevState.isVizualizationPaused == currentState.isVizualizationPaused;
});