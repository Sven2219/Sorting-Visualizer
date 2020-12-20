export interface IQuickCharts {
    procedure: number[][];
    pivotIndexes: number[];
    indexes: IIndexCharts[];
}
export interface IIndexCharts {
    index: number;
    //this is edge scenario when numbers are equal but should swap //quicksort
    isSame?: boolean;
    low?: number;
    high?: number;
}

export interface IQuickSnapshotPosition {
    levels: number[];
    startIndexes: number[];
}

export interface IQuickSnapshots {
    snapshots: number[][];
    pivotIndexes: number[];
    snapshotPosition: IQuickSnapshotPosition;
}
export interface IBubble {
    procedure: number[][];
    indexes: number[];
}