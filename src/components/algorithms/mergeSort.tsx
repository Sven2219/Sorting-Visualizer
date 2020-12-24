import { IMerge, IMergeSnapshots } from '../helpers/interfaces';
import { TIMING } from '../helpers/types';

const merge = (left: (IMerge | undefined)[] | undefined, right: (IMerge | undefined)[] | undefined, level: number, mergeProcedure: IMergeSnapshots): (IMerge | undefined)[] | undefined => {
    const { snapshots, levels } = mergeProcedure;
    let sorted = [];
    if (left !== undefined && right !== undefined) {
        if (left[0] !== undefined && right[0] !== undefined) {
            while (left.length && right.length) {
                if (left[0].element < right[0].element) sorted.push(left.shift());
                else sorted.push(right.shift());
            };
            snapshots.push([...sorted.concat(left.slice().concat(right.slice()))]);
            levels.push(level);
            return sorted.concat(left.slice().concat(right.slice()));
        }
    }
};


export const mergeSort = (unsortedArray: IMerge[], level: number, mergeProcedure: IMergeSnapshots): (IMerge | undefined)[] | undefined => {
    level = level + 1;

    const { snapshots, levels } = mergeProcedure;
    snapshots.push([...unsortedArray]);
    levels.push(level);
    if (unsortedArray.length <= 1) return unsortedArray;
    //dividing the field in halfs
    let mid = Math.floor(unsortedArray.length / 2);
    let left: (IMerge | undefined)[] | undefined = mergeSort(unsortedArray.slice(0, mid), level, mergeProcedure);
    let right: (IMerge | undefined)[] | undefined = mergeSort(unsortedArray.slice(mid), level, mergeProcedure);
    return merge(left, right, level, mergeProcedure);
};
export const mergeSortSnapshots = (elements: IMerge[], displayMethod: string) => {
    const mergeProcedure: IMergeSnapshots = { snapshots: [], levels: [] };
    const level: number = 0;
    mergeSort(elements, level, mergeProcedure);
    const { snapshots, levels } = mergeProcedure;
    if (displayMethod === TIMING) {
        snapshots.push([...snapshots[snapshots.length - 1], ...snapshots[snapshots.length - 1]]);
        levels.push(levels[levels.length - 1], levels[levels.length - 1]);
    }
    return mergeProcedure;

}