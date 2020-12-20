import { CHART_MAX_HEIGHT, CHART_MIN_HEIGHT } from "./Constants";

export const scaleBetween = (unscaledNum: number, minAllowed: number, maxAllowed: number, minElement: number, maxElement: number): number => {
    return (maxAllowed - minAllowed) * (unscaledNum - minElement) / (maxElement - minElement) + minAllowed;
}
export const getScaledHeight = (currentElement: number, minElement: number, maxElement: number, currentLength: number): number => {
    if (minElement !== maxElement && currentLength > 1) {
        return scaleBetween(currentElement, CHART_MIN_HEIGHT, CHART_MAX_HEIGHT, minElement, maxElement);
    }
    return CHART_MIN_HEIGHT;
}

