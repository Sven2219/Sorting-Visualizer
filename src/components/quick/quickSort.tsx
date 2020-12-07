import { IQuickCharts, IQuickSnapshots } from "../helpers/interfaces";

const partitionCharts = (arr: number[], low: number, high: number, quick: IQuickCharts): number => {
    const pivot: number = arr[high];
    const { pivotIndex, indexes, procedure } = quick;
    let i: number = low - 1;
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            procedure.push([...arr]);
            indexes.push({ index: j });
            pivotIndex.push(high);
            i++;
            let temp: number = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        indexes.push({ index: j });
        pivotIndex.push(high);
        procedure.push([...arr]);
    }
    let temp: number = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    pivotIndex.push(high);
    if (arr[high] === arr[i + 1]) {
        indexes.push({ index: (i + 1), low: i + 1, high: high, isSame: true })
    }
    else {
        indexes.push({ index: (i + 1) })
    }
    procedure.push([...arr])
    return i + 1;
}

export const quickSortCharts = (arr: number[], low: number, high: number, quick: IQuickCharts): void => {
    if (low < high) {
        let pivotPosition: number = partitionCharts(arr, low, high, quick);
        quickSortCharts(arr, low, (pivotPosition - 1), quick);
        quickSortCharts(arr, pivotPosition + 1, high, quick)
    }
}


const partitionSnapshots = (arr: number[], low: number, high: number, quick: IQuickSnapshots): number => {
    const { snapshots, pivotIndexes, directions } = quick;
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            let temp: number = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    let temp: number = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    snapshots.push(arr.slice(low, high + 1));
    pivotIndexes.push(i + 1 - low);
    directions.push("transformed");
    return i + 1;
}

export const quickSortSnapshots = (arr: number[], low: number, high: number, direction: string, quick: IQuickSnapshots): void => {
    if (arr.slice(low, high + 1).length > 0) {
        const { snapshots, pivotIndexes, directions } = quick;
        const slicedArray = arr.slice(low, high + 1);
        snapshots.push(slicedArray);
        pivotIndexes.push(slicedArray.length-1);
        directions.push(direction)
    }
    if (low < high) {
        let pivotPosition: number = partitionSnapshots(arr, low, high, quick);
        quickSortSnapshots(arr, low, (pivotPosition - 1), "left", quick);
        quickSortSnapshots(arr, pivotPosition + 1, high, "right", quick)
    }
}