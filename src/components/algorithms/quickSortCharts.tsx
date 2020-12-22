import { IQuickCharts } from "../helpers/interfaces";

const partition = (elements: number[], low: number, high: number, quickProcedure: IQuickCharts): number => {
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
    if (elements[high] === elements[i + 1] ) {
        indexes.push({ index: (i + 1), low: i + 1, high: high, isSame: true })
    }
    else {
        indexes.push({ index: (i + 1) })
    }
    procedure.push([...elements])
    return i + 1;
}

export const quickSort = (elements: number[], low: number, high: number, quickProcedure: IQuickCharts): void => {
    if (low < high) {
        let pivotPosition: number = partition(elements, low, high, quickProcedure);
        quickSort(elements, low, (pivotPosition - 1), quickProcedure);
        quickSort(elements, pivotPosition + 1, high, quickProcedure)
    }
}

export const quickSortCharts = (elements: number[]): IQuickCharts => {
    const quick: IQuickCharts = { procedure: [], pivotIndexes:[], indexes: [] };
    const { procedure, pivotIndexes, indexes } = quick;
    const high: number = elements.length - 1;

    //initial 
    procedure.push([...elements]);
    indexes.push({ index: 0 });
    pivotIndexes.push(high);

    quickSort(elements, 0, high, quick);

    //ending
    procedure.push([...elements]);
    procedure.push([...elements]);

    
    return quick;
}