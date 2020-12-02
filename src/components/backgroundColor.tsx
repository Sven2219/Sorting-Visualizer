export const getBubbleBg = (element: number, index: number, currentFieldIndex: number, procedure: number[][], indexes: number[]): string => {
    const bg = getBg(element, index, currentFieldIndex, procedure, indexes);
    return bg === "" ? "#228b22" : bg;
}
export const getQuickBg = (element: number, index: number, currentFieldIndex: number, procedure: number[][], indexes: number[], pivot: number[] | undefined): string => {
    const bg = getBg(element, index, currentFieldIndex, procedure, indexes);
    if (bg !== "") {
        return bg;
    }
    else if (pivot !== undefined && element === pivot[currentFieldIndex]) {
        return "#daa520";
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