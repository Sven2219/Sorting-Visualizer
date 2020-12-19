import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
interface IProps {
    iconName: string;
    onPress: () => void;
}
const StepButton = ({ iconName,onPress }: IProps) => {
    return (<View>
        <TouchableOpacity>
            <Ionicons name={iconName} size={35} onPress={onPress} />
        </TouchableOpacity>
    </View>)
}

export default StepButton;