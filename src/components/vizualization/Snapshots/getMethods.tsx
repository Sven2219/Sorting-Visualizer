import { SNAPSHOT_BOX_SIZE } from "../../Constants";


export const getTopPosition = (index: number, levels: number[]) => {
    if (levels[index] === levels[index - 1]) {
        return -30;
    }
    else {
        return 5;
    }
}
export const getBackgroundColor = (pivotIndex: number, currentIndex: number) => {
    return pivotIndex === currentIndex ? "#006400" : "#fff";
}