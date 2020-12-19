import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { CHARTS_CONTAINER_HEIGHT } from '../../../Constants';
import { IBubble } from '../../../helpers/interfaces'
import Charts from './BubbleCharts';
import { getBubbleSwapedValues } from '../getSwapedValues';
interface IProps {
    bubbleSortProcedure: IBubble;
    isVizualizationPaused: boolean;
    vizualizationFinished: () => void;
}

const BubbleChartsMethod = ({ bubbleSortProcedure, isVizualizationPaused, vizualizationFinished }: IProps): JSX.Element => {
    const { procedure } = bubbleSortProcedure;
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
    }, [procedure])
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
        const swapedValues: number[] = getBubbleSwapedValues(currentField, procedure[currentFieldIndex.current - 1]);;
        if (swapedValues.length > 0) {
            swapedValue.current = [...swapedValue.current, swapedValues]
        }
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

    const getSwapingText = (field: number[]): string => {
        return `Swapping ${field.join(" and ")}`;
    }
    const getOriginalArray = (): string | undefined => {
        if (currentField.length > 0) {
            return procedure[0].join(", ");
        }
    }
    return (
        <View style={styles.mainContainer}>
            <View style={[styles.chartsContainer, styles.shadow]}>
                {currentField.length > 0 && <Charts
                    currentFieldIndex={currentFieldIndex.current}
                    currentField={currentField}
                    minRange={minRange.current}
                    maxRange={maxRange.current}
                    bubbleSortProcedure={bubbleSortProcedure}
                />}
            </View>
            <View style={styles.procedureContainer}>
                <Text style={styles.originalArrayText}>
                    Original array: [{getOriginalArray()}]
                </Text>
                {swapedValue.current.length > 0 && swapedValue.current.map((field, index) => {
                    return (
                        <Text key={index} style={styles.swapingText}>
                            {getSwapingText(field)}
                        </Text>
                    )
                })
                }
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
        height: CHARTS_CONTAINER_HEIGHT,
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
export default React.memo(BubbleChartsMethod, (prevProps, currentProps) => {
    return prevProps.isVizualizationPaused == currentProps.isVizualizationPaused;
});