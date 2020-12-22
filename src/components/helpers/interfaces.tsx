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
//levels and startIndexes is used for snapshot positioning only
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
export interface IMergeSnapshots {
    snapshots: (IMerge | undefined)[][]
    levels: number[];
}
//This is object is responsible to rembember element index
//because merge sort works on the same field and if we don't remember indexes we can't visualize it 
export interface IMerge {
    element: number;
    index: number;
}