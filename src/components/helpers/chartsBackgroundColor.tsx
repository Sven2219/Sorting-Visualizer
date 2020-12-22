import { IBubble, IQuickCharts } from "./interfaces";

export const getBubbleBg = (currentElement: number, currentIndex: number, currentFieldIndex: number, bubbleSortProcedure: IBubble): string => {
    const { procedure, indexes } = bubbleSortProcedure
    if (currentFieldIndex < 1) {//start
        return "#228b22";//green
    }
    else if (currentFieldIndex + 1 === procedure.length) {//end
        return "#228b22"//green
    }
    else if (currentElement != procedure[currentFieldIndex - 1][currentIndex]) {//if the current element differs from the past
        return "#b22222";//red
    }
    else if (currentIndex == indexes[currentFieldIndex]) {//this allows us to track current element
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
    //first part of if statement literally says [5] !==[1] 
    //if the past field on the same index has a different value, color them red

    //second part is edge scenario when pivot is same as the element to be replaced
    //for example if array is [1,4,1] and pivot is 1, I want to show that swap with 1 and 1 
    //because this is the way how original quicksort works 
    else if (currentElement !== procedure[currentFieldIndex - 1][currentIndex] ||
        (indexes[currentFieldIndex].isSame && (currentIndex === indexes[currentFieldIndex].low || currentIndex === indexes[currentFieldIndex].high))) {

        return "#b22222";//red
    }
    //tracking pivot
    else if (pivotIndexes !== undefined && pivotIndexes[currentFieldIndex] === currentIndex) {
        return "#daa520";//pivot-yellow
    }

    else if (currentIndex === indexes[currentFieldIndex - 1].index && currentIndex === indexes[currentFieldIndex].index && currentFieldIndex >= 2) {
        return "#b22222";
    }
    //tracking current element
    else if (currentIndex === indexes[currentFieldIndex].index) {
        return "#483d8b";//blue
    }
    return "#228b22";
}
