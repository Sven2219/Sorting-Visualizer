import { IPivot } from "../quick/quickSort";

export const getBubbleBg = (element: number, index: number, currentFieldIndex: number, procedure: number[][], indexes: number[]): string => {
    const bg = getBg(element, index, currentFieldIndex, procedure, indexes);
    return bg === "" ? "#228b22" : bg;
}
export const getQuickBg = (element: number, index: number, currentFieldIndex: number, procedure: number[][], indexes: number[], pivots: IPivot | undefined): string => {
    if (currentFieldIndex < 1) {
        return "#228b22";//zelena
    }
    else if (currentFieldIndex + 1 === procedure.length) {
        return "#228b22";//zelena
    }
    else if (element != procedure[currentFieldIndex - 1][index]) {
        return "#b22222";//crvena
    }
    else if (pivots !== undefined && element === pivots.pivot[currentFieldIndex] && pivots.pivotIndex[currentFieldIndex] === index) {
        return "#daa520";//pivot-zuta
    }
    else if (currentFieldIndex >= 2 && indexes[currentFieldIndex] === indexes[currentFieldIndex - 1] && element === procedure[currentFieldIndex][indexes[currentFieldIndex]]) {
        return "#b22222";//crvena
    }
    else if (index === indexes[currentFieldIndex]) {
        return "#483d8b";//blue
    }
    return "#228b22";

}

const getBg = (element: number, index: number, currentFieldIndex: number, procedure: number[][], indexes: number[]): string => {
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
        return ""
    }
}