export const getRightPostion = (index: number, directions: string[]) => {
    if (directions[index] === "left") {
        return 10 * index;
    }
    else if (directions[index] === "right") {
        return -10 * index;
    }
    else if (directions[index] === "transformed") {
        if (directions[index - 1] === "neutral") {
            return 0;
        }
        else if (directions[index - 1] === "left") {
            return (index - 1) * 10;
        }
        else {
            return (index - 1) * -10;
        }
    }
}
export const getTopPosition = (index: number, directions: string[]) => {
    if (directions[index] === "transformed") {
        return -30;
    }
    else {
        return 5;
    }
}
export const getBackgroundColor = (pivotIndex:number,currentIndex:number) => {
    return pivotIndex === currentIndex?"#006400":"#fff";
}