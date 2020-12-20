import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
interface IProps {
    iconName: string;
    onPress: () => void;
}
const StepButton = ({ iconName, onPress }: IProps): JSX.Element => {
    return (
        <>
            <TouchableOpacity>
                <Ionicons name={iconName} size={35} onPress={onPress} />
            </TouchableOpacity>
        </>
    )
}

export default StepButton;