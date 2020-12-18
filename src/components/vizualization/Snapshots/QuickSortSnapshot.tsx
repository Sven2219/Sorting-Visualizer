import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { AlgorithmsState } from '../../../context/AlgorithmsState';
import { MODAL_OVERLAY_LANDSCAPE } from '../../Constants';
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
        <View style={{ position: 'relative', flex: 1, height: 300,borderWidth:1,justifyContent:'center' }}>
            {snapshots.length > 0 && <Snapshots currentFieldIndex={currentFieldIndex} />}
        </View>

    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default React.memo(QuickSortSnapshot, (prevProps, currentProps) => {
    return prevProps.isVizualizationPaused === currentProps.isVizualizationPaused;
});