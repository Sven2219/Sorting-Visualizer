import React, { useEffect, useState } from 'react';
import Algorithms from './Algorithms';
import { Dimensions } from 'react-native';
import { OrientationState } from '../context/OrientationState';
import { LANDSCAPE, PORTRAIT } from '../components/helpers/types';



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
            <Algorithms />
        </OrientationState.Provider>
    )
}

export default App;