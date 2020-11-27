import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface IProps {
    procedureOfSorting: {
        procedure: number[][];
        indexes: number[];//0->4,0->3,0->2,0->1,0
    };
}

const Charts = ({ procedureOfSorting }: IProps) => {
    const [partOfProcedure, setPartOfProcedure] = useState<{ index: number, oneElement: number[] }>({ index: 0, oneElement: [] });
    const prevData = useRef(partOfProcedure);
    useEffect(() => {
        showProcedure()
    }, [procedureOfSorting])

    useEffect(() => {
        prevData.current = partOfProcedure;
    }, [partOfProcedure])
    const showProcedure = () => {
        return (procedureOfSorting.procedure.map((oneElement, index) => {
            setTimeout(() => {
                setPartOfProcedure({ oneElement, index });
            }, 1000 * (index))
        }))
    }
    const checkBackgroundColor = (element: number, index: number) => {
        if (index == procedureOfSorting.indexes[partOfProcedure.index]) {
            return "#b22222";
        }
    }
    //Moram skaliart height-> napravit formulu za skaliranje
    if (procedureOfSorting.procedure.length > 0) {
        return (<View style={styles.chartsContainer}>
            {partOfProcedure.oneElement?.map((element, index) => {

                return (
                    <View key={index}>

                        <View style={[styles.oneChartContainer, { height: 50 + element * 5, backgroundColor: checkBackgroundColor(element, index) }]} />
                        <Text style={styles.chartLabelText}>{element}</Text>
                    </View>
                )
            })}
        </View>)
    }
    return null;
}

const styles = StyleSheet.create({
    chartsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginTop: 25
    },
    oneChartContainer: {
        width: 30,
        marginLeft: 2.5,
        marginRight: 5,
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: 'green'
    },
    chartLabelText: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 5,
        alignSelf: 'center'
    }
})

export default React.memo(Charts, (prevState, currentState) => {
    return prevState.procedureOfSorting == currentState.procedureOfSorting;
});