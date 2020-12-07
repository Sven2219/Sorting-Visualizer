import React from 'react';
import { View, Text } from 'react-native';
import BoxForNumber from './BoxForNumber';

interface IProps {
    snapshots: number[][];
    currentFieldIndex: number;
}

const Snapshots = ({ snapshots }: IProps) => {
    return (
        <View>
            {snapshots.length > 0 && snapshots.map((snapshot, index) => {
                return (
                    <View key={index} style={{ flexDirection: 'row' }}>
                        {snapshot.map((number, index) => {
                            return <BoxForNumber number={number} key={index} />
                        })}
                    </View>
                )
            })}
        </View>
    )
}
export default Snapshots;