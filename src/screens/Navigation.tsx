import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import Menu from './Menu';
import BubbleSort from './BubbleSort';
import QuickSort from './QuickSort';
import MergeSort from './MergeSort';
import HeapSort from './HeapSort';

const Stack = createStackNavigator();


const Navigation = () => {
    return (<NavigationContainer >
        <Stack.Navigator initialRouteName={"Menu"} headerMode="none">
            <Stack.Screen component={Menu} name="Menu" />
            <Stack.Screen component={BubbleSort} name="BubbleSort" />
            <Stack.Screen component={QuickSort} name="QuickSort" />
            <Stack.Screen component={MergeSort} name="MergeSort" />
            <Stack.Screen component={HeapSort} name="HeapSort" />
        </Stack.Navigator>
    </NavigationContainer>)
}
export default Navigation;