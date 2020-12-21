import React from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
interface IProps {
    iconName: string;
    onPress: () => void;
}
const StepButton = ({ iconName, onPress }: IProps): JSX.Element => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Ionicons name={iconName} size={35} />
        </TouchableOpacity>
    )
}

export default StepButton;