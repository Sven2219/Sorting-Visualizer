import { bubbleSort, IBubble } from "../components/bubble/bubbleSort";
import { IQuick, quickSort } from "../components/quick/quickSort";


export const quickSortProcedure = (elements: number[]): IQuick => {
    const quick: IQuick = { procedure: [], pivots: { pivot: [], pivotIndex: [] }, indexes: [] };
    const { procedure, pivots, indexes } = quick;
    const { pivot, pivotIndex } = pivots;
    const high: number = elements.length - 1;
    procedure.push([...elements]);
    indexes.push(0);
    pivot.push(elements[high]);
    pivotIndex.push(high);
    quickSort(elements, 0, high, quick, "lijevo");
    procedure.push([...elements]);
    procedure.push([...elements]);
    return quick;
}