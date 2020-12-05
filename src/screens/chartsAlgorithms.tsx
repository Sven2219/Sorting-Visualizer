import { IQuick, quickSort } from "../components/quick/quickSort";


export const quickSortProcedure = (elements: number[]): IQuick => {
    const quick: IQuick = { procedure: [], pivots: { pivot: [], pivotIndex: [] }, indexes: [] };
    const { procedure, pivots, indexes } = quick;
    const { pivot, pivotIndex } = pivots;
    const high: number = elements.length - 1;

    //initial 
    procedure.push([...elements]);
    indexes.push({ index: 0 });
    pivot.push(elements[high]);
    pivotIndex.push(high);

    quickSort(elements, 0, high, quick, "lijevo");

    //ending
    procedure.push([...elements]);
    procedure.push([...elements]);
    console.log(quick);
    return quick;
}