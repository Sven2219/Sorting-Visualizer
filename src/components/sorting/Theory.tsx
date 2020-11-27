import React from 'react';
import { View, Text, Modal, StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IProps {
    onPress: () => void;
}
const Theory = ({ onPress }: IProps) => {
    return (
        <Modal >
            <View style={styles.mainModalContainer}>
                <View style={{ backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                    <View style={styles.arrowBackContainer}>
                        <Ionicons name="arrow-back" size={35} color="#000" onPress={onPress} />
                    </View>
                    <Text style={styles.titleText}>
                        Theory
                </Text>
                </View>
            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    mainModalContainer: {
        flex: 1,

    },
    arrowBackContainer: {
        position: 'absolute',
        left: 20,
        top: 0
    },
    titleText: {
        fontSize: 24,
        fontFamily: 'Sura-Bold'
    }
})

export default Theory;