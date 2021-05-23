import React from 'react';
import { View, Modal, StyleSheet, TouchableWithoutFeedback, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { OrientationState } from '../../context/OrientationState';
import { getItemHeight, getItemWidth, getModalHeight, getModalWidth } from '../menu/getMethods';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';

interface Props {
    arrayForSort: string;
    timerValue: number;
    closeSettings: () => void;
    saveTimer: (value: number) => void;
    saveArray: (value: string) => void;
}

const UserSettings = (props: Props) => {
    const { orientation } = React.useContext(OrientationState);
    const [arrayLength, setArrayLength] = React.useState<string>("");
    const timerRef = React.useRef<number>(0);

    const generateRandom = React.useCallback(() => {
        const arr = [];
        while (arr.length < parseInt(arrayLength)) {
            const r = Math.floor(Math.random() * 20) + 1;
            if (arr.indexOf(r) === -1) arr.push(r);
        }
        const joined = [...arr].join(",");
        props.saveArray(joined)
    }, [arrayLength])


    const saveTimer = React.useCallback(() => {
        props.saveTimer(timerRef.current * 1000);
        props.closeSettings();
    }, [])

    return (
        <Modal visible={true} transparent >
            <TouchableWithoutFeedback onPress={props.closeSettings}>
                <View style={[styles.modalOverlay, { width: getModalWidth(orientation), height: getModalHeight(orientation) }]} />
            </TouchableWithoutFeedback>
            <View style={[styles.itemPosition, { top: (getModalHeight(orientation) - getItemHeight(orientation)) / 1.8 }]}>
                <View style={[styles.itemContainer, { width: getItemWidth(orientation), height: getItemHeight(orientation) }]}>
                    <View style={styles.random}>
                        <TextInput style={styles.randomInput} onChangeText={setArrayLength} />
                        <FontAwesome name="random" size={30} style={styles.iconContainer} onPress={generateRandom} />
                    </View>
                    <View style={styles.randomArray}>
                        <Text style={styles.arrayForSortText}>
                            {props.arrayForSort}
                        </Text>
                    </View>
                    <View style={styles.center}>
                        <Text>
                            Timer value
                        </Text>
                        <Slider
                            style={{ width: 200, height: 40 }}
                            minimumValue={0}
                            value={props.timerValue / 1000}
                            maximumValue={1}
                            onValueChange={(e) => {
                                timerRef.current = e;
                            }}
                            minimumTrackTintColor="red"
                            maximumTrackTintColor="#000000"
                        />
                        <TouchableOpacity onPress={saveTimer}>
                            <Text style={styles.timerButtonText}>
                                Save timer
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalOverlay: {
        backgroundColor: '#000000aa',
        position: 'absolute',
        top: 0,
    },
    itemContainer: {
        backgroundColor: '#fff',
        padding: 10
    },
    itemPosition: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontFamily: 'Sura-Bold',
        padding: 5,
        letterSpacing: 1.3,
        alignSelf: 'center'
    },
    algorithmContainer: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flex: 1,
        marginBottom: 10
    },
    vizualizationMethod: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    random: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    randomInput: {
        borderWidth: 1,
        width: "30%",
        borderRadius: 5,
    },
    iconContainer: {
        marginLeft: 10
    },
    randomArray: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    arrayForSortText: {
        fontSize: 18
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    timerButtonText: {
        fontSize: 18,
    }
})

export default UserSettings;