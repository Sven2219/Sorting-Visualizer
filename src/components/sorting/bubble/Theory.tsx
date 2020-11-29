import React from 'react';
import { View, Text, Modal, StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CodeExample from './CodeExample';
import Complexity from './Complexity';

interface IProps {
    onPress: () => void;
}

const Theory = ({ onPress }: IProps): JSX.Element => {

    return (
        <Modal >
            <ScrollView style={styles.mainModalContainer}>
                <View style={styles.headerContainer}>
                    <View style={styles.arrowBackContainer}>
                        <Ionicons name="arrow-back" size={35} color="#000" onPress={onPress} />
                    </View>
                    <Text style={styles.titleText}>
                        Theory
                </Text>
                </View>
                <Complexity />
                <View>
                    <CodeExample />
                </View>
            </ScrollView>

        </Modal>
    )
}

const styles = StyleSheet.create({
    mainModalContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
    arrowBackContainer: {
        position: 'absolute',
        left: 20,
        top: 0
    },
    titleText: {
        fontSize: 24,
        fontFamily: 'Sura-Bold'
    },

})

export default Theory;