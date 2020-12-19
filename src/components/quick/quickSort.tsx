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
const areArraySame = (currentArray: number[], prevArray: number[]): boolean => {
    if (currentArray.length === prevArray.length) {
        return currentArray.every((element, index) => element === prevArray[index]);
    }
    return false;
}
const partitionSnapshots = (arr: number[], low: number, high: number, quick: IQuickSnapshots, level: number): number => {
    const { snapshots, pivotIndexes, snapshotPosition: { start, levels } } = quick;
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
    const slicedArray = arr.slice(low, high + 1);
    let isSame = false;
    if (snapshots[snapshots.length - 1] !== undefined) {
        isSame = areArraySame(slicedArray, snapshots[snapshots.length - 1]);
    }
    if (!isSame) {
        snapshots.push(slicedArray);
        pivotIndexes.push(i + 1 - low);
        levels.push(level);
        start.push(low);
    }
    return i + 1;
}

export const quickSortSnapshots = (arr: number[], low: number, high: number, quick: IQuickSnapshots, level: number): void => {
    level = level + 1;
    const slicedArray = arr.slice(low, high + 1);
    if (slicedArray.length > 0) {
        const { snapshots, pivotIndexes, snapshotPosition: { start, levels } } = quick;
        let isSame = false;
        if (snapshots[snapshots.length - 1] !== undefined) {
            isSame = areArraySame(slicedArray, snapshots[snapshots.length - 1]);
        }
        if (!isSame) {
            snapshots.push(slicedArray);
            pivotIndexes.push(slicedArray.length - 1);
            levels.push(level);
            start.push(low);
        }
    }
    if (low < high) {
        let pivotPosition: number = partitionSnapshots(arr, low, high, quick, level);
        quickSortSnapshots(arr, low, (pivotPosition - 1), quick, level);
        quickSortSnapshots(arr, pivotPosition + 1, high, quick, level)
    }
}