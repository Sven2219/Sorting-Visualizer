import React from 'react';
import { IMerge, IMergeSnapshots } from '../../../../helpers/interfaces';
import Snapshot from '../Snapshot';

interface IProps {
    currentFieldIndex: number;
    mergeSortProcedureSnapshots: IMergeSnapshots;
    currentField: (IMerge | undefined)[];
}

const TimingSnapshots = ({ currentFieldIndex, mergeSortProcedureSnapshots, currentField }: IProps): JSX.Element => {
    return (<Snapshot
        currentFieldIndex={currentFieldIndex}
        mergeSortSnapshotProcedure={mergeSortProcedureSnapshots}
    />)
}

export default React.memo(TimingSnapshots, (prevProps, currentProps) => {
    return prevProps.currentField === currentProps.currentField;
});