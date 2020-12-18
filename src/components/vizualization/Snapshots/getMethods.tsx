import { SNAPSHOT_BOX_SIZE } from "../../Constants";


export const getTopPosition = (index: number, levels: number[]) => {
    return (levels[index]  * SNAPSHOT_BOX_SIZE);
}
export const getLeftPosition = (start: number) => {
    return (start * SNAPSHOT_BOX_SIZE);
}
export const getBackgroundColor = (pivotIndex: number, currentIndex: number) => {
    return pivotIndex === currentIndex ? "#006400" : "#fff";
}