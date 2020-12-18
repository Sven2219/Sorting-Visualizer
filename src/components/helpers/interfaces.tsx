export interface IQuickCharts {
    procedure: number[][];
    pivotIndex: number[];
    indexes: IIndexCharts[];
}
export interface IIndexCharts {
    index: number;
    //this is edge scenario when numbers are equal but should swap //quicksort
    isSame?: boolean;
    low?: number;
    high?: number;
}



export interface IQuickSnapshots {
    snapshots: number[][];
    sortedArray?: number[];
    pivotIndexes: number[]
    levels: number[];
}
export interface IBubble {
    procedure: number[][];
    indexes: number[];
}