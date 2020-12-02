import { IQuick } from "../../screens/Algorithms";


const partition = (arr: number[], low: number, high: number, quick: IQuick): number => {
    const pivot = arr[high];
    quick.pivot.push(pivot);
    let i = low - 1;
    for (let j = low; j < high; j++) {
        quick.indexes.push(j);
        if (arr[j] < pivot) {
            quick.procedure.push([...arr])
            quick.indexes.push(j)
            i++;
            let temp: number = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        quick.procedure.push([...arr]);
    }
    let temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    quick.procedure.push([...arr]);
    return i + 1;
}

export const quickSort = (arr: number[], low: number, high: number, quick: IQuick): void => {
    if (low < high) {
        let pivotPosition: number = partition(arr, low, high, quick);
        quickSort(arr, low, (pivotPosition - 1), quick);
        quickSort(arr, pivotPosition, high, quick)
    }
}