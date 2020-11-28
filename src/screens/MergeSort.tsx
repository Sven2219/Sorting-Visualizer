import React, { useReducer } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { Actions, IState, reducer } from '../reducers/mergeSort';
import Feather from 'react-native-vector-icons/Feather';
import InputArray from '../components/inputArray/InputArray';



interface IProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const MergeSort = ({ navigation }: IProps) => {
    const [state, dispatch] = useReducer<React.Reducer<IState, Actions>>(reducer, { isModalOpen: false, arrayForSort: "" })

    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <Ionicons name="arrow-back" size={35} color="#000" onPress={() => navigation.goBack()} />
                <Text style={styles.headerText}>Merge Sort</Text>
                <Feather name="book" size={35} color="#000" />
            </View>
            
        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 20
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 2
    },

})
export default MergeSort;