import { IQuickCharts, IQuickSnapshots } from "../helpers/interfaces";

const partitionCharts = (elements: number[], low: number, high: number, quickProcedure: IQuickCharts): number => {
    const pivot: number = elements[high];
    const { pivotIndexes, indexes, procedure } = quickProcedure;
    let i: number = low - 1;
    for (let j = low; j < high; j++) {
        if (elements[j] < pivot) {
            //The that are replaced must be pushed into the field in order to be displayed.
            procedure.push([...elements]);
            indexes.push({ index: j });
            pivotIndexes.push(high);
            i++;
            let temp: number = elements[i];
            elements[i] = elements[j];
            elements[j] = temp;
        }
        indexes.push({ index: j });
        pivotIndexes.push(high);
        procedure.push([...elements]);
    }
    let temp: number = elements[i + 1];
    elements[i + 1] = elements[high];
    elements[high] = temp;
    pivotIndexes.push(high);
    if (elements[high] === elements[i + 1]) {
        indexes.push({ index: (i + 1), low: i + 1, high: high, isSame: true })
    }
    else {
        indexes.push({ index: (i + 1) })
    }
    procedure.push([...elements])
    return i + 1;
}

export const quickSortCharts = (elements: number[], low: number, high: number, quickProcedure: IQuickCharts): void => {
    if (low < high) {
        let pivotPosition: number = partitionCharts(elements, low, high, quickProcedure);
        quickSortCharts(elements, low, (pivotPosition - 1), quickProcedure);
        quickSortCharts(elements, pivotPosition + 1, high, quickProcedure)
    }
}
const areArraySame = (currentArray: number[], prevArray: number[]): boolean => {
    if (currentArray.length === prevArray.length) {
        return currentArray.every((element, index) => element === prevArray[index]);
    }
    return false;
}


const partitionSnapshots = (elements: number[], low: number, high: number, quickProcedure: IQuickSnapshots, level: number): number => {
    const { snapshots, pivotIndexes, snapshotPosition: { startIndexes, levels } } = quickProcedure;
    const pivot: number = elements[high];
    let i: number = low - 1;
    for (let j = low; j < high; j++) {
        if (elements[j] < pivot) {
            i++;
            let temp: number = elements[i];
            elements[i] = elements[j];
            elements[j] = temp;
        }
    }
    let temp: number = elements[i + 1];
    elements[i + 1] = elements[high];
    elements[high] = temp;
    const currentSnapshot: number[] = elements.slice(low, high + 1);
    let areSnapshotsSame: boolean = false;
    if (snapshots[snapshots.length - 1] !== undefined) {
        areSnapshotsSame = areArraySame(currentSnapshot, snapshots[snapshots.length - 1]);
    }
    if (!areSnapshotsSame) {
        snapshots.push(currentSnapshot);
        pivotIndexes.push(i + 1 - low);
        levels.push(level);
        startIndexes.push(low);
    }
    return i + 1;
}

export const quickSortSnapshots = (elements: number[], low: number, high: number, quickProcedure: IQuickSnapshots, level: number): void => {
    level = level + 1;
    const currentSnapshot: number[] = elements.slice(low, high + 1);
    if (currentSnapshot.length > 0) {
        const { snapshots, pivotIndexes, snapshotPosition: { startIndexes, levels } } = quickProcedure;
        let areSnapshotsSmae: boolean = false;
        if (snapshots[snapshots.length - 1] !== undefined) {
            areSnapshotsSmae = areArraySame(currentSnapshot, snapshots[snapshots.length - 1]);
        }
        if (!areSnapshotsSmae) {
            snapshots.push(currentSnapshot);
            pivotIndexes.push(currentSnapshot.length - 1);
            levels.push(level);
            startIndexes.push(low);
        }
    }
    if (low < high) {
        let pivotPosition: number = partitionSnapshots(elements, low, high, quickProcedure, level);
        quickSortSnapshots(elements, low, (pivotPosition - 1), quickProcedure, level);
        quickSortSnapshots(elements, pivotPosition + 1, high, quickProcedure, level)
    }
}