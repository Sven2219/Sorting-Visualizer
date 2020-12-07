import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import Splash from './Splash';
import Algorithms from './Algorithms';
import { Dimensions } from 'react-native';
import { OrientationState } from '../context/OrientationState';
import { LANDSCAPE, PORTRAIT } from '../components/helpers/types';

const Stack = createStackNavigator();


const Navigation = (): JSX.Element => {
    return (<NavigationContainer >
        <Stack.Navigator initialRouteName={"Splash"} headerMode="none">
            <Stack.Screen component={Splash} name="Splash" />
            <Stack.Screen component={Algorithms} name="Algorithms" />
        </Stack.Navigator>
    </NavigationContainer>)
}
const App = (): JSX.Element => {
    const [orientation, setOrientation] = useState<string>("");
    useEffect(() => {
        const { width, height } = Dimensions.get("window");
        if (width < height) {
            setOrientation(PORTRAIT);
        } else {
            setOrientation(LANDSCAPE);
        }
        Dimensions.addEventListener('change', handleResize)
        return () => {
            Dimensions.removeEventListener('change', handleResize)
        }
    }, [])
    //setting listener and removing after going back from screen
    const handleResize = ({ window: { width, height } }: { window: { width: number, height: number } }) => {
        if (width < height) {
            setOrientation(PORTRAIT);
        } else {
            setOrientation(LANDSCAPE);
        }
    }
    return (
        <OrientationState.Provider value={{ orientation }}>
            <Navigation />
        </OrientationState.Provider>
    )
}

export default App;