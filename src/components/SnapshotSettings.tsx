import React, { useRef, useState } from 'react';
import { StyleSheet, Animated, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { MANUAL, TIMING } from './helpers/types';

const ICON_SIZE = 40;
const ICON_CONTAINER = 50;
interface IProps {
    manualMethod: () => void;
    timingMethod: () => void;
    snapshotVisualizationMethod: string;
}
const SnapshotSettings = ({ manualMethod, timingMethod, snapshotVisualizationMethod }: IProps): JSX.Element => {
    const [showSettings, setShowSettings] = useState(false);
    //settings animation
    const settingsRotation = useRef(new Animated.Value(0)).current;
    const translateYManual = useRef(new Animated.Value(0)).current;
    const translateYTimed = useRef(new Animated.Value(0)).current;
    const textOpacity = useRef(new Animated.Value(0)).current;
    const translateYOs = () => {
        if (!showSettings) {
            Animated.parallel([
                Animated.timing(translateYManual, {
                    toValue: -115,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(settingsRotation, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true
                }),
                Animated.timing(translateYTimed, {
                    toValue: -60,
                    duration: 500,
                    useNativeDriver: true
                }),
                Animated.timing(textOpacity, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                })
            ]).start(() => {
                setShowSettings(!showSettings);
            });
        }
        else {
            Animated.parallel([
                Animated.timing(translateYManual, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(settingsRotation, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true
                }),
                Animated.timing(translateYTimed, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true
                }),
                Animated.timing(textOpacity, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true
                })
            ]).start(() => {
                setShowSettings(!showSettings);
            });
        }
    };
    const rotateIcon = settingsRotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '50deg']
    })
    const getColor = (method: string): string => {
        return method === snapshotVisualizationMethod ? "rgba(34,139,34,0.9)" : "#000";
    }
    return (
        <>
            <Animated.View style={[styles.snapshotSettingsContainer, { backgroundColor: '#fff', transform: [{ rotate: rotateIcon }], zIndex: 1 }]}>
                <Ionicons name="md-settings-outline" size={ICON_SIZE} onPress={translateYOs} />
            </Animated.View>
            <Animated.View style={[styles.snapshotSettingsContainer, { transform: [{ translateY: translateYManual }] }]}>
                <TouchableOpacity style={styles.methodContainer}>
                    <Animated.Text style={[styles.textStyle, { color: getColor(TIMING), opacity: textOpacity }]}>Timing</Animated.Text>
                    <Ionicons name="timer-outline" size={ICON_SIZE} onPress={() => {
                        timingMethod();
                        translateYOs();
                    }} color={getColor(TIMING)} />
                </TouchableOpacity>
            </Animated.View>
            <Animated.View style={[styles.snapshotSettingsContainer, { transform: [{ translateY: translateYTimed }] }]}>
                <TouchableOpacity style={styles.methodContainer}>
                    <Animated.Text style={[styles.textStyle, { color: getColor(MANUAL), opacity: textOpacity }]}>Manual</Animated.Text>
                    <FontAwesome name="hand-pointer-o" size={ICON_SIZE} onPress={() => {
                        manualMethod();
                        translateYOs();
                    }} color={getColor(MANUAL)} />
                </TouchableOpacity>
            </Animated.View>
        </>
    )
}
const styles = StyleSheet.create({
    snapshotSettingsContainer: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        width: ICON_CONTAINER,
        height: ICON_CONTAINER,
        borderRadius: ICON_CONTAINER / 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    methodContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        right: 15
    },
    textStyle: {
        right: 10,
        fontSize: 14,
        fontFamily: 'Sura-Regular',
        color: '#000'
    }
})
export default SnapshotSettings;