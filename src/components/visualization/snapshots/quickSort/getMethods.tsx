import { SNAPSHOT_BOX_SIZE } from "../../../helpers/Constants";


export const getTopPosition = (index: number, levels: number[]): number => {
    return (levels[index] * (SNAPSHOT_BOX_SIZE + 5));
}
export const getLeftPosition = (start: number): number => {

    return (start * SNAPSHOT_BOX_SIZE);
}
export const getBackgroundColor = (pivotIndex: number, currentIndex: number, isSorted: boolean): string => {
    if (isSorted) {
        return "#006400";
    }
    return pivotIndex === currentIndex ? "#006400" : "#fff";
}
export const getRowContainerWidth = (fullLength: number): number => {
    return fullLength * 36;
}
export const getTextTopPosition = (levels: number[]): number => {
    const maxLevel: number = Math.max(...levels);
    return (maxLevel + 1) * (SNAPSHOT_BOX_SIZE + 5)
}