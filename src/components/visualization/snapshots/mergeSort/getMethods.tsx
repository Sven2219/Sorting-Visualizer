import { SNAPSHOT_BOX_SIZE } from "../../../helpers/Constants";
import { IMerge } from "../../../helpers/interfaces";
//only the current snapshot is colored
export const getBackgroundColor = (isHighlited: boolean): string => {
    return isHighlited ? "#006400" : "#fff"
}
//SNAPSHOT_BOX_SIZE TO MAKE SPACING
export const getLeftPosition = (startIndex: number | undefined, firstHalf: number): number => {
    if (startIndex !== undefined) {
        if (startIndex >= firstHalf) {
            return (startIndex - 0.4) * (SNAPSHOT_BOX_SIZE * 2);
        }

        return startIndex * (SNAPSHOT_BOX_SIZE * 2);
    }
    return 0;
}
//With this function we are constantly increasing in width
export const getRowContainerWidth = (index: number, snapshotsLength: number, levels: number[]): number => {
    return (snapshotsLength * (SNAPSHOT_BOX_SIZE + 2) + (levels[index] - 1) * SNAPSHOT_BOX_SIZE)
}
//using this we determine the left position of the element
export const getMinIndex = (index: number, snapshot: (IMerge | undefined)[]): number => {
    return Math.min.apply(null, snapshot.map((item) => {
        if (item !== undefined) {
            return item.index;
        }
        return -1;
    }))
}