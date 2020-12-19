import React, { useRef, useState } from 'react';
import { StyleSheet, Animated } from 'react-native';
import TouchableScale from 'react-native-touchable-scale';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const ICON_SIZE = 50;

const SnapshotSettings = () => {
    const [showSettings, setShowSettings] = useState(false);
    //settings animation
    const settingsRotation = useRef(new Animated.Value(0)).current;
    const translateYManual = useRef(new Animated.Value(0)).current;
    const translateXTimed = useRef(new Animated.Value(0)).current;
    const translateYTimed = useRef(new Animated.Value(0)).current;
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
    return (
        <>
            <Animated.View style={[styles.snapshotSettingsContainer, { transform: [{ rotate: rotateIcon }], zIndex: 1 }]}>
                <Ionicons name="md-settings-outline" size={40} onPress={translateYOs} />
            </Animated.View>
            <Animated.View style={[styles.snapshotSettingsContainer, { transform: [{ translateY: translateYManual }] }]}>
                <TouchableScale activeScale={0.7}>
                    <Ionicons name="timer-outline" size={40} />
                </TouchableScale>
            </Animated.View>
            <Animated.View style={[styles.snapshotSettingsContainer, { transform: [{ translateY: translateYTimed }] }]}>
                <TouchableScale activeScale={0.7}>
                    <FontAwesome name="hand-pointer-o" size={40} />
                </TouchableScale>
            </Animated.View>


        </>
    )
}
const styles = StyleSheet.create({
    snapshotSettingsContainer: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        width: ICON_SIZE,
        height: ICON_SIZE,
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default SnapshotSettings;