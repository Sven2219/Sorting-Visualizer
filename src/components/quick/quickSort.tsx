export interface IQuick {
    procedure: number[][];
    pivots: IPivot
    indexes: number[];
}
export interface IPivot {
    pivot: number[];
    pivotIndex: number[];
}
const partition = (arr: number[], low: number, high: number, quick: IQuick): number => {
    const pivot = arr[high];
    const { pivots, indexes, procedure } = quick;
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            procedure.push([...arr]);
            indexes.push(j);
            pivots.pivot.push(pivot);
            pivots.pivotIndex.push(high);
            i++;
            let temp: number = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        indexes.push(j);
        pivots.pivot.push(pivot);
        pivots.pivotIndex.push(high);
        procedure.push([...arr]);
    }
    let temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    pivots.pivot.push(pivot);
    pivots.pivotIndex.push(high);
    indexes.push(i + 1);
    procedure.push([...arr])
    console.log("here:", arr.slice(low, high + 1));
    console.log("provjera: zakljucka:",arr)
    return i + 1;
}

export const quickSort = (arr: number[], low: number, high: number, quick: IQuick, smjer: string): void => {
    if (arr.slice(low, high + 1).length > 0) {
        console.log("low:", low, "high:", high, "arr:", arr.slice(low, high + 1), "pivot:", arr[high], "smjer:", smjer)
    }
    if (low < high) {
        let pivotPosition: number = partition(arr, low, high, quick);
        quickSort(arr, low, (pivotPosition - 1), quick, "lijevo");
        quickSort(arr, pivotPosition + 1, high, quick, "desno")
    }
}