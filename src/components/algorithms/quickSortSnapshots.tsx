import { IQuickSnapshots } from "../helpers/interfaces";
import { MANUAL } from "../helpers/types";

const isArraySame = (currentSnapshot: number[], prevSnapshot: number[]): boolean => {
    const currentSnapshotLength: number = currentSnapshot.length;
    const prevSnapshotLength: number = prevSnapshot.length;
    if (currentSnapshotLength === prevSnapshotLength) {
        if (currentSnapshot[0] === prevSnapshot[0] && currentSnapshot[0] === currentSnapshot[currentSnapshotLength - 1] && currentSnapshot[currentSnapshotLength - 1] === prevSnapshot[prevSnapshotLength - 1]) {
            return false;
        }
        //If nothing has changed and not first case !
        return (currentSnapshot.every((element, index) => element === prevSnapshot[index]));
    }
    return false;
}
//To check the edge case when the user enters all the same elements
const areElementsInSamePosition = (currentSnapshot: number[], prevSnapshot: number[]): boolean => {
    if (currentSnapshot.length !== prevSnapshot.length) {
        return false;
    }
    return !(currentSnapshot.every((element) => element === prevSnapshot[0]));
}
const partition= (elements: number[], low: number, high: number, quickProcedure: IQuickSnapshots, level: number): number => {
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

    //edge scenario !!
    let areSnapshotsSame: boolean = false;
    let areAllElementsSame: boolean = false;
    if (snapshots[snapshots.length - 1] !== undefined) {
        areAllElementsSame = areElementsInSamePosition(currentSnapshot, snapshots[snapshots.length - 1]);
        if (!areAllElementsSame) {
            areSnapshotsSame = false;
        }
        else {
            areSnapshotsSame = isArraySame(currentSnapshot, snapshots[snapshots.length - 1]);
        }
    }
    if (!areSnapshotsSame) {
        snapshots.push(currentSnapshot);
        pivotIndexes.push(i + 1 - low);
        levels.push(level);
        startIndexes.push(low);
    }
    return i + 1;
}

export const quickSort = (elements: number[], low: number, high: number, quickProcedure: IQuickSnapshots, level: number): void => {
    level = level + 1;
    const currentSnapshot: number[] = elements.slice(low, high + 1);
    if (currentSnapshot.length > 0) {
        const { snapshots, pivotIndexes, snapshotPosition: { startIndexes, levels } } = quickProcedure;
        let areSnapshotsSame: boolean = false;
        if (snapshots[snapshots.length - 1] !== undefined) {
            areSnapshotsSame = isArraySame(currentSnapshot, snapshots[snapshots.length - 1]);
        }
        if (!areSnapshotsSame) {
            snapshots.push(currentSnapshot);
            pivotIndexes.push(currentSnapshot.length - 1);
            levels.push(level);
            startIndexes.push(low);
        }
    }
    if (low < high) {
        let pivotPosition: number = partition(elements, low, high, quickProcedure, level);
        quickSort(elements, low, (pivotPosition - 1), quickProcedure, level);
        quickSort(elements, pivotPosition + 1, high, quickProcedure, level)
    }
}

export const quickSortSnapshots = (elements: number[], displayMethod: string) => {
    const quick: IQuickSnapshots = { snapshots: [], pivotIndexes: [], snapshotPosition: { levels: [], startIndexes: [] } }
    const level: number = 0;
    quickSort(elements, 0, elements.length - 1, quick, level);
    const maxLevel = Math.max(...quick.snapshotPosition.levels);

    quick.snapshots.push([...elements]);
    quick.snapshotPosition.levels.push(maxLevel + 1);
    quick.snapshotPosition.startIndexes.push(0);
    if (displayMethod !== MANUAL) {
        quick.snapshots.push([...elements]);
        quick.snapshotPosition.levels.push(maxLevel + 1);
        quick.snapshotPosition.startIndexes.push(0);
    }
    return quick;
}