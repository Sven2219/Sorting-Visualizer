import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { INPUT_ARRAY_WIDTH, width } from '../sorting/bubble/Constants';

interface IProps{
    onPress:(arrayForSort:string)=>void;
    arrayForSort:string;
}

const InputArray = ({onPress,arrayForSort}:IProps) => {
    return (
        <View style={styles.inputArrayContainer}>
            <Text style={styles.labelText}>Array: </Text>
            <TextInput value={arrayForSort} onChangeText={(arrayForSort)=>onPress(arrayForSort)} style={styles.textInput} placeholder={"1, 2, 3, 4, 5, 6"}/>
        </View>
    )
}
const styles = StyleSheet.create({
    inputArrayContainer: {
        width: INPUT_ARRAY_WIDTH,
        borderWidth: 1,
        borderRadius: 10,
        height: 50,
        left: (width - INPUT_ARRAY_WIDTH) / 2,
        alignItems:'center',
        flexDirection:'row',
        overflow:'hidden'
    },
    labelText:{
        fontSize:18,
        fontWeight:'bold',
        letterSpacing:1.4,
        marginLeft:10,
        width:60,
    },
    textInput:{
        fontSize:18,
    }
})
export default InputArray;