import { IMergeSnapshots } from '../helpers/interfaces';

const merge = (left: number[], right: number[], level: number, mergeProcedure: IMergeSnapshots) => {
    const { snapshots, levels } = mergeProcedure;
    let sorted = [];
    while (left.length && right.length) {
        if (left[0] < right[0]) sorted.push(left.shift());
        else sorted.push(right.shift());
    };
    snapshots.push([...sorted.concat(left.slice().concat(right.slice()))]);
    levels.push(level);
    return sorted.concat(left.slice().concat(right.slice()));
};


export const mergeSort = (unsortedArray: number[], level: number, mergeProcedure: IMergeSnapshots) => {
    level = level + 1;
    const { snapshots, levels } = mergeProcedure;
    snapshots.push([...unsortedArray]);
    levels.push(level);
    if (unsortedArray.length <= 1) return unsortedArray;
    let mid = Math.floor(unsortedArray.length / 2);
    let left: any = mergeSort(unsortedArray.slice(0, mid), level, mergeProcedure);
    let right: any = mergeSort(unsortedArray.slice(mid), level, mergeProcedure);
    return merge(left, right, level, mergeProcedure);
};
export const mergeSortSnapshots = (elements: number[]) => {
    const mergeProcedure: IMergeSnapshots = { snapshots: [], levels: [] };
    const level: number = 0;
    mergeSort(elements, level, mergeProcedure);
    return mergeProcedure;
}