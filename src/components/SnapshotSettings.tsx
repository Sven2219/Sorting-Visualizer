import React, { useRef, useState } from 'react';
import { StyleSheet, Animated, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { MANUAL, TIMING } from './helpers/types';
import { ANIMATION_DURATION, SETTINGS_ICON_CONTAINER, SETTINGS_ICON_SIZE } from './helpers/Constants';
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
    const startAnimation = (yManualValue: number, rotationValue: number, yTimedValue: number, textOpacityValue: number) => {
        Animated.parallel([
            Animated.timing(translateYManual, {
                toValue: yManualValue,
                duration: ANIMATION_DURATION,
                useNativeDriver: true,
            }),
            Animated.timing(settingsRotation, {
                toValue: rotationValue,
                duration: ANIMATION_DURATION,
                useNativeDriver: true
            }),
            Animated.timing(translateYTimed, {
                toValue: yTimedValue,
                duration: ANIMATION_DURATION,
                useNativeDriver: true
            }),
            Animated.timing(textOpacity, {
                toValue: textOpacityValue,
                duration: ANIMATION_DURATION,
                useNativeDriver: true
            })
        ]).start(() => {
            setShowSettings(!showSettings);
        });
    }
    const translateYOs = () => {
        if (!showSettings) {
            //open settings
            startAnimation(-115, 1, -60, 1);
        }
        else {
            //close settings
            startAnimation(0, 0, 0, 0);
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
            <Animated.View style={[styles.snapshotSettingsContainer,styles.mainContainer, {  transform: [{ rotate: rotateIcon }] }]}>
                <Ionicons name="md-settings-outline" size={SETTINGS_ICON_SIZE} onPress={translateYOs} />
            </Animated.View>
            <Animated.View style={[styles.snapshotSettingsContainer, { transform: [{ translateY: translateYManual }] }]}>
                <TouchableOpacity style={styles.methodContainer}>
                    <Animated.Text style={[styles.textStyle, { color: getColor(TIMING), opacity: textOpacity }]}>Timing</Animated.Text>
                    <Ionicons name="timer-outline" size={SETTINGS_ICON_CONTAINER} onPress={() => {
                        timingMethod();
                        translateYOs();
                    }} color={getColor(TIMING)} />
                </TouchableOpacity>
            </Animated.View>
            <Animated.View style={[styles.snapshotSettingsContainer, { transform: [{ translateY: translateYTimed }] }]}>
                <TouchableOpacity style={styles.methodContainer}>
                    <Animated.Text style={[styles.textStyle, { color: getColor(MANUAL), opacity: textOpacity }]}>Manual</Animated.Text>
                    <FontAwesome name="hand-pointer-o" size={SETTINGS_ICON_SIZE} onPress={() => {
                        manualMethod();
                        translateYOs();
                    }} color={getColor(MANUAL)} />
                </TouchableOpacity>
            </Animated.View>
        </>
    )
}
const styles = StyleSheet.create({
    mainContainer:{
        zIndex:1,
        backgroundColor:'#fff'
    },
    snapshotSettingsContainer: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        width: SETTINGS_ICON_CONTAINER,
        height: SETTINGS_ICON_CONTAINER,
        borderRadius: SETTINGS_ICON_CONTAINER / 2,
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