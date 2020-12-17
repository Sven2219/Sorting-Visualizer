import { SNAPSHOT_BOX_SIZE } from "../../Constants";

export const getRightPostion = (index: number, directions: string[],directionIndex:number[]) => {
    
}
export const getTopPosition = (index: number, directions: string[]) => {
    if (directions[index] === "transformed") {
        return -30;
    }
    else {
        return 5;
    }
}
export const getBackgroundColor = (pivotIndex: number, currentIndex: number) => {
    return pivotIndex === currentIndex ? "#006400" : "#fff";
}