import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AlgorithmsState } from '../../../context/AlgorithmsState';
import {MODAL_OVERLAY_LANDSCAPE} from '../../Constants';
import Snapshots from './Snapshots';

interface IProps {
    isVizualizationPaused: boolean;
    vizualizationFinished: () => void;
}

const QuickSortSnapshot = ({ isVizualizationPaused, vizualizationFinished }: IProps) => {
    const timers = useRef<NodeJS.Timeout[]>([]);
    const [currentFieldIndex, setCurrentFieldIndex] = useState<number>(-1);
    const { state: { quickSortProcedureSnapshots: { snapshots } } } = useContext(AlgorithmsState);
    useEffect(() => {
        if (snapshots.length > 0) {
            timers.current = startProcedure();
        }
        return () => {
            for (let i = 0; i < snapshots.length; i++) {
                clearTimeout(timers.current[i]);
            }
        }
    }, [snapshots])
    const startProcedure = (): NodeJS.Timeout[] => {
        return snapshots.map((snap, index) => {
            return setTimeout(() => {
                setCurrentFieldIndex(index);
                if (index + 1 === snapshots.length) {
                    vizualizationFinished();
                    
                }
            }, 1000 * index)
        })
    }
    return (
        <ScrollView 
        horizontal
            contentContainerStyle={styles.contentContainerStyle}>
            <View style={styles.mainContainer}>
                {currentFieldIndex > -1 && <Snapshots
                    currentFieldIndex={currentFieldIndex} />
                }
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
    },
    contentContainerStyle: {
        flex: 1,
        justifyContent: 'center',
    }
})
export default React.memo(QuickSortSnapshot, (prevProps, currentProps) => {
    return prevProps.isVizualizationPaused === currentProps.isVizualizationPaused;
});