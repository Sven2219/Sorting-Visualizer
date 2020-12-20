import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { CHARTS_CONTAINER_HEIGHT } from '../../../helpers/Constants';
import Charts from '../Charts';
import { getQuickSwapedValues } from '../getSwapedValues';
import { IQuickCharts } from '../../../helpers/interfaces';
import { getQuickBg } from '../../../helpers/chartsBackgroundColor';
interface IProps {
    quickSortProcedure: IQuickCharts;
    isVizualizationPaused: boolean;
    vizualizationFinished: () => void;
}

const QuickSortCharts = ({ quickSortProcedure, isVizualizationPaused, vizualizationFinished }: IProps): JSX.Element => {
    const { procedure } = quickSortProcedure;
    const [currentField, setCurrentField] = useState<number[]>([]);
    const currentFieldIndex = useRef<number>(0);
    const timers = useRef<NodeJS.Timeout[]>([]);
    const swapedValues = useRef<number[][]>([]);
    const maxElement = useRef<number>(0);
    const minElement = useRef<number>(0);
    useEffect(() => {
        if (procedure.length > 0) {
            timers.current = startProcedure();
        }
        return () => {
            const procedureLength: number = procedure.length;
            for (let i = 0; i < procedureLength; i++) {
                clearTimeout(timers.current[i]);
            }
        }
    }, [procedure])
    useEffect(() => {
        maxElement.current = Math.max.apply(Math, procedure[0]);
        minElement.current = Math.min.apply(Math, procedure[0]);
        if (isVizualizationPaused) {
            const procedureLength: number = procedure.length;
            for (let i = 0; i < procedureLength; i++) {
                clearTimeout(timers.current[i]);
            }
        }
    }, [isVizualizationPaused])

    useEffect(() => {
        const swaped: number[] = getQuickSwapedValues(currentField, quickSortProcedure, currentFieldIndex.current);
        if (swaped.length > 0) {
            swapedValues.current = [...swapedValues.current, swaped]
        }
    }, [currentField])


    const startProcedure = (): NodeJS.Timeout[] => {
        if (currentFieldIndex.current === 0) {
            swapedValues.current = [];
        }
        const startIndex: number = currentFieldIndex.current > 0 ? currentFieldIndex.current + 1 : currentFieldIndex.current;
        const procedureLength: number = procedure.length;
        const slicedProcedure: number[][] = procedure.slice(startIndex, procedureLength);
        return (slicedProcedure.map((field, index) => {
            return setTimeout(() => {
                if (!isVizualizationPaused) {
                    if (index !== procedureLength - 1 - startIndex) {
                        if (startIndex > 0) {
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
            }, 700 * (index !== procedureLength - 1 - startIndex ? index : index - 0.9))
        }))
    }
    const showSwapingText = (field: number[]): string => {
        return field.length > 1 ? `Swapping ${field.join(" and ")}` : `Swapping ${field[0]} by itself`
    }
    return (
        <View style={styles.mainContainer}>
            <View style={[styles.chartsContainer, styles.shadow]}>
                {currentField.length > 0 && <Charts
                    currentFieldIndex={currentFieldIndex.current}
                    currentField={currentField}
                    minElement={minElement.current}
                    maxElement={maxElement.current}
                    procedure={procedure}
                    backgroundColor={(element: number, index: number) => getQuickBg(element, index, currentFieldIndex.current, quickSortProcedure)}
                />}
            </View>
            <View style={styles.procedureContainer}>
                <Text style={styles.originalArrayText}>
                    Original array: [{currentField.length > 0 && procedure[0].join(", ")}]
                </Text>
                {swapedValues.current.length > 0 && swapedValues.current.map((field, index) => {
                    return (
                        <Text key={index} style={styles.swapingText}>
                            {showSwapingText(field)}
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
export default React.memo(QuickSortCharts, (prevState, currentState) => {
    return prevState.isVizualizationPaused == currentState.isVizualizationPaused;
});