import { IQuick } from "../helpers/interfaces";

const partition = (arr: number[], low: number, high: number, quick: IQuick): number => {
    const pivot: number = arr[high];
    const { pivots, indexes, procedure } = quick;
    let i: number = low - 1;
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            procedure.push([...arr]);
            indexes.push({ index: j });
            pivots.pivot.push(pivot);
            pivots.pivotIndex.push(high);
            i++;
            let temp: number = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        indexes.push({ index: j });
        pivots.pivot.push(pivot);
        pivots.pivotIndex.push(high);
        procedure.push([...arr]);
    }
    let temp: number = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    pivots.pivot.push(pivot);
    pivots.pivotIndex.push(high);
    if (arr[high] === arr[i + 1]) {
        indexes.push({ index: (i + 1), low: i + 1, high: high, isSame: true })
    }
    else {
        indexes.push({ index: (i + 1) })
    }
    procedure.push([...arr])
    return i + 1;
}

export const quickSort = (arr: number[], low: number, high: number, quick: IQuick): void => {
    if (low < high) {
        let pivotPosition: number = partition(arr, low, high, quick);
        quickSort(arr, low, (pivotPosition - 1), quick);
        quickSort(arr, pivotPosition + 1, high, quick)
    }
}