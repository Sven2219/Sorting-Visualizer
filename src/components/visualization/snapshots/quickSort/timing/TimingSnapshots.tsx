import React from 'react';
import { IQuickSnapshots } from '../../../../helpers/interfaces';
import Snapshot from '../Snapshot';

interface IProps {
    currentFieldIndex: number;
    quickSortProcedureSnapshots: IQuickSnapshots;
    currentField: number[]
}

const TimingSnapshots = ({ currentFieldIndex, quickSortProcedureSnapshots, currentField }: IProps): JSX.Element => {
    return (<Snapshot
        currentFieldIndex={currentFieldIndex}
        quickSortSnapshotsProcedure={quickSortProcedureSnapshots}

    />)
}

export default React.memo(TimingSnapshots, (prevProps, currentProps) => {
    return prevProps.currentField === currentProps.currentField;
});