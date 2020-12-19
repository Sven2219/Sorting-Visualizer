import { CHART_MAX_HEIGHT, CHART_MIN_HEIGHT } from "../Constants";

export const scaleBetween = (unscaledNum: number, minAllowed: number, maxAllowed: number, min: number, max: number): number => {
    return (maxAllowed - minAllowed) * (unscaledNum - min) / (max - min) + minAllowed;
}
export const getScaledHeight = (element: number, minRange: number, maxRange: number, currentLength: number): number => {
    if (minRange !== maxRange && currentLength > 1) {
        return scaleBetween(element, CHART_MIN_HEIGHT, CHART_MAX_HEIGHT, minRange, maxRange);
    }
    return CHART_MIN_HEIGHT;
}

