import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Snapshots from './Snapshots';

interface IProps {
    snapshots: number[][];
}

const SnapshotsMethod = ({ snapshots }: IProps) => {
    const timers = useRef<NodeJS.Timeout[]>([]);
    const [currentFieldIndex, setCurrentFieldIndex] = useState<number>(-1);
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
            }, 1000 * index)
        })
    }
    return (
        <ScrollView horizontal
            contentContainerStyle={styles.contentContainerStyle}>
            <View style={styles.mainContainer}>
                {currentFieldIndex > -1 && <Snapshots snapshots={snapshots.slice(0, currentFieldIndex + 1)} currentFieldIndex={currentFieldIndex} />}
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
        justifyContent: 'center'
    }
})
export default React.memo(SnapshotsMethod, (prevProps, currentProps) => {
    return prevProps.snapshots === currentProps.snapshots;
});