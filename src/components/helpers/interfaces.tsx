export interface IQuick {
    procedure: number[][];
    pivots: IPivot;
    indexes: IIndex[];
}
export interface IIndex {
    index: number;
    //this is edge scenario when numbers are equal but should swap //quicksort
    isSame?: boolean;
    low?: number;
    high?: number;
}
export interface IPivot {
    pivot: number[];
    pivotIndex: number[];
}
export interface IBubble {
    procedure: number[][];
    indexes: number[];
}