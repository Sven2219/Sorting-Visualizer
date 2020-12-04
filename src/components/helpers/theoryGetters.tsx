import { CODE_EXAMPLE_CONTAINER_WIDTH_LANDSCAPE, CODE_EXAMPLE_CONTAINER_WIDTH_PORTRAIT, CODE_EXAMPLE_LEFT_LANDSCAPE, CODE_EXAMPLE_LEFT_PORTRAIT } from "../Constants";

export const getCodeContainerWidth = (orientation: string): number => {
    return orientation === "PORTRAIT" ? CODE_EXAMPLE_CONTAINER_WIDTH_PORTRAIT : CODE_EXAMPLE_CONTAINER_WIDTH_LANDSCAPE;
}
export const getCodeLeftPosition = (orientation: string): number => {
    return orientation === "PORTRAIT" ? CODE_EXAMPLE_LEFT_PORTRAIT : CODE_EXAMPLE_LEFT_LANDSCAPE;
}
