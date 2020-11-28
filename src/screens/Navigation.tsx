import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import Menu from './Menu';
import BubbleSort from './BubbleSort';
import QuickSort from './QuickSort';
import MergeSort from './MergeSort';
import HeapSort from './HeapSort';
import { Dimensions } from 'react-native';
import { OrientationState } from '../context/OrientationState';

const Stack = createStackNavigator();


const Navigation = (): JSX.Element => {
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
const App = (): JSX.Element => {
    const [orientation, setOrientation] = useState<string>("");
    useEffect(() => {
        const { width, height } = Dimensions.get("window");
        if (width < height) {
            setOrientation("PORTRAIT");
        } else {
            setOrientation("LANDSCAPE");
        }
    }, [])
    //setting listener and removing after going back from screen
    useEffect(() => {
        Dimensions.addEventListener('change', handleResize)
        return () => {
            Dimensions.removeEventListener('change', handleResize)
        }
    }, []);
    const handleResize = ({ window: { width, height } }: { window: { width: number, height: number } }) => {
        if (width < height) {
            setOrientation("PORTRAIT");
        } else {
            setOrientation("LANDSCAPE");
        }
    }
    return (
        <OrientationState.Provider value={{ orientation }}>
            <Navigation />
        </OrientationState.Provider>
    )
}
export default App;