import { IQuickCharts } from "../../helpers/interfaces";

export const getBubbleSwapedValues = (currentField: number[], previouseField: number[]): number[] => {
    let swaped: number[] = [];
    const currentFieldLength: number = currentField.length;

    if (currentFieldLength > 0 && Array.isArray(previouseField)) {
        for (let i = 0; i < currentFieldLength; i++) {
            //if the elements are different and are on the same indexes, save them
            if (currentField[i] !== previouseField[i]) {
                swaped.push(previouseField[i])
            }
        }
        //In bubble sort the element cannot be swaped by itself so the counter should be equal 2 for pushing it into swaped arrayb
        if (swaped.length === 2) {
            return swaped;
        }
    }
    return [];
}


export const getQuickSwapedValues = (currentField: number[], quickSortProcedure: IQuickCharts, currentFieldIndex: number): number[] => {
    let swaped: number[] = [];
    const { procedure, indexes } = quickSortProcedure;
    const currentFieldLength: number = currentField.length;

    if (currentFieldLength > 0 && Array.isArray(procedure[currentFieldIndex - 1]) && procedure.length > currentFieldIndex + 2) {
        for (let i = 0; i < currentFieldLength; i++) {
            //this scenario is same as bubble (up!)
            if (currentField[i] !== procedure[currentFieldIndex - 1][i]) {
                swaped.push(currentField[i]);
            }
            //when we come to the last element and first and last are same!!! they swap in original quick sort algorithm.
            else if (indexes[currentFieldIndex].isSame === true && i === currentFieldLength - 1) {
                swaped.push(currentField[i]);
            }
            //This scenario is for same elements for example [1,1,1,1] Quick sort will swap same elements.
            else if (i === indexes[currentFieldIndex - 1].index && i === indexes[currentFieldIndex].index && currentFieldIndex >= 2) {
                swaped.push(currentField[i]);
            }
            //why this ?? because I want to display Swapping 1 and 1 
            //So the first else if will push first 1 and this will push second 1 so we can display it like swapping 1 and 1 
            else if (indexes[currentFieldIndex].low !== undefined) {
                if (indexes[currentFieldIndex].low === i) {
                    swaped.push(currentField[i]);
                }
            }
        }
        return swaped;
    }
    return [];
}
export const getOriginalArray = (currentFieldLength: number, procedure: number[]): string | undefined => {
    if (currentFieldLength > 0 && procedure !== undefined) {
        return procedure.join(", ");
    }
}