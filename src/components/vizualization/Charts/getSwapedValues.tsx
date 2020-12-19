import { IQuickCharts } from "../../helpers/interfaces";

export const getBubbleSwapedValues = (currentField: number[], previouseField: number[]): number[] => {
    let swaped: number[] = [];
    if (currentField.length > 0 && Array.isArray(previouseField)) {
        for (let i = 0; i < currentField.length; i++) {
            if (currentField[i] !== previouseField[i]) {
                swaped.push(previouseField[i])
            }
        }
        if (swaped.length === 2) {
            return swaped;
        }
    }
    return [];
}

export const getQuickSwapedValues = (currentField: number[], quickSortProcedure: IQuickCharts, currentFieldIndex: number): number[] => {
    let swaped: number[] = [];
    const { procedure, indexes } = quickSortProcedure;
    if (currentField.length > 0 && Array.isArray(procedure[currentFieldIndex - 1]) && procedure.length > currentFieldIndex + 2) {
        for (let i = 0; i < currentField.length; i++) {
            if (currentField[i] !== procedure[currentFieldIndex - 1][i]) {
                swaped.push(currentField[i]);
            }
            else if (i === indexes[currentFieldIndex - 1].index && i === indexes[currentFieldIndex].index && currentFieldIndex >= 2) {
                swaped.push(currentField[i]);
            }
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
