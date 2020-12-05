import { IBubble } from "../bubble/bubbleSort";
import { IQuick } from "../quick/quickSort";

export const getBubbleBg = (element: number, index: number, currentFieldIndex: number, bubbleSortProcedure: IBubble): string => {
    const { procedure, indexes } = bubbleSortProcedure;
    if (currentFieldIndex < 1) {//start
        return "#228b22";//green
    }
    else if (currentFieldIndex + 1 === procedure.length) {//end
        return "#228b22"//green
    }
    else if (element != procedure[currentFieldIndex - 1][index]) {
        return "#b22222";//red
    }
    else if (index == indexes[currentFieldIndex]) {
        return "#483d8b";//blue
    }
    else {
        return "#228b22";
    }
}
export const getQuickBg = (element: number, index: number, currentFieldIndex: number, quickSortProcedure: IQuick): string => {
    const { procedure, indexes, pivots } = quickSortProcedure;
    if (currentFieldIndex < 1) {//start
        return "#228b22";//zelena
    }
    else if (currentFieldIndex + 2 === procedure.length) {//end
        return "#228b22";//zelena
    }
    //swap two different numbers
    else if (element !== procedure[currentFieldIndex - 1][index] ||
        (indexes[currentFieldIndex].isSame && (index === indexes[currentFieldIndex].low || index === indexes[currentFieldIndex].high))) {

        return "#b22222";//crvena
    }
    else if (pivots !== undefined && element === pivots.pivot[currentFieldIndex] && pivots.pivotIndex[currentFieldIndex] === index) {
        return "#daa520";//pivot-zuta
    }
    else if (index === indexes[currentFieldIndex - 1].index && index === indexes[currentFieldIndex].index && currentFieldIndex >= 2) {
        return "#b22222";
    }
    else if (index === indexes[currentFieldIndex].index) {
        return "#483d8b";//blue
    }
    return "#228b22";

}
