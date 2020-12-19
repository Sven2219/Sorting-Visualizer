import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { CHARTS, SNAPSHOTS } from './helpers/types';
import StartPauseButton from './StartPauseButton';

interface IProps {
    vizualizationMethod: string;
    isVizualizationPaused: boolean;
    callSortingAlgorithm: () => void;
    paused: () => void;
}
const BUTTON_SIZE = 50;
const VizualizationManagment = ({ isVizualizationPaused, vizualizationMethod, callSortingAlgorithm, paused }: IProps) => {
    const getButton = (): JSX.Element => {
        if (isVizualizationPaused) {
            return <StartPauseButton onPress={callSortingAlgorithm}
                iconName={"caret-forward"} />
        }
        return <StartPauseButton onPress={paused}
            iconName={"pause"} />
    }
    const getManagmentMethod = () => {
        if (vizualizationMethod === CHARTS) {
            return (<View style={styles.buttonPosition}>
                <View style={[styles.buttonContainer, styles.shadow,
                { backgroundColor: isVizualizationPaused ? "rgba(34,139,34,0.8)" : "rgba(178,34,34,0.8)" }]}>
                    {getButton()}
                </View>
            </View>)
        }
        else if (vizualizationMethod === SNAPSHOTS) (
            <View style={styles.manualContainer}>
                <TouchableOpacity onPress={callSortingAlgorithm}>
                    <Text style={styles.manualText}>START VISUALIZING</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <>
            {getManagmentMethod()}
        </>
    )
}
const styles = StyleSheet.create({
    buttonPosition: {
        alignItems: 'flex-end',
        top: BUTTON_SIZE / 2,
        zIndex: 2,
        justifyContent: 'space-between'
    },

    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    buttonContainer: {
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        borderRadius: BUTTON_SIZE / 2,
        right: BUTTON_SIZE / 2 - 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    manualContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        top: 40
    },
    manualText: {
        fontFamily:'Sura-Bold'
    }
})
export default VizualizationManagment;