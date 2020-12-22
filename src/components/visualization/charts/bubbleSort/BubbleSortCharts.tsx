import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { CHARTS_CONTAINER_HEIGHT } from '../../../helpers/Constants';
import { IBubble } from '../../../helpers/interfaces'
import Charts from '../Charts';
import { getBubbleSwapedValues, getOriginalArray } from '../getMethods';
import { getBubbleBg } from '../../../helpers/chartsBackgroundColor';
interface IProps {
    bubbleSortProcedure: IBubble;
    isVisualizationPaused: boolean;
    visualizationFinished: () => void;
    isMenuModalOpen: boolean;
}

const BubbleSortCharts = ({ bubbleSortProcedure, isVisualizationPaused, visualizationFinished, isMenuModalOpen }: IProps): JSX.Element => {
    const { procedure } = bubbleSortProcedure;
    const [currentField, setCurrentField] = useState<number[]>([]);
    const currentFieldIndex = useRef<number>(0);
    const timers = useRef<NodeJS.Timeout[]>([]);
    const swapedValues = useRef<number[][]>([]);
    //for scaling
    const maxElement = useRef<number>(0);
    const minElement = useRef<number>(0);
    useEffect(() => {
        if (procedure.length > 0) {
            timers.current = startProcedure();
        }
        return () => {
            //cleanup 
            const procedureLength: number = procedure.length;
            for (let i = 0; i < procedureLength; i++) {
                clearTimeout(timers.current[i]);
            }
        }
    }, [procedure])
    //When modal is open => (menu)
    useEffect(() => {
        swapedValues.current = [];
        setCurrentField([]);
    }, [isMenuModalOpen])
    //every time when visualization is paused clear all timers!!!
    useEffect(() => {
        maxElement.current = Math.max.apply(Math, procedure[0]);
        minElement.current = Math.min.apply(Math, procedure[0]);
        if (isVisualizationPaused) {
            const procedureLength: number = procedure.length;
            for (let i = 0; i < procedureLength; i++) {
                clearTimeout(timers.current[i]);
            }
        }
    }, [isVisualizationPaused])

    useEffect(() => {
        const swaped: number[] = getBubbleSwapedValues(currentField, procedure[currentFieldIndex.current - 1]);;
        if (swaped.length > 0) {
            swapedValues.current = [...swapedValues.current, swaped]
        }
    }, [currentField])

    const startProcedure = (): NodeJS.Timeout[] => {
        if (currentFieldIndex.current === 0) {
            swapedValues.current = [];
        }
        //Used for knowing where to resume when visualization is paused.(startIndex)
        const startIndex: number = currentFieldIndex.current > 0 ? currentFieldIndex.current + 1 : currentFieldIndex.current;
        const procedureLength: number = procedure.length;
        const slicedProcedure: number[][] = procedure.slice(startIndex, procedureLength);
        return (slicedProcedure.map((field, index) => {
            return setTimeout(() => {
                if (!isVisualizationPaused) {
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
                        visualizationFinished();
                    }
                }
            }, 700 * (index !== procedureLength - 1 - startIndex ? index : index - 0.9))
        }))
    }

    const getSwapingText = (field: number[]): string => {
        return `Swapping ${field.join(" and ")}`;
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
                    backgroundColor={(element: number, index: number) => getBubbleBg(element, index, currentFieldIndex.current, bubbleSortProcedure)}
                />}
            </View>
            <View style={styles.procedureContainer}>
                <Text style={styles.originalArrayText}>
                    Original array: [{getOriginalArray(currentField.length, procedure[0])}]
                </Text>
                {swapedValues.current.length > 0 && swapedValues.current.map((field, index) => {
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
export default React.memo(BubbleSortCharts, (prevProps, currentProps) => {
    //isMenuModal open to avoid flickering when navigating because it is all one screen!!
    return prevProps.isVisualizationPaused == currentProps.isVisualizationPaused && prevProps.isMenuModalOpen == currentProps.isMenuModalOpen;
});