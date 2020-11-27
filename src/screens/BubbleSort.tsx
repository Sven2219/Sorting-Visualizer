import React, { useReducer } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { Actions, IState, reducer } from '../reducers/bubbleSort';
import Feather from 'react-native-vector-icons/Feather';
import InputArray from '../components/inputArray/InputArray';
import StartButton from '../components/sorting/StartButton';
import Charts from '../components/sorting/bubble/Charts';
import Theory from '../components/sorting/Theory';



interface IProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const BubbleSort = ({ navigation }: IProps) => {
    const [state, dispatch] = useReducer<React.Reducer<IState, Actions>>(reducer, { isModalOpen: false, arrayForSort: "", procedureOfSorting: { indexes: [], procedure: [] } })
    const transformStringAndCallBubble = (): void => {
        if (state.arrayForSort !== "") {
            const array: number[] = state.arrayForSort.split(",").map(Number);//transforming
            bubbleSort(array);//calling bubble
        }
    }
    const bubbleSort = (items: number[]): void => {
        let procedure: number[][] = [];
        let indexes: number[] = [];
        let length: number = items.length;
        procedure.push([...items]);
        indexes.push(0);
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < (length - i - 1); j++) {
                indexes.push(j);
                if (items[j] > items[j + 1]) {
                    procedure.push([...items]);
                    indexes.push(j);
                    let temp: number = items[j];
                    items[j] = items[j + 1];
                    items[j + 1] = temp;
                }
                procedure.push([...items]);
            }
        }
        procedure.push([...items])
        const payload: { procedure: number[][], indexes: number[] } = { procedure, indexes }
        dispatch({ type: "setProcedureOfSorting", payload: payload })
    }
    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <Ionicons name="arrow-back" size={35} color="#000" onPress={() => navigation.goBack()} />
                <Text style={styles.headerText}>Bubble Sort</Text>
                <Feather name="book" size={35} color="#000" onPress={() => dispatch({ type: "setIsModalOpen", payload: true })} />
            </View>
            <InputArray arrayForSort={state.arrayForSort} onPress={(arrayForSort: string) => dispatch({ type: "setArrayForSort", payload: arrayForSort })} />
            <StartButton onPress={transformStringAndCallBubble} />
            <Charts procedureOfSorting={state.procedureOfSorting} />
            {state.isModalOpen && <Theory onPress={() => dispatch({ type: "setIsModalOpen", payload: false })} />}
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 20
    },
    headerText: {
        fontSize: 24,
        fontFamily: 'Sura-Bold',
        letterSpacing: 2
    },
    procedureContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 40
    }
})
export default BubbleSort;