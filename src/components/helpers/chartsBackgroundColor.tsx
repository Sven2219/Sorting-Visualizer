import { IBubble, IQuickCharts } from "./interfaces";

export const getBubbleBg = (currentElement: number, currentIndex: number, currentFieldIndex: number, bubbleSortProcedure: IBubble): string => {
    const { procedure, indexes } = bubbleSortProcedure
    if (currentFieldIndex < 1) {//start
        return "#228b22";//green
    }
    else if (currentFieldIndex + 1 === procedure.length) {//end
        return "#228b22"//green
    }
    else if (currentElement != procedure[currentFieldIndex - 1][currentIndex]) {
        return "#b22222";//red
    }
    else if (currentIndex == indexes[currentFieldIndex]) {
        return "#483d8b";//blue
    }
    else {
        return "#228b22";
    }
}
export const getQuickBg = (currentElement: number, currentIndex: number, currentFieldIndex: number, quickSortProcedure: IQuickCharts): string => {
    const { procedure, indexes, pivotIndexes } = quickSortProcedure;
    if (currentFieldIndex < 1) {//start
        return "#228b22";//green
    }
    else if (currentFieldIndex + 2 === procedure.length) {//end
        return "#228b22";//green
    }
    //swap two different numbers
    else if (currentElement !== procedure[currentFieldIndex - 1][currentIndex] ||
        (indexes[currentFieldIndex].isSame && (currentIndex === indexes[currentFieldIndex].low || currentIndex === indexes[currentFieldIndex].high))) {

        return "#b22222";//red
    }
    else if (pivotIndexes !== undefined && pivotIndexes[currentFieldIndex] === currentIndex) {
        return "#daa520";//pivot-yellow
    }
    else if (currentIndex === indexes[currentFieldIndex - 1].index && currentIndex === indexes[currentFieldIndex].index && currentFieldIndex >= 2) {
        return "#b22222";
    }
    else if (currentIndex === indexes[currentFieldIndex].index) {
        return "#483d8b";//blue
    }
    return "#228b22";
}
