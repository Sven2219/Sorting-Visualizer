import { SNAPSHOT_BOX_SIZE } from "../../../helpers/Constants";


export const getTopPosition = (index: number, levels: number[]):number => {
    return (levels[index]  * SNAPSHOT_BOX_SIZE);
}
export const getLeftPosition = (start: number):number => {
    return (start * SNAPSHOT_BOX_SIZE);
}
export const getBackgroundColor = (pivotIndex: number, currentIndex: number):string => {
    return pivotIndex === currentIndex ? "#006400" : "#fff";
}